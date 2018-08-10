library(mongolite)
library(rjson)

#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dprice3/Documents/Projects/Manale/complete_sample_set2018-08-02.RDS")
#sam_20k <- readRDS("/Users/dprice3/Documents/Projects/sam_20k.RDS")

library(janitor)
samc <- clean_names(sam)

#should rm old, then replace with same name, but don't know about indices

SamCity <- mongo("samcity2", url = "mongodb://localhost/SamCity");
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
for (row in 1:nrow(samc)){
  SamCity$insert(toJSON(samc[row,]))
}
SamCity$index(add = '{"coords" : "2dsphere"}')
SamCity$index(add = '{"one_of" : 1 }')
SamCity$index(remove = 'one_of_1')
#add more! income, race, member, etc.

#mongolite can't deal with sfg, I think: Error: No method asJSON S3 class: sfg
#need to add ensure_index for 2d_sphere etc. - think through
