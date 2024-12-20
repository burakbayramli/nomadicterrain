

```python
from datetime import datetime
from pytz import timezone, utc

def get_offset(*, lat, lng):
    today = datetime.now()
    tz_target = timezone(tf.certain_timezone_at(lng=lng, lat=lat))
    today_target = tz_target.localize(today)
    today_utc = utc.localize(today)
    return (today_utc - today_target).total_seconds() / 60

ankara = {"lat": 39.774503259632304, "lng": 32.94905410633718}
bursa = {"lat": 40.0705882859047, "lng": 28.83830787014137}
#minute_offset = get_offset(**ankara)
minute_offset = get_offset(**bursa)
print (minute_offset / 60)
```

```text
3.0
```









