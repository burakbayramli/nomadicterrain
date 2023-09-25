import os, numpy as np, json, pandas as pd, re
import numpy.linalg as lin, csv

indir = "/opt/Downloads/ml-latest-small"
tmp = "/tmp/movie"

di = json.loads(open("../static/recom/movie_id_int.json").read())
dt = json.loads(open("../static/recom/movie_title_int.json").read())
cluster_ass = np.load("../static/recom/cluster-assignments-9.npz")['arr_0']
picks = pd.read_csv('movpicks3.csv',index_col=0).to_dict('index')
means = np.load(tmp + "/recom/means-9.npz")['arr_0']
mov_id_title = pd.read_csv(indir + "/movies.csv",index_col="movieId")['title'].to_dict()
genre = pd.read_csv(indir + "/movies.csv",index_col="movieId")['genres'].to_dict()

M = 9742
U = 610

vec = np.zeros(M)
for mov,rating in picks.items():
    if str(mov) in dt:
        vec[dt[str(mov)]] = rating['rating']
nearest = np.argmin(lin.norm(vec[vec>0] - means[:,vec>0],axis=1))

close_users = np.arange(1,len(cluster_ass)+1)[cluster_ass==nearest]

recoms = []
fin  = "../ratings-json.csv"
with open(fin) as csvfile:   
    rd = csv.reader(csvfile,delimiter='|')
    for i,row in enumerate(rd):
        jrow = json.loads(row[1])
        if int(row[0]) in close_users:
            for movid,rating in jrow.items():
                fres = re.findall('\((\d\d\d\d)\)', mov_id_title[int(movid)])
                if rating >= 4.5 and \
                   mov_id_title[int(movid)] not in picks and \
                   'Animation' not in genre[int(movid)] and \
                   len(fres)>0 and int(fres[0]) > 2005: \
                   recoms.append([mov_id_title[int(movid)],1])

df = pd.DataFrame(recoms)
df = df.sort_values(1,ascending=False)
df = df.drop_duplicates(0)
df.to_csv("/opt/Downloads/movierecom3.csv",index=None,header=False)
