from bs4 import BeautifulSoup 
import feedparser, sys, codecs
import re, requests, random, os
import re, time, os

def strip_html(input):
    return BeautifulSoup(input, "lxml").text

def getvids():
    feeds = [
        ("Everything Always", "https://www.youtube.com/feeds/videos.xml?channel_id=UCBS7ypf4ccm6e_bu35EiAAA",5) 
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
        content += "<h3>" + name + "</h3>\n"
        try:
            d = feedparser.parse(url)
            for i,post in enumerate(d.entries):
                v = post.link.replace("https://www.youtube.com/watch?v=","")
                summary = "<br><br>" + post.summary[:400]
                vimg = "http://img.youtube.com/vi/%s/0.jpg" % v
                content += "<a href='%s'>%s</a><br/><br/>\n" % (post.link, post.title)
                content += "<img width='200' src='%s'>\n" % (vimg)
                content += "%s<br/><br/>\n" % (summary)
                if i>lim: break
        except Exception as e:
            print (repr(e))
            continue
        
    return content

if __name__ == "__main__": 
    res = getvids()
    fout = open("/tmp/vids.html","w")
    fout.write(res)
    fout.close()
