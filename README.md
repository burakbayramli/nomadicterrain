# Nomadic Terrain

A Flask web app that carries features that could not be placed in
BBApps, on https://burakbayramli.github.io. BBApps runs on pure
HTML/Javascript, it has no server side functionality. What could not
be placed there is served via nomadicterrain. It is also the testbed
for BBApps, its client-only code can be tested via the files under
`static`.  To start simply run `main.py`.

### Features

* Most recent messages from Mastodon follows (via RSS)
* Digital book library indexing and search (point to a any pdf directory it will index it)
* Image processing for basic crop, rotate functions.
* Textification of any web site, strips all visual features, leaving behind the
  text-only content.
* Web based file browser, see https://github.com/burakbayramli/webfilebrowser for
  the seperate project.
* Vedic astrology, see https://github.com/burakbayramli/astromaestro for seperate project.

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

