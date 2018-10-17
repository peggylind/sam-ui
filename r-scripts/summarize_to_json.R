library(jsonlite)
library(tidyr)
require("lazyeval")
library(reshape2)

library(rgdal)
library(spdplyr)
library(geojsonio)



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


#Takes a summary and converts it into json
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
  t3 <-as.data.frame(t(t2))
  t3 <- rownames_to_column(t3, "zip")
  #convert 
  t3 <- apply(t2,2, function(x) strsplit(x, "_"))
  #save as json
  t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)
  
}

#read in all shapefiles
zipshp <- readOGR(dsn = "USA_Zip_Code_Boundaries/Shapes/", layer = "zip_poly", verbose = FALSE)
#filter for zips in sam
zip_in_sam <- zipshp %>% 
  filter(ZIP_CODE  %in% zip_summed_sam_citizen$zip)

sam_json <- geojsonio::geojson_json(zip_in_sam,)
#write json
geojson_write(sam_json, file = "zip.geojson", )

# NOT RUN
createJSONfromSummed(zip_summed_sam_race, "zip", "test.json")
createJSONfromSummed(zip_summed_sam_citizen, "zip", "test2.json")
createJSONfromSummed(summed_sam_citizen, "tract", "test3.json")



