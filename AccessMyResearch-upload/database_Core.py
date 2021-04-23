import urllib.request
import urllib.parse
import json
from elasticsearch import Elasticsearch


class CoreApiRequestor:
    def __init__(self, endpoint, api_key):
        self.endpoint = endpoint
        self.api_key = api_key
        # defaults
        self.pagesize = 100
        self.page = 1

    def parse_response(self, decoded):
        res = []
        for item in decoded['data']:
            doi = None
            if 'identifiers' in item:
                for identifier in item['identifiers']:
                    if identifier and identifier.startswith('doi:'):
                        doi = identifier
                        break
            res.append([item['title'], doi])
        return res

    def request_url(self, url):
        with urllib.request.urlopen(url) as response:
            html = response.read()
        return html

    def get_method_query_request_url(self, method, query, fullText, page):
        if (fullText):
            fullText = 'true'
        else:
            fullText = 'false'
        params = {
            'apiKey': self.api_key,
            'page': page,
            'pageSize': self.pagesize,
            'fulltext': fullText,
            'urls': 'true'
        }
        return self.endpoint + method + '/' + urllib.parse.quote(query) + '?' + urllib.parse.urlencode(params)

    def get_up_to_20_pages_of_query(self, method, query, fulltext):
        url = self.get_method_query_request_url(method, query, fulltext, 1)
        all_articles = []
        resp = self.request_url(url)
        result = json.loads(resp.decode('utf-8'))
        all_articles.append(result)
        if (result['totalHits'] > 100):
            numOfPages = int(result['totalHits']/self.pagesize)  # rounds down
            if (numOfPages > 20):
                numOfPages = 20
            for i in range(2, numOfPages):
                url = self.get_method_query_request_url(
                    method, query, False, i)
                print(url)
                resp = self.request_url(url)
                all_articles.append(json.loads(resp.decode('utf-8')))
        return all_articles


endpoint = 'https://core.ac.uk/api-v2'
api_key = '5TphODMbCjoQUkWitNZSBVqsEeYlHfnI'
method = '/articles/search'
topic = '*'

api = CoreApiRequestor(endpoint, api_key)
result = api.get_up_to_20_pages_of_query(method, topic, False)


def clean(result):
    mega_json = []
    for p in result:
        for a in p['data']:
            try:
                obj = {}
                k = ['authors', 'title', 'description',
                     'datePublished', 'fulltextUrls', 'journal', 'doi']
                for i in k:
                    if i in a:
                        obj[i] = a[i]
                if 'fulltextUrls' in obj:
                    obj['url'] = obj.pop('fulltextUrls')
                mega_json.append(obj)
            except:
                print('Error occured while cleaning')
    return mega_json


cleaned_data = clean(result)

es = Elasticsearch()

for doc in range(len(cleaned_data)):
    if doc == 100:
        break
    res = es.index(index="core", id=doc, body=cleaned_data[doc])
    # print(doc)

es.indices.refresh(index="core")