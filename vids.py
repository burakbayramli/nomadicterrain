from bs4 import BeautifulSoup 
import feedparser, sys, codecs
import re, requests, random, os
import re, time, os

def strip_html(input):
    return BeautifulSoup(input, "lxml").text

def getvids():
    feeds = [
        ("WA", "https://www.youtube.com/feeds/videos.xml?channel_id=UCBS7ypf4ccm6e_bu35EiAAA",10)        
    ]

    content = ""
    content += '''
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/static/main.css" media="screen" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
    '''
    
    for name,url,lim in feeds:
        print (name)
        content += "<h3>" + name + "</h3>\n"
        try:
            d = feedparser.parse(url)
            for i,post in enumerate(d.entries):
                print ('link',post.link)
                print ('ssm',post.summary)
        except Exception as e:
            print (repr(e))
            continue
        
    return content

if __name__ == "__main__": 
    res = getvids()
