library(mongolite)
library(rjson)


#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NewSAMData/complete_sample_set2018-09-22.RDS")
library(dplyr)

test_sam <- sample_n(sam,100000)
#mongo doesn't like . in keys, so have to clean them out - they're still in factors.
library(janitor)
sam <- clean_names(sam)

#Error in toJSON(samc[row, ]) : 
#unable to escape string. String is not utf8
#seems to have been 4or5 places with weird characters in the notes columns - 1782584,1850900,1868732,1937535
#find them or just delete whole notes column:
library (dplyr)
sam <- sam %>% select(-note,-building_style_code,-hcad_num,-condo_flag,
                                 -loc_addr,-shape_area,-shape_len,-valid,-ms_replacement_cost,
                                 -county_2,-tract_2,-class_structure,-class_struc_description,
                                 -cama_replacement_cost,-accrued_depr_pct,-appraised_by,-appraised_date,
                                 -perimeter,-percent_complete,-nbhd_factor,-rcnld,-size_index,-lump_sum_adj,
                                 -na_dcentroids,-ptcoords)
st_geometry(sam) <- NULL
sam$long <- sam$coords[,1]
sam$lat <- sam$coords[,2]
sam <- sam %>% select(-coords)

#do Entropy_Scores.R and Zip_Scores.R (Tom and Aditya)
#do lowbirthweight-2.R (Merina)
#Akash?
#wait on numbers from Anoushka
#after doing operations that require 1d atomic vectors, but before insert
sam <- sam_10_10 %>% ungroup()
library("sp")
sam$coords <- SpatialPoints(cbind(sam$long,sam$lat))
sam$coords <- coordinates(sam$coords)
#testSam$coords <- lapply(1:nrow(testSam),function(i) cbind(testSam[i,]$long,testSam[i,]$lat))
#test_sam$coords <- lapply(1:nrow(test_sam),function(i) c(test_sam[i,]$long,test_sam[i,]$lat))
#test_sam$coords <- lapply(1:nrow(test_sam),function(i) test_sam$coords[[i]])
sam <- as.data.frame(sam)
#test_sam <- split(test_sam,seq(nrow(test_sam)))

SamCity <- mongo("samcity", url = "mongodb://localhost/SamCity");
#remove first!!
SamCity$drop()
SamCity$find(limit = 2)
SamCity$find({account:"0020680000006_6"})
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
sam2insert <- sam

Sys.time()
for (row in 1:nrow(sam2insert)){
  SamCity$insert(rjson::toJSON(sam2insert[row,]))
}
Sys.time()
#OR
library(doParallel)
no_cores <- detectCores()
cl <- makeCluster(no_cores-2)
registerDoParallel(cl)
Sys.time()
foreach(row=1:nrow(sam2insert) %dopar%
    SamCity$insert(rjson::toJSON(sam2insert[row,]))
)
Sys.time()
stopCluster(cl)


SamCity$index(add = '{"coords" : "2dsphere", "one_of" : -1}')
SamCity$index(add = '{"coords" : 1, "one_of" : -1}')
SamCity$index(add = '{"coords" : "2dsphere", "one_of" : -1, "household_id" : -1}')
SamCity$index(add = '{"coords" : "2dsphere", "one_of" : -1, "account" : -1}')
SamCity$index(add = '{"coords" : "2dsphere", "race" : -1}')
Sys.time()

#these don't work from mongolite, but do from mongo command line?
SamCity$stats()
SamCity$collStats()
SamCity$totalIndexSize()
SamCity$serverStatus() 

#if there's a problem, could be whatever caused jsonlite to say Error: Argument 'data' contains strings that are not JSON objects at elements: 1
#SamCity$index(remove = 'one_of_1')
#add more! income, race, member, etc.

sam_1_of_1k <- samc[samc$one_of>200,]
#write(toJSON(sam_1_of_10k, pretty = TRUE, method="C"),'sam_1_of10k.json') $wrong shape
sam_1_of100 <- sam_1_of_100 %>% select(-"curr_owner",-"note",-"appraised_by",
            -"rcnld","nbhd_factor")

for (row in 1:nrow(sam_1_of100)){
  write(toJSON(sam_1_of100[row,]),file = 'sam_of_100.json',append=TRUE)
}
#then manually replaced all on } to }, (except last)
#then added square brackets


#make cvs with unique values on each column
#use for testing and for summaries
#unique_factors <- unique(sam$member)
#check for characters and lengthe of unique_factors before writing to csv
unique_names <- list()
for (i in names(sam)){
  if(length(unique(sam[[i]])) < 10){
    uniq <- unique(sam[[i]]) #could run a summarise loop out of this side
    print(uniq)
    unique_names[[i]] <- toJSON(uniq)
  }
}
write(toJSON(unique_names),"unique_names.json")

