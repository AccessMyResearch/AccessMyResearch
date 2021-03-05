from threading import Thread
import schedule
import time
import os
import ssl
import logging
import json
import sys

from elasticsearch import Elasticsearch

from Logger import getLogger
from database_Core import core
from database_DOAJ import doaj
from database_Unpaywall import unpaywall
from HttpUtils import *

# Fix SSL issues if they are present: 
if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)): 
    ssl._create_default_https_context = ssl._create_unverified_context

# Get logger in context of main indexer class: 
logger = getLogger("mainIndexer")
es = Elasticsearch(['https://search-accessmyresearch-rxbdfxn7frebom3di4du5ld464.us-east-2.es.amazonaws.com/'], http_auth=('amr', 'Amr123!!'))
index_name = "articles"

# Define the threads that need to be run:
threadCallBacks = [doaj, core, unpaywall]
threadObjects = []  # NOTE: this will be modified by reference inside runThreads()

# will run after every schedule call
def runThreads():
    # Track runtime
    start_time = time.time()

    params = (es, index_name, getSearchKeywords(),)
    logger.debug("params passed in: %s" % str(params))

    # This block will only run once to initialize the threadObjects array
    if len(threadObjects) == 0: 
        # Create the thread objects:
        for callback in threadCallBacks:
            t = Thread(target=callback, args=params)
            threadObjects.append(t)
            t.start()


    # #Only run the thread if it finished running in the previous iteration
    for index in range(len(threadObjects)):
        # if the thread is not active, then replace it with a new thread
        if not threadObjects[index].is_alive():
            threadObjects[index] = Thread(target=threadCallBacks[index], args=params)
            threadObjects[index].start()
    
    # Join back with all threads to make sure they terminate: 
    for thread in threadObjects:
        try: 
            thread.join()
        except Exception as error: 
            print(error)
  
    #Calculate start and end time: 
    e = int(time.time() - start_time) 
    #Print resulting time: 
    logger.info('All processes done')  
    logger.info(str('Total indexing time: {:02d}:{:02d}:{:02d}').format(e // 3600, (e % 3600 // 60), e % 60))

    
    displayElasticSearchIndexCount()


#Logs the result of the complete indexing process on screen: 
def displayElasticSearchIndexCount():
    es.indices.refresh(index_name)
    elasticSearchTotal = es.cat.count(index_name)
    logger.info("Total documents indexed (epoch|timestamp|count): " + elasticSearchTotal)



def getSearchKeywords(): 
    # Path to keywords that need to be searched
    keywords = sys.argv[3]

    # Reading in the search keywords needed and formatting them
    with open(keywords) as f:
        search_terms = json.load(f)['search']
        # Placing quotes and the "AND" keyword at every space
        for i in range(len(search_terms)):
            search_terms[i] = '"' + search_terms[i].replace(' ', ' AND ') + '"'
        # logger.info("Parsed search terms: %s" % search_terms)

        # Returning the list of formatter keywords
        return search_terms
    pass

#Main method: 
if __name__ == '__main__':
    # test = {1: 'one', 2: 'two', 3: 'three'}
    # print(test)
    # es.index(index="articles", id=id_generator("Hello"), body=test)
    # es.indices.refresh("articles")
    # exit()

    #Check for correct command line arguments: 
    if len(sys.argv) != 4:
        logger.info("Usage: %s <-m for minutes | -h for hours | -d for days> <delay in units> <search terms file path>" % sys.argv[0])
        exit()

    # Get the scheduled time command line args
    scheduledTime = None
    try:
        scheduledTime = int(sys.argv[2])
    except ValueError:
        logger.error("You must enter a numerical value for delay in units.")
        exit()


    job = lambda: runThreads()

    logger.info("Running indexing: (Scheduled every %s %s)" % (scheduledTime, sys.argv[1]))

    # Schedule the job based on the frequency inputted by the user
    if sys.argv[1] == "-m":
        schedule.every(scheduledTime).minutes.do(job)
    elif sys.argv[1] == "-h":
        schedule.every(scheduledTime).hours.do(job)
    elif sys.argv[1] == "-d":
        schedule.every(scheduledTime).days.do(job)
    else:
        logger.error("You must enter a valid time unit flag.")
        exit()

    # Immediately run the first batch of threads
    schedule.run_all(delay_seconds=0)

    # After the threads finish running for the first time, 
    # schedule the next job using on the scheduler library
    while True: 
        try:
            schedule.run_pending()
            time.sleep(1)
        except KeyboardInterrupt: 
            logger.info("Exiting")
            exit()
        except:
            print("Error with scheduling.")

