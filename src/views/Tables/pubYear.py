import os
import re
import json

def main():
    # Counter variable for dates being written into json file
    counter = 0
    # Check current json file to see how many publications are already present 
    with open("yearPub.json") as jsonFile:
        jsonData=jsonFile.read()
        jsonObj = jsonData[jsonData.find('[') : jsonData.rfind(']') + 1]
        lines = jsonObj.split("\n")
        lineCounter = len(lines) - 2
    # Open articles.js to see how many total articles are in there 
    with open("articles.js") as dataFile:
        data=dataFile.read()
        obj = data[data.find('[') : data.rfind(']') + 1]
        modified = obj.split("id: ")
        numberOfPublications = len(modified) - 1
        # Compare number of publications within the json file and the articles file to determine if updates are needed
        if numberOfPublications == lineCounter or numberOfPublications < lineCounter:
            exit()
        # If new articles are availble, then add them in
        elif numberOfPublications > lineCounter:
            # Code to break apart the large string taken from articles.js to find only the date
            os.system("rm -rf yearPub.json")    # Command to reset json file to avoid duplicates
            dateAdder = obj.split("date: ")
            newDate = []
            finalDate = []
            for i in dateAdder:
                newDate.append(i.split(",")[0])
            for x in newDate:
                if x.startswith('\''):
                    finalDate.append(x)
            # Once the dates are determined, format the string and place it into a text file
            f = open("pub.txt", "a")
            f.write("[ \n")
            for y in finalDate:
                counter +=1
                newStr = (y.replace("\'", "\""))
                f.write(newStr)
                if counter != len(finalDate):
                    f.write(",\n")
            f.write("\n]")
            # Convert the text file into json with proper formatting for the file to be read by app
            os.system("mv pub.txt yearPub.json")

main()
