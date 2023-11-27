# -*- coding: utf-8 -*-
import os; os.chdir(os.path.dirname(__file__))
from flask import Flask, render_template, request, session, redirect, send_file
from io import StringIO, BytesIO
import pickle, polyline, util, geocoder
import numpy as np, os, uuid, glob
import sys; sys.path.append("guide")
import json, random, mindmeld, base64, time as timelib
import geopy.distance, datetime, shutil
import csv, io, zipfile, folium
from urllib.request import urlopen
import urllib, requests, re
import gpxpy, gpxpy.gpx
import calendar, datedelta
from bs4 import BeautifulSoup
import urllib.request as urllib2
from unidecode import unidecode

app = Flask(__name__)

params = json.loads(open(os.environ['HOME'] + "/.nomterr.conf").read())

travel_url = "http://localhost:5000/static/travel"

TMPDIR = params['tmpdir']
    
headers = { 'User-Agent': 'UCWEB/2.0 (compatible; Googlebot/2.1; +google.com/bot.html)'}

def clean_dir():
    files = glob.glob("static/out-*.png")
    for f in files: os.remove(f)

def my_curr_location():
    lat,lon = session['geo']
    return lat,lon

@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/extnews')
def extnews():
    import news
    content = news.getnews()
    from flask import Response
    def generate():
        yield content
    return Response(generate(), mimetype='text/html')

@app.route('/extmasto')
def extmasto():
    import masto
    content = masto.getrss()
    from flask import Response
    def generate():
        yield content
    return Response(generate(), mimetype='text/html')


class OnlyOne(object):
    class __OnlyOne:
        def __init__(self):
            self.url = ""
            self.tweet = ""
        def __str__(self):
            return self.val
    instance = None
    def __new__(cls):
        if not OnlyOne.instance:
            OnlyOne.instance = OnlyOne.__OnlyOne()
        return OnlyOne.instance
    def __getattr__(self, name):
        return getattr(self.instance, name)
    def __setattr__(self, name):
        return setattr(self.instance, name)

def visible(element):
   if element.parent.name in ['style', 'script', '[document]', 'head', 'title']:
       return False
   elif re.match('<!--.*-->', str(element)):
       return False
   return True
    
@app.route('/textify/<url>')
def textify(url):
    url = base64.urlsafe_b64decode(bytes(url,'utf-8'))
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text,features="lxml")
    texts = soup.findAll(text=True)
    visible_texts = filter(visible, texts)
    content = ""
    for x in visible_texts:
        content += x
    return content

@app.route('/url')
def urlpage():
    return render_template('/url.html',url=OnlyOne().url)

@app.route("/url_encode", methods=["POST"])
def url_encode():
    url = request.form.get("url")
    e = base64.urlsafe_b64encode(bytes(url,'utf-8'))
    e = str(e); e = e[:-1]; e = e[2:]
    OnlyOne().url = e
    return urlpage()

@app.route('/edit_tweet')
def edit_tweet():
    content = OnlyOne().tweet
    return render_template("/edit_tweet.html",content=content)

@app.route('/submit_tweet', methods=['POST'])
def submit_tweet():
    OnlyOne().tweet = request.form['tweet']
    return redirect("/")

@app.route('/book')
def book():
    return render_template("/book.html")

@app.route('/submit_search', methods=['POST'])
def submit_search():
    results = []
    search = request.form['search']
    rmethod = request.form.get("rmethod")
    if rmethod == "recoll": 
        from recoll import recoll
        db = recoll.connect()
        db.setAbstractParams(maxchars=300, contextwords=4)
        query = db.query()
        nres = query.execute(search)
        print("Result count: %d" % nres)
        newbase = "http://" + request.host + "/static"
        for i in range(200):
            doc = query.fetchone()
            if not doc: continue
            row = []
            size = float(getattr(doc, "size"))
            row.append("%0.1f" % (size / 1e6))
            row.append("%s" % getattr(doc, "url").replace(params['book_dir'],newbase))
            row.append(os.path.basename(getattr(doc, "url")))
            row.append(db.makeDocAbstract(doc, query))
            results.append(row)
    if rmethod == "loogle":
        import loogle
        params = json.loads(open(os.environ['HOME'] + "/.nomterr.conf").read())
        res = loogle.search(search, params['book_index_db'])
        for path,summary in res:
            summary = summary.replace("<b>","")
            summary = summary.replace("</b>","")
            url = "http://" + request.host + "/static/kitaplar" + path
            row = ["", url, path, summary]
            results.append(row)

    return render_template("/book.html",results=results)


@app.route('/elev_line_main/<coords>')
def elev_line_main(coords):
    lat,lon = coords.split(';')
    lat,lon=float(lat),float(lon)
    session['geo'] = (lat,lon)
    return render_template('/elev_line.html')

@app.route("/elev_line_calc", methods=["POST"])
def elev_line_calc():
    import elevutil
    lat1,lon1 = session['geo']
    lat2 = request.form.get("lat2")
    lon2 = request.form.get("lon2")
    fout = TMPDIR + "/out-%s.png" % uuid.uuid4()
    elevutil.line_elev_calc((lat1,lon1), (lat2,lon2), fout)
    return send_file(fout)

@app.route('/upload_main')
def upload_main():
    return render_template("/upload.html")

@app.route('/upload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      fout =  "/tmp/" + f.filename
      f.save(fout)     
      return 'file uploaded successfully'
   return "OK"


if __name__ == '__main__':
    app.debug = True
    app.secret_key = "aksdfkasf"
    print (len(sys.argv))
    if len(sys.argv) == 2 and sys.argv[1]=="pi":
        app.run(host="192.168.43.89",port=5000)
    elif len(sys.argv) == 2 and sys.argv[1]=="acer":
        app.run(host="192.168.43.49",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="nano":
        app.run(host="192.168.43.34",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="local":
        app.run(host="localhost",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="lenovo":
        app.run(host="192.168.43.246",port=5000)        
    else: 
        app.run(host="localhost",port=5000)

