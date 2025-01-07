import feedparser, sys, codecs
import re, requests, random, os
import re, time, os

def getvids():
    vbase = "https://www.youtube.com/feeds/videos.xml?channel_id="
    feeds = [
        ("alice",    "UCrCTC5_t-HaVJ025DbYITiw",5),
        ("niki",     "UCNmv0SUwrOkEqadKneNRwHg",5),
        ("ssoberry", "UCSZQK43hJ422otti5D3iNgA",5),
        ("ameinavan","UCMoXBV0j3BZAMKqm42vpYtg",5),
        ("clysdale","UCqpNHx_gjAV70G-H1jZMpOg",5)
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
        content += "<h2>" + name + "</h2>\n"
        try:
            d = feedparser.parse(vbase + url)
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
