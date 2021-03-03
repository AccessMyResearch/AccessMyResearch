import urllib.request
import urllib.parse
import json
import uuid
# from elasticsearch import Elasticsearch


from Logger import getLogger
from HttpUtils import *

logger = getLogger("Unpaywall")

class UnpaywallApiRequestor:
    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.logger = logger


    def getRequestURL(self, method, query):
        return self.endpoint + method + '/?query=' + urllib.parse.quote(query) + '&email=your_email&is_oa=true'


    def get_query(self, method, query):
        url = self.getRequestURL(method, query)
        all_articles = []
        resp = requestURL(url)
        result = json.loads(resp.decode('utf-8'))
        all_articles.append(result)
        return all_articles

    def clean(self, result):
        cleanedResult = []
        for page in result:
            for article in page['results']:
                try:
                    cleanedArticle = {}
                    # set k as parameters from unpaywall
                    key = ['title', 'doi_url', 'doi',
                           'journal_name', 'publisher']
                    for item in key:
                        # added response to get articles
                        if item in article['response']:
                            cleanedArticle[item] = article['response'][item]
                    # if 'title' in obj:
                    #     obj['description'] = obj['title']
                    
                    if 'z_authors' in article['response']:
                        cleanedArticle['authors'] = self.parseAuthorName(article['response']['z_authors'])



                    if 'published_date' in article['response']:
                        cleanedArticle['datePublished'] = article['response']['published_date']

                    cleanedArticle['url'] = self.extractUrls(article)
                    cleanedArticle['database'] = "Unpaywall"
                    cleanedResult.append(cleanedArticle)
                except Exception as error:
                    self.logger.error('Error occured while cleaning:')
                    self.logger.error(str(error))
        return cleanedResult

    # A helper method to parse out the name of an author_z object returned by unpaywall
    def parseAuthorName(self, authorArray):
        if authorArray is None: 
            return []

        authorNames = []
        for auth in authorArray:
            name = ""

            if 'given' in auth:
                name = auth['given'] + " "

            if 'family' in auth:
                    name += auth['family'] + " " 
                    
            if 'sequence' in auth:
                name += auth['sequence']
            authorNames.append(name)
            # else:
            #     author.append("")
        return authorNames

    def extractUrls(self, articleObject):
        url = []
        field = "url"
        for key in articleObject.keys():

            if field in key:
                url.append(articleObject[key])

            elif isinstance(articleObject[key], dict):
                results = self.extractUrls(articleObject[key])
                for result in results:
                    url.append(result)

            elif isinstance(articleObject[key], list):
                for item in articleObject[key]:
                    if isinstance(item, dict):
                        more_results = self.extractUrls(item)
                        for another_result in more_results:
                            url.append(another_result)

        return list(set(url))
        

def unpaywall(elasticsearch, search_terms):
    logger.info("Indexing the Unpaywall database...")

    # set endpoint as beginning of api call for unpaywall
    endpoint = "https://api.unpaywall.org/v2/"
    method = "search"

    api = UnpaywallApiRequestor(endpoint)

    result = []
    for term in search_terms:
        result += api.get_query(method, term)

    cleaned_data = api.clean(result)

    f = open("output/UnPaywall-cleaned-data.json", "w")
    f.write(json.dumps(cleaned_data))
    f.close()

    f = open("output/UnPaywall-raw-data.json", "w")
    f.write(json.dumps(result))
    f.close()

    for article in cleaned_data:
        res = elasticsearch.index(index="amr", id=id_generator(article['title']), body=article)

    logger.info('Total documents in Unpaywall: %s' % len(cleaned_data))
