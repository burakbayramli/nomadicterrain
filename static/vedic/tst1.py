from datetime import datetime
from pytz import timezone, utc
from timezonefinder import TimezoneFinder
tf = TimezoneFinder() 
today = datetime.now()
tz_target = timezone(tf.certain_timezone_at(lng=32.94905410633718, lat=39.774503259632304))
today_target = tz_target.localize(today)
today_utc = utc.localize(today)
off = (today_utc - today_target).total_seconds() / 3600
print (off)

