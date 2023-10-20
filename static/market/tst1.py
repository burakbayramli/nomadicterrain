import matplotlib.pyplot as plt
import pandas as pd, datetime, time as timelib
import urllib.request as urllib2
from io import StringIO, BytesIO

plt.figure()

end = datetime.datetime.now()
start=end-datetime.timedelta(days=90)
print (start,end)
start = int(timelib.mktime(start.timetuple()))
end = int(timelib.mktime(end.timetuple()))
print (start,end)
exit()

url = "https://query1.finance.yahoo.com/v7/finance/download/^IXIC?period1=" + str(start) + "&period2=" + str(end) + "&interval=1d&events=history&includeAdjustedClose=true"
#url = "https://test.cors.workers.dev/?https://query1.finance.yahoo.com/v7/finance/download/^IXIC?period1=1689958220&period2=1697734220&interval=1d&events=history&includeAdjustedClose=true"
print (url)


r = urllib2.urlopen(url).read()
file = BytesIO(r)
df1 = pd.read_csv(file,index_col='Date',parse_dates=True)

url = "https://query1.finance.yahoo.com/v7/finance/download/^RUT?period1=" + str(start) + "&period2=" + str(end) + "&interval=1d&events=history&includeAdjustedClose=true"
print (url)
r = urllib2.urlopen(url).read()
file = BytesIO(r)
df2 = pd.read_csv(file,index_col='Date',parse_dates=True)

ax1 = df2['Adj Close'].plot(color='blue', grid=True, label='Nasdaq')
ax2 = df1['Adj Close'].plot(color='red', grid=True, label='Russell',secondary_y=True)
h1, l1 = ax1.get_legend_handles_labels()
h2, l2 = ax2.get_legend_handles_labels()
plt.legend(h1+h2, l1+l2, loc=2)
fout = "/tmp" + "/out.png"
plt.savefig(fout)
