# Nomadic Terrain

A Flask web app that carries features that could not be placed in BBApps, on
https://burakbayramli.github.io. BBApps runs on pure HTML/Javascript, it has
not server side functionality. What could not be placed there is in
Nomadicterrain. To start simply run `main.py`.

### Features

For the current location (either received from phone, or manually set),
it can supply

* Current weather and prediction for the next 7 days using Open Weather Map
* Current pollution levels
* Elevation mapping within a radius both online and offline
* Path elevation between current location towards a point target as a line graph
* Graphical wind display, current and prediction
* Amenities search (cafe, atm, camps) via an online OSM based free service
* Trip preperation via files, presented on a map with walking routes, cafes, restaurants
* Latest news retrieval via RSS from reputable sources
* Most recent messages from Mastodon follows (via RSS)
* Digital book library indexing and search (point to a any pdf directory it will index it)
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

Offline name lookup requires `geolitecity.zip` file under `osm_dir`, file is [here](https://drive.google.com/uc?export=view&id=1pkhBQcax7tjtWHdV3E2xOqheJmz__PTw).

### Contributors

Please feel free to submit bug reports, enhancements. 



