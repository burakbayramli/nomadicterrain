import mindmeld, datetime

#s = "18800101"
s = "19000101"
fout = open("/tmp/out-19000101.json","w")
fout.write("[\n")
for i in range(54790):
#for i in range(3):
    d =  datetime.datetime.strptime(s, "%Y%m%d")
    curr = d + datetime.timedelta(days=i)
    d2 = mindmeld.conv(curr.strftime('%d/%m/%Y'))
    res1 = mindmeld.calculate_millman(d2)
    res2 = mindmeld.get_spiller(d2)
    res3 = mindmeld.get_chinese(d2)
    res4 = mindmeld.calculate_lewi(d2)
    line = str([res2, res3, res1, res4])
    line = line.replace("'",'"')
    fout.write(line)
    fout.write(',\n')
    fout.flush()

fout.write("[]]")

