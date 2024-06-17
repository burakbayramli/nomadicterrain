from bs4 import BeautifulSoup 
import feedparser, sys, codecs
import re, requests, random, os
import re, time, os

def strip_html(input):
    return BeautifulSoup(input, "lxml").text

skip_words = ["Turkey", "Elon", "Musk","Tesla", "Mars","black hole","AI", "EV"]

def getnews():
    feeds = [
        ("H2 Central","https://hydrogen-central.com/feed/",20),
        ("Politico.eu","https://www.politico.eu/feed/",5),
        ("Hindustan Times World","https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml",10),
        ("Informed Comment","https://www.juancole.com/feed",10),
        ("The American Conservative","https://www.theamericanconservative.com/feed",10)
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
                if lim > 0 and i==int(lim): break
                link = post.link; title = post.title
                summary = strip_html(post.summary)
                skip = False
                for w in skip_words:
                    if len(re.findall(w, title, re.IGNORECASE)) > 0:
                        skip = True
                    if len(re.findall(w, summary, re.IGNORECASE)) > 0:
                        skip = True
                if skip: continue
                                
                content += "<a href='%s'>%s</a><br/><br/>\n" % (link, title)
                content += "%s<br/><br/>\n" % (summary)
        except Exception as e:
            print (repr(e))
            continue
        
    return content

if __name__ == "__main__": 
    res = getnews()
    fout = open("/tmp/news.html","w")
    fout.write(res)
    fout.close()
