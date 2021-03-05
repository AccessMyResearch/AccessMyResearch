import urllib.request
import urllib.parse
import json
import uuid
import re

from elasticsearch import Elasticsearch
from Logger import getLogger
from HttpUtils import *

logger = getLogger("CORE")

class CoreApiRequestor:

    # Class constructor:
    # Endpoint: The "URL" of the CORE database
    # API key: the key used to access the API
    def __init__(self, endpoint, api_key):
        self.endpoint = endpoint
        self.api_key = api_key
        self.logger = logger

        # Default class variables for the CORE database request:
        # CORE API states the default page size is 100
        self.pagesize = 100

   
    # Description: Forms the URL used to query the database. 
    # query (string): the string used to query CORE
    # fullText (boolean): Defines if the article's body text should be returned by CORE
    # @return (string): an absolute URL that be used with self.requestURL()
    def getRequestURL(self, method, query, fullText, page):
        params = {
            'apiKey': self.api_key,
            'page': page,
            'pageSize': self.pagesize,
            'fulltext': 'true ' if fullText else 'false',
            'urls': 'true'
        }
        return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)

    # Method (JSON array): Request a variable amount of pages
    # query (string): the string used to query CORE
    # fullText (boolean): Defines if the article's body text should be returned by CORE
    # maxPages (integer): The amount of pages to be requested
    # @return: Request a variable amount of pages
    def getNumberOfPages(self, method, query, fulltext, maxPages=20):
        # Get the formatted url
        url = self.getRequestURL(method, query, fulltext, 1)
        
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
        if (pageOneResponse['totalHits'] > self.pagesize):
            # Calculate the total number of pages that need to be requested
            totalRequiredPages = int(pageOneResponse['totalHits'] / self.pagesize) + 1
            totalRequiredPages = min(totalRequiredPages, maxPages)

            # Loop from page 2 (since page 1 is already stored) to totalRequiredPages
            for currPage in range(2, totalRequiredPages + 1):
                # Get the next URL to request
                url = self.getRequestURL(method, query, False, currPage)
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
        # Keywords that the method should look for in the rawdata 
        keywords = ['authors', 'title', 'description',
                    'datePublished', 'fulltextUrls',
                    'journal', 'doi', 'database', 'publisher',
                    'subjects', 'year', 'aoi', 'downloadUrl']
        regexp = re.compile(
            r'^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$')
        
        # Go through all pages in result
        for page in result:
            # Extract all articles in each page
            for article in page['data']:
                try:
                    # Create a dictionary for the cleaned data
                    cleanedArticle = {}
                   
                    # Find all keywords in the rawdata and add it to "cleanedArticle"
                    for item in keywords:
                        if item in article:
                            cleanedArticle[item] = article[item]

                    if 'datePublished' in cleanedArticle and not regexp.search(cleanedArticle['datePublished']):
                        del cleanedArticle['datePublished']
                        
                        

                    # Specify which database the article was taken from: 
                    cleanedArticle['database'] = "CORE"
                    if 'fulltextUrls' in cleanedArticle:
                        cleanedArticle['url'] = cleanedArticle.pop('fulltextUrls')
                    
                    cleanedResult.append(cleanedArticle)

                except Exception as error:
                    self.logger.error('Error occured while cleaning:')
                    self.logger.error(str(error))

        return cleanedResult


def core(elasticsearch, index_name, search_terms):
    logger.info("Indexing the CORE database...")
    # Notify console that the CORE thread has started

    # Move to indexer.py
    endpoint = 'https://core.ac.uk/api-v2'
    api_key = '5TphODMbCjoQUkWitNZSBVqsEeYlHfnI'
    method = '/articles/search'


    api = CoreApiRequestor(endpoint, api_key)
    result = []
    for term in search_terms:
        result += api.getNumberOfPages(method, term, False, maxPages = 2)

    # Following code is to temporarily save the output
    cleaned_data = api.clean(result)
    f = open("output/CORE-cleaned-data.json", "w")
    f.write(json.dumps(cleaned_data))
    f.close()

    f = open("output/CORE-raw-data.json", "w")
    f.write(json.dumps(result))
    f.close()

    for article in cleaned_data:
        res = elasticsearch.index(
            index=index_name, id=id_generator(article['title']), body=article)

    logger.info('Total documents in CORE: %s' % len(cleaned_data))
