library(jsonlite)
library(tidyr)
require("lazyeval")

# +++++++++++++ for testing
#read RDS
#summed_citizens <- readRDS("~/OneDrive - University Of Houston/DASH Projects/sam_ui_data/summed_citizens.RDS")
#had to remove sf stuff from my test rds, this needs to go away from final code
#summed_citizens$geometry <- NULL 
#create a small sample out of rds object and un
#summed_citizens <- summed_citizens[1:11,]
# ungroup (maybe that is not necessar if prevoius object is ungrouped as last step)
#summed_citizens <- ungroup(summed_citizens)
#add one row to fix the schema of having 4 entries per zip (this onlybworks for the sample)
#summed_citizens <- rbind( summed_citizens[1:7,], c(210100,NA,0), summed_citizens[ 8:11,] )


#########################

createJSONfromSummed <- function(summedup.df, organize_by, json.filename) {
  #reorganize
  t1 <- summedup.df %>% 
    #ungroup() %>%
    unite(united_variables, -(organize_by)) %>%
    mutate(id=1:n()) %>%
    mutate(organize_by = format(organize_by, scientific = FALSE)) %>%
    spread(organize_by, united_variables) %>%
    select(-id)
  
  #remove the NAs and collapse
  t2 <- as.data.frame(apply(t1,2, na.omit))
  #convert 
  t3 <- apply(t2,2, function(x) strsplit(x, "_"))
  #save as json
  t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)
  
}

# NOT RUN
createJSONfromSummed(zip_summed_sam_race, "zip")
createJSONfromSummed(summed_citizens, "tract", "test.json")


t1 <- summed_citizens %>% 
  #ungroup() %>%
  unite(united_variables, -(tract)) %>%
  mutate(id=1:n()) %>%
  mutate(tract = format(tract, scientific = FALSE)) %>%
  spread(tract, united_variables) %>%
  select(-id)

#remove the NAs and collapse
t2 <- as.data.frame(apply(t1,2, na.omit))
#convert 
t3 <- apply(t2,2, function(x) strsplit(x, "_"))
#save as json
t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)

t1 <- zip_summed_sam_race %>% 
  ungroup() %>%
  unite(united_variables, -(zip)) %>%
  mutate(id=1:n()) %>%
  mutate(zip = format(zip, scientific = FALSE)) %>%
  spread(zip, united_variables) %>%
  select(-id)

#remove the NAs and collapse
t2 <- as.data.frame(apply(t1,2, na.omit))
#convert 
t3 <- apply(t2,2, function(x) strsplit(x, "_"))
#save as json
t3 %>% jsonlite::toJSON(pretty = T) %>% writeLines(json.filename)

