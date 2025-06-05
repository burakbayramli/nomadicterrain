from bs4 import BeautifulSoup 
import feedparser, sys, codecs
import re, requests, random, os
import re, time, os

def strip_html(input):
    return BeautifulSoup(input, "lxml").text

skip_words = ["Pope Leo","Turkey", "Elon", "Musk","Tesla", "Mars","battery","electric"]

def getnews():
    feeds = [
        ("Politico","https://www.politico.com/rss/politicopicks.xml",5),
	("TDB","https://www.thedailybeast.com/arc/outboundfeeds/rss/articles",5),
	("The Guardian","http://www.theguardian.com/world/rss",5),
	("CNBC","https://www.cnbc.com/id/100727362/device/rss/rss.html",5),
	("NYT", "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",5),
	("France 24","https://www.france24.com/en/rss",5),
	("Al Monitor", "https://www.al-monitor.com/rss",5),
	("TASS", "http://tass.com/rss/v2.xml",5),
	("First Post","https://www.firstpost.com/commonfeeds/v1/mfp/rss/world.xml",5),
	("WION","https://www.wionews.com/feeds/world/rss.xml",5),
	("Arab News","https://www.arabnews.com/cat/3/rss.xml",5),
        ("H2 Central","https://hydrogen-central.com/feed/",20),
        ("Politico.eu","https://www.politico.eu/feed/",5),
        ("The Lever","https://www.levernews.com/rss/",5),
        ("WaPo","https://feeds.washingtonpost.com/rss/national",5),
        ("Hindustan Times World","https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml",10),
        ("Informed Comment","https://www.juancole.com/feed",10),
        ("H2 GN","https://news.google.com/rss/search?q=intitle:hydrogen+when:24h&hl=en-US&gl=US&ceid=US:en",5),
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
