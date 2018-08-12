library(mongolite)
library(rjson)

#mongod open on my local, but connect as needed
sam <- readRDS("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NewSAMData/complete_sample_set2018-08-02.RDS")

#mongo doesn't like . in keys, so have to clean them out - they're still in factors.
library(janitor)
samc <- clean_names(sam)
#should rm old, then replace with same name, but don't know about indices

#make cvs with unique values on each column
#use for testing and for summaries
#unique_factors <- unique(sam$member)
#check for characters and lengthe of unique_factors before writing to csv
unique_names <- list()
for (i in names(sam)){
  if(length(unique(sam[[i]])) < 10){
    uniq <- unique(sam[[i]]) #could run a summarise loop out of this side
    unique_names[[i]] <- toJSON(uniq)
  }
}
write(toJSON(unique_names),"unique_names.json")



SamCity <- mongo("samcity", url = "mongodb://localhost/SamCity");
#remove first!!
#mongolite throws  Error: No method asJSON S3 class: sfg , so tried an extra toJSON
for (row in 1:nrow(samc)){
  SamCity$insert(toJSON(samc[row,]))
}
SamCity$index(add = '{"coords" : "2dsphere"}')
SamCity$index(add = '{"one_of" : 1 }')
#do both together?
#SamCity$index(remove = 'one_of_1')
#add more! income, race, member, etc.

#mongolite can't deal with sfg, I think: Error: No method asJSON S3 class: sfg
#need to add ensure_index for 2d_sphere etc. - think through
