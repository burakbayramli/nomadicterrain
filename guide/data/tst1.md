
```python
import pandas as pd

df = pd.read_csv('food.dat',sep=';')
```

```python
df1 = df[df['B_S'] == 'BENEFICIAL']
df1 = df1[['Type','Food']].sort_values(by='Type')
df1[['Food','Type']].to_csv('out.csv',index=None)
```










