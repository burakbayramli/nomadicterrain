# Nomadic Terrain

A Flask application that has useful features for campers, on-the-go
travelers. To start simply run `main.py`.

### Features

* Current weather and prediction for the next 7 days using Open Weather Map
* Current pollution levels
* Elevation mapping both online and offline
* Path elevation between current location towards a target
* Graphical wind display, current and prediction
* Amenities search (cafe, atm, camps) via OSM
* Trip preperation, mapping (walking routes, cafes, restaurants)
* Latest news retrieval via RSS from reputable sources
* Most recent messages from Mastodon follows (via RSS)
* Digital book library indexing and search
* Automatic psych profiling
* Shortest path calculation between two points for walking
* Previous, current and next month's calendar including current time
  displayed in various time zones

### Installation

- Install all packages under `requirements.txt`

- Need a `.nomterr.conf` config file under your `$HOME` which has your
  Open Weather Map API key as well as other definitions in it.  It is
  easy to get, register to OWM for free, and API key will be
  generated. Same for quandl.

An example `nomterr.conf` file looks like

```
{
  "guide_detail_dir": "/home/burak/Documents/kod/nomadicterrain/guide/doc/details",
  "spiller_pdf": "/home/burak/Documents/kod/nomadicterrain/static/spiller.json",
  "weatherapi": "[key]",
  "hay": "/dir/dir/etc",
  "quandl": "[quandl key]",
  "book_dir": "file:///home/burak/Documents",
  "osm_dir": "/mnt/3d1ece2f-6539-411b-bac2-589d57201626/home/burak/Downloads/osm/tr",
  "tmpdir": "/tmp",
  "book_index_db": "/dir/dir/kitaplar-loogle.db",
  "book_dir": "/home/burak/Documents/kitaplar",
  "osm_city": "İstanbul"
}
```

### Contributors

Please feel free to submit bug reports, enhancements. 



