library(mongolite)
library(rjson)

#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dprice3/Documents/Projects/Manale/complete_sample_set2018-08-02.RDS")
#sam_20k <- readRDS("/Users/dprice3/Documents/Projects/sam_20k.RDS")

library(janitor)
samc <- clean_names(sam)

SamCity <- mongo("samcity2", url = "mongodb://localhost/SamCity");
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
for (row in 1:nrow(samc)){
  SamCity$insert(toJSON(samc[row,]))
}
SamCity$index(add = '{coords : "2dsphere"}')

#mongolite can't deal with sfg, I think: Error: No method asJSON S3 class: sfg
#need to add ensure_index for 2d_sphere etc. - think through
