select d.object_name 
from dprotect d, 
dprotect d2 
plan d where d.object = "P" 
and d.group = 0 
join d2 where d.object= d2.object 
and d.object_name = d2.object_name 
and d.group != d2.group 
go
