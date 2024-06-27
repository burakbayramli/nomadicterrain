# -*- coding: utf-8 -*-
import os; os.chdir(os.path.dirname(__file__))
from flask import Flask, render_template, request, session, redirect, send_file, jsonify
from io import StringIO, BytesIO
import pickle, polyline, util, glob, sys
import json, random, base64, time as timelib
import datetime, shutil, csv, io
from urllib.request import urlopen
import urllib, requests, re
from bs4 import BeautifulSoup
import urllib.request as urllib2
from flask import Response, make_response, current_app

app = Flask(__name__)

params = json.loads(open(os.environ['HOME'] + "/.nomterr.conf").read())

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
    def generate():
        yield content
    return Response(generate(), mimetype='text/html')

@app.route('/extvids')
def extvids():
    import vids
    content = vids.getvids()
    def generate():
        yield content
    return Response(generate(), mimetype='text/html')

@app.route('/extmasto')
def extmasto():
    import masto
    content = masto.getrss()
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
    
@app.route('/url')
def urlpage():
    return render_template('/url.html',url=OnlyOne().url)

@app.route("/url_encode", methods=["POST"])
def url_encode():
    resp = requests.get(request.form.get("url"), headers=headers)
    soup = BeautifulSoup(resp.text,features="lxml")
    texts = soup.findAll(text=True)
    visible_texts = filter(visible, texts)
    content = ""
    for x in visible_texts:
        content += x
    return content
    
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
    params = json.loads(open(os.environ['HOME'] + "/.nomterr.conf").read())
    import loogle
    res = loogle.search(search, params['book_index_db'])
    for path,summary in res:
        summary = summary.replace("<b>","")
        summary = summary.replace("</b>","")
        url = "http://" + request.host + "/static/kitaplar" + path
        row = ["", url, path, summary]
        results.append(row)

    return render_template("/book.html",results=results)

@app.route('/upload_main')
def upload_main():
    return render_template("/upload.html")

@app.route('/upload_main2/<dir>')
def upload_main2(dir):
    dir = base64.decodestring(bytes(dir,'utf-8')).decode('utf-8')
    session['upload_dir'] = dir
    return render_template("/upload2.html",upload_dir=dir)

@app.route('/upload', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      fout =  "/tmp/" + f.filename
      f.save(fout)     
      return 'file uploaded successfully'
   return "OK"

@app.route('/upload2', methods = ['GET', 'POST'])
def upload_file2():
   if request.method == 'POST':
      f = request.files['file']
      print ("uploading", session['upload_dir'] + "/" + f.filename)
      fout =  session['upload_dir'] + "/" + f.filename
      f.save(fout)     
      return 'file uploaded successfully'
   return "OK"

@app.route('/wdired_listdir', methods=["PUT", "POST"])
def listdir():
    data = request.get_json(force=True)   
    dir_par = data['dir']
    subdirs = [x for x in os.listdir(dir_par) if os.path.isdir(os.path.join(dir_par, x))]
    subfiles = [x for x in os.listdir(dir_par) if os.path.isfile(os.path.join(dir_par, x))]
    res = {"dirs": subdirs, "files": subfiles}
    return jsonify(res)

@app.route('/wdired_copy', methods=["PUT", "POST"])
def wdired_copy():
    data = request.get_json(force=True)   
    fromDir = data['fromDir']
    checkedItems = data['checkedItems']
    toDir = data['toDir']
    print (fromDir, checkedItems, toDir)
    for item in checkedItems:
        fr_curr = fromDir + "/" + item
        if os.path.isdir(fr_curr):
            shutil.copytree(fr_curr, toDir + "/" + item)
        if os.path.isfile(fr_curr):
            shutil.copy(fr_curr, toDir)
            
    return jsonify("ok")

@app.route('/wdired_move', methods=["PUT", "POST"])
def wdired_move():
    data = request.get_json(force=True)   
    fromDir = data['fromDir']
    checkedItems = data['checkedItems']
    toDir = data['toDir']
    print (fromDir, checkedItems, toDir)
    for item in checkedItems:
        fr_curr = fromDir + "/" + item
        shutil.move(fr_curr, toDir)
            
    return jsonify("ok")

@app.route('/wdired_delete', methods=["PUT", "POST"])
def wdired_delete():
    data = request.get_json(force=True)   
    fromDir = data['fromDir']
    checkedItems = data['checkedItems']
    print (fromDir, checkedItems)
    for item in checkedItems:
        fr_curr = fromDir + "/" + item
        if os.path.isdir(fr_curr):
            print ("removing dir", fr_curr)
            shutil.rmtree(fr_curr)
        if os.path.isfile(fr_curr):
            print ("removing file", fr_curr)
            os.remove(fr_curr)
                        
    return jsonify("ok")

@app.route('/get_file/<farg>')
def get_file(farg):
    filename = base64.decodestring(bytes(farg,'utf-8')).decode('utf-8')
    print ('read file',filename)
    if (".txt" in filename or ".md" in filename):
        return Response(open(filename).read(), mimetype='text/plain')
    elif (".html" in filename):
        return Response(open(filename).read(), mimetype='text/html')
    elif (".jpg" in filename):
        return send_file(filename, mimetype='image/jpg')
    elif (".png" in filename):
        return send_file(filename, mimetype='image/png')
    elif (".pdf" in filename):
        binary_pdf = open(filename,"rb").read()
        response = make_response(binary_pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'inline; filename=%s.pdf' % 'yourfilename'
        return response
    elif (".mp4" in filename):
        binary_vid = open(filename,"rb").read()
        response = make_response(binary_vid)
        response.headers['Content-Type'] = 'video/mp4'
        response.headers['Content-Disposition'] = 'inline; filename=%s.pdf' % 'yourfilename'
        return response

    
if __name__ == '__main__':
    app.debug = True
    app.secret_key = "aksdfkasf"
    print (len(sys.argv))
    if len(sys.argv) == 2 and sys.argv[1]=="pi":
        app.run(host="192.168.43.89",port=5000)
    elif len(sys.argv) == 2 and sys.argv[1]=="acer":
        app.run(host="192.168.43.49",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="brs":
        app.run(host="192.168.1.102",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="nano":
        app.run(host="192.168.43.34",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="local":
        app.run(host="localhost",port=5000)        
    elif len(sys.argv) == 2 and sys.argv[1]=="lenovo":
        app.run(host="192.168.43.246",port=5000)        
    else: 
        app.run(host="localhost",port=5000)

