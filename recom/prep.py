import json, csv
d = "/opt/Downloads/ml-latest-small"
fin = d + "/ratings.csv"
fout = d + "/ratings-json.csv"
curruser = 0
row_dict = {}
fout = open(fout, "w")
with open(fin) as csvfile:   
    rd = csv.reader(csvfile,delimiter=',')
    headers = {k: v for v, k in enumerate(next(rd))}
    for row in rd:
        if row[headers['userId']] != curruser:
            fout.write(str(curruser) + "|")
            fout.write(json.dumps(row_dict))
            fout.write("\n")
            fout.flush()
            curruser = row[headers['userId']]
            row_dict = {}       
        row_dict[int(row[headers['movieId']])] = float(row[headers['rating']])
fout.close()
