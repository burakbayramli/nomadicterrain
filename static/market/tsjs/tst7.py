import pandas as pd, datetime, time
import urllib.request as urllib2
from io import BytesIO
import urllib.parse

end = datetime.datetime.now()
start=end-datetime.timedelta(days=90)
start = int(time.mktime(start.timetuple()))
end = int(time.mktime(end.timetuple()))

url = "https://query1.finance.yahoo.com/v7/finance/download/^IXIC?period1=" + str(start) + "&period2=" + str(end) + "&interval=1d&events=history&includeAdjustedClose=true"
#url = "https://query1.finance.yahoo.com/v7/finance/download/MSFT"
safe_string = urllib.parse.quote_plus(url)
print (safe_string)
r = urllib2.urlopen(url).read()
file = BytesIO(r)
df = pd.read_csv(file,index_col='Date')
df.to_csv('/tmp/out.csv')
