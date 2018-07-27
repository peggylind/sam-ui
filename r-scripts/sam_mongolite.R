library(mongolite)
library(rjson)

#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dprice3/Documents/Projects/sam_full_geom_7_7.RDS")
sam_20k <- readRDS("/Users/dprice3/Documents/Projects/sam_20k.RDS")
library(janitor)
samc <- clean_names(sam_20k)

SamCity <- mongo("samcity20k", url = "mongodb://localhost/SamCity");
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
for (row in 1:nrow(samc)){
  SamCity$insert(toJSON(samc[row,]))
}

#mongolite can't deal with sfg, I think: Error: No method asJSON S3 class: sfg

