# -*- coding: utf-8 -*-
import os; os.chdir(os.path.dirname(__file__))
from flask import Flask, render_template, request, session, redirect, send_file
from io import StringIO, BytesIO
import pickle, polyline, util, geocoder
import numpy as np, os, uuid, glob
import sys; sys.path.append("guide")
import json, random, mindmeld, base64, time as timelib
import wind, geopy.distance, datetime, shutil
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

@app.route('/location/<loc>/<zoom>')
def location(loc,zoom):
    import matplotlib.pyplot as plt
    import simplegeomap as sm
    lat,lon = loc.split(';')
    lat,lon=float(lat),float(lon)
    session['geo'] = (lat,lon)
    fout = "static/out-%s.png" % uuid.uuid4()
    clean_dir()
    lat,lon=float(lat),float(lon)
    fig = plt.figure()
    zoom = float(zoom)
    sm.plot_countries(lat,lon,zoom,outcolor='lavenderblush')    
    plt.plot(lon,lat,'rd')
    plt.savefig(fout)    
    return render_template('/location.html', location=fout, lat=lat, lon=lon)

@app.route('/plot_elev/<coords>/<zoom>/<start>/<steps>')
def plot_elev(coords,zoom,start,steps):
    import matplotlib.pyplot as plt
    import simplegeomap as sm
    zoom = float(zoom)
    start = int(start)
    steps = int(steps)    
    fout = "static/out-%s.png" % uuid.uuid4()
    clean_dir()
    currlat,currlon = coords.split(';')
    lat,lon=float(currlat),float(currlon)
    fig,ax = plt.subplots()
    ax.plot(lon,lat,'gd')
    sm.plot_countries(lat,lon,zoom,ax=ax)
    levels = list(range(start,start+(4*steps),steps))
    sm.plot_elevation(lat,lon,zoom,levels=levels,ax=ax)
    plt.savefig(fout)
    plt.clf()
    return render_template('/elev.html', location=fout, lat=lat, lon=lon)

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

@app.route('/gopollution/<coords>')
def gopollution(coords):
    lat,lon = coords.split(';')
    weatherapi = params['weatherapi']
    url = 'http://api.openweathermap.org/data/2.5/air_pollution?'
    payload = { 'lat': str(lat), 'lon': str(lon), 'appid': weatherapi }
    r = requests.get(url, params=payload)
    tmp = [json.loads(x.decode()) for x in r.iter_lines()]
    res = []
    res.append(tmp[0]['list'][0]['main'])
    comp = tmp[0]['list'][0]['components']
    for xx in comp: res.append ((xx, comp[xx]))
    return render_template('/weather.html', res=res)

@app.route('/time/<coords>')
def time(coords):    
    import timezonefinder
    from pytz import timezone
    lat,lon = coords.split(';')
    lat,lon = float(lat),float(lon)
    
    y = datetime.datetime.now().year
    m = datetime.datetime.now().month
    calcurr = str(calendar.month(y, m))

    prev = datetime.datetime.now() - datedelta.MONTH
    next = datetime.datetime.now() + datedelta.MONTH
    calprev = str(calendar.month(prev.year, prev.month))
    calnext = str(calendar.month(next.year, next.month))    
    
    times = {}
    fmt = '%Y-%m-%d %H:%M'
    now_utc = datetime.datetime.now(timezone('UTC'))

    now_ny = now_utc.astimezone(timezone('US/Eastern'))
    times['ny'] = now_ny.strftime(fmt)

    times['utc'] = now_utc.strftime(fmt)

    now_tr = now_utc.astimezone(timezone('Turkey'))
    times['tr'] = now_tr.strftime(fmt)

    tf = timezonefinder.TimezoneFinder()
    timezone_str = tf.certain_timezone_at(lat=lat, lng=lon)
    now_curr = now_utc.astimezone(timezone(timezone_str))
    times['curr'] = now_curr.strftime(fmt)

    weekday = list(calendar.day_name)[now_utc.weekday()]
    
    return render_template('/time.html',
                           calprev=calprev,
                           calcurr=calcurr,
                           calnext=calnext,
                           times=times,
                           weekday=weekday,
                           tzone=timezone_str)

