
```python
import pandas as pd
input_file_path = 'foods2.csv'
output_file_path = 'foods3.csv'
df = pd.read_csv(input_file_path,sep=';')
df['rank'] = df.apply(lambda row: int(row[row == 'x'].index[0].replace('r', '')), axis=1)
df.to_csv(output_file_path, sep=';',index=False)
```

```python
import pandas as pd
df = pd.read_csv('foods3.csv',sep=';')
df = df[df['rank'] >= 3]
df = df.sort_values(['Food Category','rank'],ascending=False)
df.to_csv("foods4.csv",sep=';',index=False)
```







