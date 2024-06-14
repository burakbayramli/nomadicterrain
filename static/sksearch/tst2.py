from collections import defaultdict
import json

def write_to_page():
   search = "oturum bağlantı web"
   search = search.lower().replace("ç","c").replace("ö","o").replace("ğ","g")
   search = search.replace("ı","i").replace("ü","u").replace("ş","s")
   stok = search.split()

   stok_hits = {}

   results = []
  
   base_url = "/home/burak/Documents/repos/nomadicterrain/static/skidx"
   
   for tok in stok:
      url = base_url + '/invidx-%s.json' % tok[0]
      letter_dict = json.loads(open(url).read())
      if tok in letter_dict:
         stok_hits[tok] = letter_dict[tok]
         results.append(set(letter_dict[tok]))

   for x in results:
      print (x)
    
write_to_page()
