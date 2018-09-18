library(mongolite)
library(rjson)

#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dprice3/Downloads/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NewSAMData/complete_sample_set2018-08-02.RDS")

#mongo doesn't like . in keys, so have to clean them out - they're still in factors.
library(janitor)
samc <- clean_names(sam)

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


#Error in toJSON(samc[row, ]) : 
#unable to escape string. String is not utf8
#seems to have been 4or5 places with weird characters in the notes columns - 1782584,1850900,1868732,1937535
#find them or just delete whole notes column:
library (dplyr)
samc_no_notes <- samc %>% select(-note)

SamCity <- mongo("samcity", url = "mongodb://localhost/SamCity");
#remove first!!
SamCity$drop()
SamCity$find(limit = 5)
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
for (row in 1:nrow(samc_no_notes)){
  SamCity$insert(toJSON(samc_no_notes[row,]))
}
SamCity$index(add = '{"coords" : "2dsphere"}')
SamCity$index(add = '{"one_of" : 1 }')
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


