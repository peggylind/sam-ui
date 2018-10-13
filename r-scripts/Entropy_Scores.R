#ADD: educational_attainment and a couple of others to race, and do both for other levels (after adding superneighborhoods as a column)
#join the summed_sam back to each geographic type
#tract diversity score is added up from all 6

#Install and set up the "dplyr" package
library(dplyr)
library(sf)
library(readr)
sf_sam <- st_as_sf(sample_sam, crs=3674)
sf_sam$coords <- sf_sam$ptcoords # how to get rid of coords!!

exp_sam <- st_transform(exp_sam, 4326) #did this below, because I was dumb about the crs

#Anoushka's is: Pregnancy_Autism.R
#Merina's is: Low_Birth_Rate.R


#Tom and Aditya's entropy scores
# gives each person their score for tract level racial diversity [and do the others, too?]
expanded_sam <- sf_sam %>%
  filter(!is.na(ACCOUNT)) %>%
  group_by_at(vars(tract)) %>%
  mutate(tracttotal = n()) %>%
  group_by_at(vars(tract,race)) %>%
  mutate(racetotal = n(),percent_race = racetotal/tracttotal,racial_entropy_index = -log(tracttotal/racetotal)*percent_race)

exp_sam <- expanded_sam %>%
  group_by_at(vars(tract,educational.attainment)) %>%
  mutate(education_total = n(),percent_education = education_total/tracttotal,education_entropy_index = -log(tracttotal/education_total)*percent_education)


#for each tract to have it's Entropy Index
#Theil - 1967, originally, Yming Wang - Decomposing the entropy index of racial diversity: in search of two types of variance
#Ann Reg Sci (2012) 48:897–915
summed_sam_race <- exp_sam %>%
  group_by_at(vars(tract)) %>%
  mutate(tracttotal = n(),tract_racial_entropy_index = mean(racial_entropy_index)) %>%
  group_by_at(vars(tract,race)) %>%
  summarize(racetotal = n(),percent_race = mean(percent_race),racial_entropy_index = mean(racial_entropy_index),
            tract_racial_entropy_index = mean(tract_racial_entropy_index), tracttotal = mean(tracttotal))
write_rds(summed_sam_race,"summed_race_entropy.RDS")
#added filter to only include over 20.
summed_sam_education <- exp_sam %>%
  filter(age>21)%>%
  group_by_at(vars(tract)) %>%
  mutate(tracttotal = n(),tract_economic_entropy_index = mean(education_entropy_index)) %>%
  group_by_at(vars(tract,educational.attainment)) %>%
  summarize(education_total = n(),percent_education = mean(percent_education),education_entropy_index = mean(education_entropy_index),
            tract_economic_entropy_index = mean(tract_economic_entropy_index), tracttotal = mean(tracttotal))
write_rds(summed_sam_education,"summed_education_entropy.RDS")
#match the summed_sams to the geojson files for the tracts, etc. 

summed_sam_employment <- exp_sam %>%
  group_by_at(vars(tract,employment)) %>%
  summarize(employ = n())
write_rds(summed_sam_employment, "summed_employment.RDS") 

