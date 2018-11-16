library(jsonlite)
library(tidyr)
require("lazyeval")


library(spdplyr)
library(sf)
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
  t2 <- apply(t1,2, na.omit)
  #convert 
 #t3 <- apply(t2,2, function(x) strsplit(x, "_"))
  #save as json
 # t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)
  return(t2)
}


t1 <- creategeoJSONfromSummed(zip_summed_sam_race, "zip", "test.json")
t2 <- creategeoJSONfromSummed(zip_summed_sam_race, "zip", "test.json")
output <- data.frame(zip = colnames(t2))

t3 <- t(t2)

output$race <- t2[,1:ncol(t2)]
t5 <- melt(t4)

t3 <- t(t2)
t3[[142]] <- NULL

#read in all shapefiles
zipshp <- st_read(dsn = "USA_Zip_Code_Boundaries/Shapes/", layer = "zip_poly")

#filter for zips in sam
sf_summed <- zipshp %>% 
  filter(ZIP_CODE  %in% zip_summed_sam_citizen$zip)

#add zip summary data
test <- merge(sf_summed, t3, by.x = "ZIP_CODE")

#convert into geojson
geo <- geojsonio::geojson_json(sf_summed[1, ], pretty = T)

#write geojson file
write(geo, "test4.geojson")


# NOT RUN
createJSONfromSummed(zip_summed_sam_race, "zip", "test.json")
createJSONfromSummed(zip_summed_sam_citizen, "zip", "test2.json")
createJSONfromSummed(summed_sam_citizen, "tract", "test3.json")



