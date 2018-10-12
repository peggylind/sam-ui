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
sam <- sam %>% select(-note,-use_code,-building_style_code,-hcad_num,-condo_flag,
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
#this version doesn't work on group quarters.sam$coords <- cbind(sam$long,sam$lat)

testSam$coords <- lapply(1:nrow(testSam),function(i) cbind(testSam[i,]$long,testSam[i,]$lat))
tstSam$coords <- lapply(1:nrow(tstSam),function(i) c(tstSam[i,]$long,tstSam[i,]$lat))

SamCity <- mongo("samcity", url = "mongodb://localhost/SamCity");
#remove first!!
SamCity$drop()
SamCity$find(limit = 5)
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
sam2insert <- tstSam
Sys.time()
for (row in 1:nrow(sam2insert)){
  SamCity$insert(toJSON(sam2insert[row,]))
}
Sys.time()
  

SamCity$index(add = '{"coords" : "2dsphere", "one_of" : -1}')
Sys.time()
SamCity$index(add = '{"one_of" : -1 }')
#do both together?
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

