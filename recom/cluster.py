import os, numpy as np, json, pandas as pd
import numpy.linalg as lin

K = 5
M = 9742
U = 610
indir = "/opt/Downloads/ml-latest-small"
fin1  = indir + "/ratings-json.csv"
tmp = "/tmp/movie"
if os.path.exists(tmp) == False: os.mkdir(tmp)

np.random.seed(0)

def process(file_name,N,hookobj):
    file_size = os.path.getsize(file_name)
    beg = 0
    chunks = []
    for i in range(N):
        with open(file_name, 'r') as f:
            s = int((file_size / N)*(i+1))
            f.seek(s)
            f.readline()
            end_chunk = f.tell()-1
            chunks.append([beg,end_chunk])
            f.close()
        beg = end_chunk+1
    c = chunks[hookobj.ci]
    with open(file_name, 'r') as f:
        f.seek(c[0])
        i = 0
        while True:
            if i%200 == 0: print ('line',i)
            i += 1
            line = f.readline()
            hookobj.exec(line)
            if f.tell() > c[1]: break
        f.close()
        hookobj.post()

class KMeans1Job:
    def __init__(self,ci,iter_no):
        self.ci = ci
        self.iter_no = iter_no
        self.movie_id_int = json.loads(open(tmp + "/movie_id_int.json").read())
        self.cluster_ass = np.load(tmp + "/cluster-assignments-%d.npz" % int(self.iter_no-1))['arr_0']
        self.s = np.zeros((K,M))
        self.N = np.zeros((K,M))
                
    def exec(self,line):
        id,jsval = line.split("|")
        ratings = json.loads(jsval)
        my_k = int(self.cluster_ass[int(id)])
        for mov,rating in ratings.items():
            self.s[my_k, self.movie_id_int[mov]] += rating
            self.N[my_k, self.movie_id_int[mov]] += 1.0
                
    def post(self):
        means = np.divide(self.s, self.N, out=np.zeros_like(self.s), where=self.N>0)
        np.savez(tmp + '/means-%d' % self.iter_no, means)

class KMeans2Job:
    def __init__(self,ci,iter_no):
        self.ci = ci
        self.iter_no = iter_no
        self.means = np.load(tmp + "/means-%d.npz" % int(self.iter_no))['arr_0']
        self.movie_id_int = json.loads(open(tmp + "/movie_id_int.json").read())
        self.cluster_ass = np.zeros((U,))

        
    def exec(self,line):
        id,jsval = line.split("|")
        ratings = json.loads(jsval)
        vec = np.zeros(M)
        for mov,rating in ratings.items():
            vec[self.movie_id_int[str(mov)]] = rating
        nearest = np.argmin(lin.norm(vec[vec>0] - self.means[:,vec>0],axis=1))
        self.cluster_ass[int(id)] = nearest
        
    def post(self):
        np.savez(tmp + '/cluster-assignments-%d' % self.iter_no,self.cluster_ass)
        
        
def prepare():

    df = pd.read_csv(indir + "/movies.csv")
    d = df.reset_index().set_index('movieId')['index'].to_dict()
    fout = open(tmp + "/movie_id_int.json","w")
    fout.write(json.dumps(d))
    fout.close()

    df = pd.read_csv(indir + "/movies.csv")
    d = df.reset_index().set_index('title')['index'].to_dict()
    fout = open(tmp + "/movie_title_int.json","w")
    fout.write(json.dumps(d))
    fout.close()

    drev = {}
    for k,v in d.items(): drev[int(v)] = k    
    fout = open(tmp + "/movie_id_int_rev.json","w")
    fout.write(json.dumps(drev))
    fout.close()
            
    cluster_ass = np.random.randint(K,size=U)
    np.savez(tmp + '/cluster-assignments-0',cluster_ass)

    
prepare()
#util.process(file_name='../ratings-json.csv', N=1, hookobj = KMeans1Job(0,1))
#util.process(file_name='../ratings-json.csv', N=1, hookobj = KMeans2Job(0,1))

for iter_no in range(1,10):
    print ('iteration=================================', iter_no)
    print ('means')
    process(file_name=fin1, N=1, hookobj = KMeans1Job(0,iter_no))
    print ('cluster assignments')
    process(file_name=fin1, N=1, hookobj = KMeans2Job(0,iter_no))
