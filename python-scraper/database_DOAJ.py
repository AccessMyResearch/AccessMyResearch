import urllib.request
import urllib.parse
import json
import uuid

from elasticsearch import Elasticsearch
from HttpUtils import *

logger = getLogger("DOAJ")

class DOAJApiRequestor:
    
    # Class constructor:
    # Endpoint: The "URL" of the CORE database
    # API key: the key used to access the API
    def __init__(self, endpoint):
        # Default class variables for the CORE database request:
        # CORE API states the default page size is 100
        self.pagesize = 100
        self.endpoint = endpoint
        self.logger = logger


    # Description: Forms the URL used to query the database.
    # query (string): the string used to query CORE
    # @return (string): an absolute URL that be used with self.requestURL()
    def getRequestURL(self, method, query, page):
        params = {
            'page': page,
            'pageSize': self.pagesize,
        }
        return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)
  
    # Method (JSON array): Request a variable amount of pages
    # query (string): the string used to query CORE
    # maxPages (integer): The amount of pages to be requested
    # @return: Request a variable amount of pages
    def getNumberOfPages(self, method, query, maxPages=20):
        # Get the formatted url
        url = self.getRequestURL(method, query, 1)

        # Creating an array to store all page responses
        pageResponses = []

        # Request the first page
        response = requestURL(url)
        # Return an empty array if CORE did not respond with valid data
        if response is None:
            return []
        pageOneResponse = json.loads(response.decode('utf-8'))
        pageResponses.append(pageOneResponse)

        # Check if any additional pages need to be requested
        if (pageOneResponse['total'] > self.pagesize):
            # Calculate the total number of pages that need to be requested
            totalRequiredPages = int(pageOneResponse['total'] / self.pagesize) + 1
            totalRequiredPages = min(totalRequiredPages, maxPages)

            # Loop from page 2 (since page 1 is already stored) to totalRequiredPages
            for currPage in range(2, totalRequiredPages + 1):
                # Get the next URL to request
                url = self.getRequestURL(method, query, currPage)
                response = requestURL(url)

                # Must error check and see that response is not 'None'
                if response is not None:
                    pageResponses.append(json.loads(response.decode('utf-8')))
                    self.logger.info("Recieved page #%s" % str(currPage))
                else:
                    self.logger.info("Server error on page #%s" % str(currPage))
        self.logger.info("Finished term: %s" % query)
        return pageResponses

    def clean(self, result):
        cleanedResult = []
        for page in result:
            for fullArticle in page['results']:
                try:
                    article = fullArticle['bibjson']
                    cleanedArticle = {}

                    # get the title and year
                    if 'title' in article:
                        cleanedArticle['title'] = article['title']

                    # Format the author names into a string array
                    if 'author' in article:
                        cleanedArticle['author'] = []
                        # DOAJ has multiple authors
                        for auth in article['author']:
                            if 'name' in auth:
                                cleanedArticle['author'].append(auth['name'])

                    # Get the description (which is the abstract, but have to rename it):
                    if 'abstract' in article:
                        cleanedArticle['description'] = article['abstract']

                    # Get the date published
                    if 'year' in article:
                        cleanedArticle['datePublished'] = fullArticle['created_date']

                    # Process all the links and add them to a 'url'
                    if 'link' in article:
                        cleanedArticle['url'] = []
                        for link in article['link']:
                            if 'url' in link:
                                cleanedArticle['url'].append(link['url'])

                    # Add relavant identifiers
                    for identifier in article['identifier']:
                        cleanedArticle[identifier['type']] = identifier['id']

                    # Add database name:
                    cleanedArticle['database'] = "DOAJ"
                    cleanedResult.append(cleanedArticle)
                except Exception as error:
                    self.logger.error('Error occured while cleaning:')
                    self.logger.error(str(error))

        return cleanedResult



def doaj(elasticsearch, search_terms):
    logger.info("Indexing the DOAJ database...")
    endpoint = 'https://doaj.org/api/v2/'
    method = 'search/articles'

    api = DOAJApiRequestor(endpoint)
    result = []
    for term in search_terms:
        result += api.getNumberOfPages(method, term, maxPages=2)


    cleaned_data = api.clean(result)
    # Following code is to temporarily save the output
    f = open("output/DOAJ-cleaned-data.json", "w")
    f.write(json.dumps(cleaned_data))
    f.close()

    f = open("output/DOAJ-raw-data.json", "w")
    f.write(json.dumps(result))
    f.close()


    for article in cleaned_data:
        res = elasticsearch.index(index="amr", id=id_generator(article['title']), body=article)


    logger.info('Total documents in DOAJ: %s' % len(cleaned_data))
