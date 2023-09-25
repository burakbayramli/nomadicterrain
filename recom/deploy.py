import os, numpy as np, json, pandas as pd, csv, shutil

ITER = 10
K = 5
U = 610
tmp = "/tmp/movie"
indir = "/opt/Downloads/ml-latest-small"
outdir = "/home/burak/Documents/repos/burakbayramli.github.com/recom"

means = np.load(tmp + "/means-%d.npz" % int(ITER-1))['arr_0']
fout = open(outdir + '/means.json',"w")
means_dict = {}
for i in range(K): means_dict[i] = list( np.round(means[i,:],4) )
fout.write(json.dumps(means_dict))
fout.close()    

shutil.copy(tmp + "/movie_title_int.json", outdir)

shutil.copy(tmp + "/movie_id_int_rev.json", outdir)

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
    fout = open(outdir + "/cluster_members_%d.json"%k,"w")
    tmp = [int(x) for x in picks.keys()]
    fout.write(json.dumps(tmp))
    fout.write('\n')
    fout.close()
    
