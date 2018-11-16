library(jsonlite)
library(tidyr)
require("lazyeval")
library(reshape2)






#Takes a summary and converts it into json
createJSONfromSummed <- function(summedup.df, organize_by, json.filename) {
  #reorganize
  t1 <- summedup.df %>% 
    ungroup() %>%
    unite(united_variables, -(organize_by)) %>%
    mutate(id=1:n()) %>%
    #mutate(organize_by = format(as.name(organize_by), scientific = FALSE)) #%>%
    spread(organize_by, united_variables) %>%
    select(-id)
  
  #remove the NAs and collapse
  t2 <- as.data.frame(apply(t1,2, na.omit))
  #convert 
  t3 <- apply(t2,2, function(x) strsplit(x, "_"))
  #save as json
  t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)
  
}


#Takes a summary and converts it into geojson
creategeoJSONfromSummed <- function(summedup.df, organize_by, json.filename) {
  #reorganize
  t1 <- summedup.df %>% 
    ungroup() %>%
    unite(united_variables, -(organize_by)) %>%
    mutate(id=1:n()) %>%
    #mutate(organize_by = format(as.name(organize_by), scientific = FALSE)) #%>%
    spread(organize_by, united_variables) %>%
    select(-id)
  
  #remove the NAs and collapse
  t2 <- as.data.frame(apply(t1,2, na.omit))
  #convert 
  t3 <- sapply(t2, function(x) strsplit(x, "_"))
  #save as json
  #t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)
  return(t3)
}

organize_by <- "zip"
t3 <- creategeoJSONfromSummed(summedup.df, organize_by)

library(sf)
library(spdplyr)
library(geojsonsf)
#read in all shapefiles
zipshp <- st_read(dsn = "zipcode/ZIPCODE.shp")

#filter for zips in sam_summaries
zips <- as.numeric(as.character(zip_summed_citizens$zip))
zip_in_sam <- zipshp %>% 
  filter(ZIPCODE %in% zips)

#merge with summed data


#convert sf to geojson
geo <- sf_geojson(sf_summed)
#write file
write(geo, "test4.geojson")


# NOT RUN
createJSONfromSummed(zip_summed_sam_race, "zip", "test.json")
createJSONfromSummed(zip_summed_sam_citizen, "zip", "test2.json")
createJSONfromSummed(summed_sam_citizen, "tract", "test3.json")



