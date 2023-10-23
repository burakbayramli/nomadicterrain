
```python
import json, os
d = json.loads(open("data/out-40-20.json").read())
lat,lon=40,29
res = np.flipud(np.array(d["%d-%d"%(lat,lon)]))
x = np.linspace(lon,lon+1,120)
y = np.linspace(lat,lat+1,120)
xx,yy = np.meshgrid(x,y)
CS=plt.contour(xx,yy,res,cmap=plt.cm.binary,levels=[50,100,200,400,600,1000])
plt.clabel(CS, fontsize=10, inline=1)
plt.savefig('out.jpg')
```

```text
(120, 120)
```

















