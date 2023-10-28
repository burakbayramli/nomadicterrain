import netCDF4
import numpy as np

f = netCDF4. Dataset('SILAM-AQstat-glob06_v5_8_2023102700.nc4')
print ('0--------------------')
print(f. variables) # get all variable names.
print ('1--------------------')
print(f. variables.keys()) # get all variable names.
print ('2--------------------')
pm25 = f.variables['daymean_cnc_PM2_5'] 
pm25 = f.variables['daymean_cnc_PM2_5'].shape
print ('3--------------------')
print (pm25)
print ('4--------------------')
print (f.variables['daymean_cnc_PM2_5'][0,0,0,0])
print (f.variables['daymean_cnc_PM2_5'][0,0,0,1 ])
