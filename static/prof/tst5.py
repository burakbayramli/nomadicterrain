from datetime import datetime
from datetime import timedelta
import itertools, os
import pandas as pd
import numpy as np

def calculate_millman(date):
    millman = []
    sum1 = 0; sum2 = 0
    for s in date: sum1+=int(s)
    for s in str(sum1): sum2+=int(s)
    millman.append(sum1)
    millman.append(sum2)
    for s in str(sum1)+str(sum2): millman.append(int(s))
    res = []
    res = [x for x in millman[2:] if x not in res]
    res.insert(0,millman[0])
    res.insert(1,millman[1])    
    return res
   
def calculate_cycle(d):
    birth_date = datetime.strptime(d, '%Y%m%d').date()
    str_d = birth_date.strftime('%d %B %Y')
    now_year = datetime.now().year      
    cs = str(birth_date.day)+"/"+str(birth_date.month)+"/"+str(now_year)
    cycle_date = datetime.strptime(cs, '%d/%m/%Y').date()
    str_cycle_date = cycle_date.strftime('%Y%m%d')
    millman = calculate_millman(str_cycle_date)
    res = str(millman[0])
    res = res[0:2]
    if len (res) > 1:
       total = int(res[0]) + int(res[1])
    else:
       total = int(res[0])
    if total > 9: 
        res = str(total)
        total = int(res[0]) + int(res[1])
    return total
   
   
if __name__ == "__main__": 
   
   res = calculate_cycle("19451005")
   print (res)
   
   
