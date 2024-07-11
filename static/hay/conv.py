# Converts txt to json
import re, json

res = open("hay.txt").read()

res = res.split("\n\n")

d = {}

for x in res:
    if ":" in x:
        x = x.strip()
        a,b = x.split(":")
        d[a] = b.strip()
        
fout = open("hay.json","w")
fout.write(json.dumps(d))
fout.close()
