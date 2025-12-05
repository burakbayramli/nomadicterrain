import feedparser, sys, codecs, pytz
import re, requests, random, os
import time, os, datetime, pandas as pd

skip_words = ["empire","deep state","wolff"]

def getvids(daysago):
    vbase = "https://www.youtube.com/feeds/videos.xml?channel_id="
    feeds = [ ("neutrality","UCHdLVKdAeG6zAeZMGZh91bg",5),
              ("clysdale","UCqpNHx_gjAV70G-H1jZMpOg",5),
              ("alice","UCrCTC5_t-HaVJ025DbYITiw",5),
              ("scottish","UCzCi3Vxl5RPlHZtKJDo2Y9Q",5),
              ("cappy","UCwrpo8z3IgJln2ZidqBUiMA",5),
              ("niki","UCNmv0SUwrOkEqadKneNRwHg",5),
              ("em&joel","UCbn5xzRrAOY9DWJlbyPBsvg",5),
              ("werleman","UCa1_vNx2yAQzFnQWNajUHtg",5),
              ("willem","UCF1fG3gT44nGTPU2sVLoFWg",5),
              ("tibees","UC52kszkc08-acFOuogFl5jw",5),              
              ("haiph","UCOxLhz6B_elvLflntSEfnzA",5),
              ("rosen","UCvsIlofcT7DF3Kk8pz9yFfw",5),
              ("encamp","UCRIeMHsEdzA9RroG19kXdYg",5),
              ("LPPFusion","UCiBditpj7sdROMYz02qoCMQ",5),
              ("sky scholar","UCL7QIOZteWPpBWBOl8i0e-g",5),
              ("dialogue works","UCkF-6h_Zgf9zXNUmUB-MzTw",5)
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
    week_ago = datetime.datetime.today().replace(tzinfo=pytz.UTC) - datetime.timedelta(days=daysago)
    for name,url,lim in feeds:
        print (name)
        content += "<h2>" + name + "</h2>\n"
        skip = False
        try:
            d = feedparser.parse(vbase + url)
            for i,post in enumerate(d.entries):
                post_date = pd.to_datetime(post.published).to_pydatetime()
                if post_date < week_ago: continue
                for w in skip_words:
                    if w in post.title.lower() or w in post.summary.lower(): skip = True
                if skip: continue
                v = post.link.replace("https://www.youtube.com/watch?v=","")
                summary = "<p>" + post.summary[:400] + "</p>"
                vimg = "http://img.youtube.com/vi/%s/0.jpg" % v
                content += "<p><a href='%s'>%s</a></p>" % (post.link, post.title)
                content += "<p><img width='200' src='%s'></p>" % (vimg)
                content += "<p>%s</p>" % (summary)
                content += "<p><h4>%s</h4></p>" % (post_date)
                if i>lim: break
        except Exception as e:
            print (repr(e))
            continue
        content += "<hr/>"
        
    return content

if __name__ == "__main__": 
    res = getvids(7)
    fout = open("/tmp/vids.html","w")
    fout.write(res)
    fout.close()
