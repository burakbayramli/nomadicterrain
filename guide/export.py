import mindmeld, datetime

s = "18800101"

#for i in range(54790):
for i in range(3):
    d = datetime.datetime.strptime(s, "%Y%m%d")
    curr = d + datetime.timedelta(days=i)
    res = mindmeld.calculate_millman(mindmeld.conv(curr.strftime('%d/%m/%Y')))
    print (res)

