library(dplyr)
library(janitor)
library(sp)

createSAMSample <- function(samplesize = 10000) {
  #read the SAM data
  SAMDataFolder <- "NewSAMData/"
  sam <- readRDS(paste0(SAMDataFolder, "complete_sample_set2019-03-10.RDS"))
  
  #create sample
  samplesam <- sample_n(sam, samplesize)
  
  #fix issues with column names
  sam <- clean_names(samplesam)
  
  #unable to escape string. String is not utf8
  #seems to have been 4or5 places with weird characters in the notes columns - 1782584,1850900,1868732,1937535
  #find them or just delete whole notes column:
  sam <- sam %>% select(-note,-hcad_num,-condo_flag,
                        -loc_addr,-shape_area,-shape_len,-valid,-ms_replacement_cost,
                        -county_2,-tract_2,-class_structure,-class_struc_description,
                        -cama_replacement_cost,-accrued_depr_pct,-appraised_by,-appraised_date,
                        -perimeter,-percent_complete,-nbhd_factor,-rcnld,-size_index,-lump_sum_adj,
                        -na_dcentroids,-ptcoords)
  
  #restructure geometry
  #st_geometry(sam) <- NULL
  sam$long <- sam$coords[,1]
  sam$lat <- sam$coords[,2]
  sam <- sam %>% 
    select(-coords) %>%
    ungroup()
  
  sam$coords <- SpatialPoints(cbind(sam$long,sam$lat))
  sam$coords <- coordinates(sam$coords)
  return(sam)
}

