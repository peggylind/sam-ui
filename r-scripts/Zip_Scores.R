#ADD: educational_attainment and a couple of others to race, and do both for other levels (after adding superneighborhoods as a column)
#join the summed_sam back to each geographic type
#tract diversity score is added up from all 6

#Install and set up the "dplyr" package
library(dplyr)
library(sf)
library(readr)
#sf_sam <- st_as_sf(sample_sam, crs=3674) don't do this time


#exp_sam <- st_transform(exp_sam, 4326) #did this below, because I was dumb about the crs

#Anoushka's is: Pregnancy_Autism.R
#Merina's is: Low_Birth_Rate.R


#Tom and Aditya's entropy scores
# gives each person their score for tract level racial diversity [and do the others, too?]
#perhaps do the city?
sam <- sam %>%
 # filter(!is.na(ACCOUNT)) %>%
  group_by_at(vars(zip)) %>%
  mutate(ziptotal = n()) %>%
  group_by_at(vars(zip,race)) %>%
  mutate(zip_racetotal = n(),zip_percent_race = racetotal/ziptotal,zip_racial_entropy_index = -log(ziptotal/zip_racetotal)*zip_percent_race)

sam <- sam %>%
  group_by_at(vars(zip,educational_attainment)) %>%
  mutate(zip_education_total = n(),zip_percent_education = zip_education_total/ziptotal,zip_education_entropy_index = -log(ziptotal/zip_education_total)*zip_percent_education)


#for each tract to have it's Entropy Index
#Theil - 1967, originally, Yming Wang - Decomposing the entropy index of racial diversity: in search of two types of variance
#Ann Reg Sci (2012) 48:897–915
zip_summed_sam_race <- exp_sam %>%
  group_by_at(vars(zip)) %>%
  mutate(ziptotal = n(),zip_racial_entropy_index = mean(zip_racial_entropy_index)) %>%
  group_by_at(vars(zip,race)) %>%
  summarize(zip_racetotal = n(),zip_percent_race = mean(zip_percent_race),zip_racial_entropy_index = mean(zip_racial_entropy_index),
            zip_racial_entropy_index = mean(zip_racial_entropy_index), ziptotal = mean(ziptotal))
write_rds(zip_summed_sam_race,"zip_summed_race_entropy.RDS")
#added filter to only include over 20.
zip_summed_sam_education <- exp_sam %>%
  filter(age>21)%>%
  group_by_at(vars(zip)) %>%
  mutate(ziptotal = n(),zip_economic_entropy_index = mean(zip_education_entropy_index)) %>%
  group_by_at(vars(zip,educational.attainment)) %>%
  summarize(zip_education_total = n(),zip_percent_education = mean(zip_percent_education),zip_education_entropy_index = mean(zip_education_entropy_index),
            zip_economic_entropy_index = mean(zip_economic_entropy_index), ziptotal = mean(ziptotal))
write_rds(zip_summed_sam_education,"zip_summed_education_entropy.RDS")
#match the summed_sams to the geojson files for the tracts, etc. 

zip_summed_sam_employment <- exp_sam %>%
  group_by_at(vars(zip,employment)) %>%
  summarize(zip_employ = n())
write_rds(zip_summed_sam_employment, "zip_summed_employment.RDS") 

zip_summed_sam_insurance <- exp_sam %>%
  group_by_at(vars(zip,health.insurance)) %>%
  summarize(zip_ins_num = n())
write_rds(zip_summed_sam_insurance, "zip_summed_insurance.RDS") 

zip_summed_sam_citizen <- exp_sam %>%
  group_by_at(vars(zip,citizenship)) %>%
  summarize(zip_citizen_num = n())
write_rds(zip_summed_sam_citizen, "zip_summed_citizens.RDS") 

zip_summed_sam_language <- exp_sam %>%
  group_by_at(vars(zip,Language.at.home)) %>%
  summarize(zip_language_num = n())
write_rds(zip_summed_sam_language, "zip_summed_language.RDS")

small_exp_sam <- exp_sam[1:5000,]
colnames(small_exp_sam)
smaller_sam <- select(small_exp_sam, -CurrOwner, -CLASS_STRUC_DESCRIPTION, -CAMA_REPLACEMENT_COST, -APPRAISED_BY, -NOTE)
test_summary <- smaller_sam %>%
  summarize_all()

tes_sum <- summary(small_exp_sam)

#before merging - taking out the geometry rows from the sf objects - should have done it earlier
st_geometry(zip_summed_sam_citizen) <- NULL
st_geometry(zip_summed_sam_education) <- NULL
st_geometry(zip_summed_sam_employment) <- NULL
st_geometry(zip_summed_sam_race) <- NULL
st_geometry(zip_summed_sam_insurance) <- NULL
st_geometry(zip_summed_sam_language) <- NULL
zip_data <- full_join(zip_summed_sam_citizen,zip_summed_sam_education,by="zip")
zip_data <- full_join(zip_data,zip_summed_sam_employment,by="zip")
zip_data <- full_join(zip_data,zip_summed_sam_race,by="zip")
zip_data <- full_join(zip_data,zip_summed_sam_insurance,by="zip")
zip_data <- full_join(zip_data,zip_summed_sam_language,by="zip")
write_rds(zip_data,path = "zip_data.RDS")


#take out of spatial, so we don't carry the geometry around
#run the other ones
#uses e notation for tract names!!
format(split.data.frame, scientific=FALSE);
summ_citizen_by_zip <- split.data.frame(zip_summed_sam_citizen,zip_summed_sam_citizen$zip)
summ_employ_by_zip <- split.data.frame(zip_summed_sam_employment,zip_summed_sam_employment$zip)
zip_data <- full_join(summ_citizen_by_zip,summ_employ_by_zip,by="zip") #this made a huge and unwieldy file
