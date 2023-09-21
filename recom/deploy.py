import os, numpy as np, json, pandas as pd, csv, shutil

ITER = 10
K = 5
U = 610
tmp = "/tmp/movie"
indir = "/opt/Downloads/ml-latest-small"
outdir = "/home/burak/Documents/repos/burakbayramli.github.com/recom"

means = np.load(tmp + "/means-%d.npz" % int(ITER-1))['arr_0']
np.savetxt(outdir + '/means.csv',means,fmt='%3.5f')

shutil.copy(tmp + "/movie_title_int.json", outdir)

di = json.loads(open(tmp + "/movie_id_int.json").read())
direv = json.loads(open(tmp + "/movie_id_int_rev.json").read())
cluster_ass = np.load(tmp + "/cluster-assignments-9.npz")['arr_0']

for k in range(K):
    picks = {}
    k_members = np.arange(0,U)[cluster_ass==k]
    fin  = indir + "/ratings-json.csv"
    with open(fin) as csvfile:   
        rd = csv.reader(csvfile,delimiter='|')
        for i,row in enumerate(rd):
            jrow = json.loads(row[1])
            if int(row[0]) in k_members: 
                for movid,rating in jrow.items():                
                    if rating >= 4.0: picks[movid] = 1
    fout = open(outdir + "/cluster_members_%d.csv"%k,"w")
    for k in picks: fout.write(k + "\n")
    fout.close()
      
