import numpy as np, json, os, pandas as pd

npz_file = "/home/burak/Documents/repos/simplegeomap/simplegeomap/g10g.npz"
zm = np.load(npz_file)
zm = zm['arr_0']

lat_min, lat_max, lon_min, lon_max, elev_min, elev_max, cols, rows = 0, 50, 0, 90, -407, 8752, 10800, 6000
lon = lon_min + 1/120*np.arange(cols)
lat = lat_max - 1/120*np.arange(rows)

print (lon.shape)
print (lat.shape)

for outerlat in np.linspace(lat_min,lat_max-10,5):
    for outerlon in np.linspace(lon_min,lon_max-10,9):
        print (outerlat,outerlon)        
        d = {}
        for innerlat in np.linspace(outerlat,outerlat+9,10):
            for innerlon in np.linspace(outerlon,outerlon+9,10):
                print ('i',int(innerlat),int(innerlon))
                latminc,lonminc = innerlat,innerlon
                latmaxc,lonmaxc = innerlat+1,innerlon+1

                filt1 = np.where((lon >= lonminc) & (lon < lonmaxc))[0]
                filt2 = np.where((lat >= latminc) & (lat < latmaxc))[0]

                print (len(filt1))
                print (len(filt2))

                zm2 = zm[filt2,:]
                print (zm2.shape)
                zm3 = zm2[:,filt1]
                print (zm3.shape)

                k = "%d-%d" % (int(innerlat),int(innerlon))
                
                d[k] = zm3.tolist()
                
        res = json.dumps(d)                  
        fout = open("data/out-%d-%d.json" % (outerlat,outerlon),"w")
        fout.write(res)
        fout.close()
        #exit()