@app.route('/gotopo2/<coords>/<how_far>')
def gotopo2(coords,how_far):
    import elevutil
    lat,lon = coords.split(';')
    how_far = float(how_far)
    fout = TMPDIR + "/out-%s.html" % uuid.uuid4()
    elevutil.plot_topo(lat,lon,how_far,fout)
    return send_file(fout)

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

@app.route('/gowind/<coords>/<ahead>/<wide>')
def gowind(coords,ahead,wide):
    lat,lon = coords.split(';')
    ahead = int(ahead)
    wide = float(wide)
    fout = TMPDIR + "/out-%s.html" % uuid.uuid4()
    wind.plot_wind(lat,lon,ahead,wide,fout) # 0,2,6,22    
    return send_file(fout)

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

@app.route('/directions_main/<coords>')
def directions_main(coords):
    lat,lon = coords.split(';')
    lat,lon=float(lat),float(lon)
    session['geo'] = (lat,lon)
    return render_template('/directions.html')

@app.route("/directions", methods=["POST"])
def directions():
    import routeutil, osmutil
    lat1,lon1 = session['geo']
    lat2 = request.form.get("lat2")
    lon2 = request.form.get("lon2")
    rmethod = request.form.get("rmethod")
    rout = request.form.get("rout")
    fouthtml = TMPDIR + "/direction-%s.html" % uuid.uuid4()        
    if rmethod == "osrm" and rout == "map":
        routeutil.create_osrm_folium(lat1,lon1,lat2,lon2,fouthtml)        
        return send_file(fouthtml)
    elif rmethod == "osrm" and rout == "gpx":
        outfile = TMPDIR + "/out.gpx"
        path = routeutil.create_osrm_gpx(lat1,lon1,lat2,lon2)        
        routeutil.create_gpx(path, TMPDIR + "/out.gpx")
        return send_file(TMPDIR + '/out.gpx',mimetype='text/gpx',as_attachment=True)
    elif rmethod == "nomad" and rout == "gpx":
        outfile = TMPDIR + "/out.gpx"
        fr = (lat1,lon1); to = (float(lat2),float(lon2))
        path = osmutil.shortest_path_coords(fr, to)
        routeutil.create_gpx(path, TMPDIR + "/out.gpx")
        return send_file(TMPDIR + '/out.gpx',mimetype='text/gpx',as_attachment=True)
    elif rmethod == "nomad" and rout == "map":
        fr = (lat1,lon1); to = (float(lat2),float(lon2))
        path = osmutil.shortest_path_coords(fr, to)
        routeutil.create_folium(lat1,lon1,path,fouthtml)
        return send_file(fouthtml)


@app.route('/name_lookup_main')
def name_lookup_main():
    return render_template('/name_lookup.html')
    
@app.route("/name_lookup", methods=["POST"])
def name_lookup():
    name = request.form.get("name")
    method = request.form.get("method")
    print ('method',method)
    res = []
    if method == "online":
        g = geocoder.osm(name)    
        res.append("%s %s" % (name, g.latlng))
    if method == "offline":
        zfile = params['osm_dir'] + "/geolitecity.zip"
        zip_file    = zipfile.ZipFile(zfile)
        items_file  = zip_file.open('geolitecity.csv')
        items_file  = io.TextIOWrapper(items_file)
        rd = csv.reader(items_file)
        headers = {k: v for v, k in enumerate(next(rd))}
        for row in rd:
            if name in row[headers['cityascii2']].lower():
                res.append("%s, %s, %s,%s" % (row[1],row[3],row[5],row[6])   )
        
    return render_template('/name_lookup.html', res=res)



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

