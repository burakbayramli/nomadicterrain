from pygeodesy.sphericalNvector import LatLon
import elevutil, uuid, geopy.distance, quads
from numpy.linalg import norm
import matplotlib.pyplot as plt
import numpy as np, folium, requests

def goto_from_coord(start, distance, bearing):
    """
    distance: in kilometers
    bearing: 0 degree is north, 90 is east
    """
    s = geopy.Point(start[0],start[1])
    d = geopy.distance.distance(kilometers = distance)
    reached = d.destination(point=s, bearing=bearing)
    return [reached.latitude, reached.longitude]

def dist(fr,to):
    p1 = LatLon(fr[0], fr[1])
    p2 = LatLon(to[0], to[1])
    return p1.distanceTo(p2)

def bearing(fr,to):
    p1 = LatLon(fr[0], fr[1])
    p2 = LatLon(to[0], to[1])
    return p1.bearingTo(p2)
    
def line_elev_calc(fr, to, fout):
    import matplotlib.pyplot as plt
    npts = 20
    be = bearing(fr, to)
    print (be)
    far = dist(fr,to) / 1000.0
    print (far)
    locs = []
    for x in np.linspace(0,far,npts):
        locs.append(tuple(goto_from_coord([fr[0],fr[1]], x, be)))

    res = get_elev_data2(locs)
    plt.figure()
    plt.plot(np.linspace(0,far,npts),res)
    plt.savefig(fout)

def get_elev_data2(coords):
    url = 'https://api.open-elevation.com/api/v1/lookup?locations='
    for c in coords:
        url += "%s,%s|" % (str(c[0]),str(c[1]))
    res = requests.get(url).json()['results']
    return [r['elevation'] for r in res]

    
def test2():    
    fout = "/tmp/out-%s.png" % uuid.uuid4()
    line_elev_calc((36.649278935208805, 29.157651665059603), (36.69678555770977, 29.142243855775913), fout)

def test3():
    res = get_elev_data2([[36.649278935208805, 29.157651665059603]])
    print (res)

    
if __name__ == "__main__":
    test2()
    test3()
