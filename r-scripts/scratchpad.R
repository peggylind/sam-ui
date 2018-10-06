library(rgdal)
library(dplyr)


library(geojsonio)
library(geojsonlint)
harvey_Houston <- readOGR("//Users/dan/Downloads/Opendata_Harvey_BG/Harvey_BG.shp", layer = "Harvey_BG")
harvey_COH_json <- geojson_json(harvey_Houston)
geojson_write(harvey_COH_json, file="harvey_Houston.geojson")

High1718 <- readOGR("//Users/dan/Downloads/hisdschoolsandtexasschooldistricts/High1718/HighSchool1718.shp", layer = "HighSchool1718")
High1718_json <- geojson_json(High1718)
geojson_write(High1718_json, file="High1718.geojson")





lai <- readOGR("//Users/dan/Downloads/naip16-nc-1m_48201_harris/", layer = "naip16-nc-1m-harris_48201")

library(foreign)
TGCCPA_SpanishFile <- "//Users/dan/Downloads/TGCCPA_Spanish.sav"
TGCCPA_EnglishFile <- "//Users/dan/Downloads/TGCCPA_English.sav"


library(rio)
indiv_assist <- import("//Users/dan/Downloads/IndividualAssistanceHousingRegistrantsLargeDisasters.csv")
housing_assist <- import("//Users/dan/Downloads/HousingAssistanceRenters.csv")
housing_assist_own <- import("//Users/dan/Downloads/HousingAssistanceOwners.csv")
Harvey_Housing_damage <- import("//Users/dan/Downloads/DR4332_TX__Housing_Damage_by_Block_Group.csv")
Harvey_Observed_flood <- import("//Users/dan/Downloads/DR4332_TX__Observed_Flood_Extent.csv")
pub_311 <- import("//Users/dan/Downloads/PUBLIC_311_Location.csv")

TGCCPA_Spanish <- import(TGCCPA_SpanishFile)
TGCCPA_English <- import("//Users/dan/Downloads/TGCCPA _English.sav")

export(TGCCPA_Spanish, "//Users/dan/Downloads/TGCCPA_Spanish.csv")
export(TGCCPA_English, "//Users/dan/Downloads/TGCCPA_English.csv")


short_sam <- readRDS("//Users/dan/Downloads/ten_tracts.RDS")

#change to your sam, of course. 
#add columns for every ten, every 100, every 1000, and every 10000 - makes certain summaries better, and 
#I thought it was as good as sampling, for practical purposes, and much faster.
library(dplyr)
short_sam <-  mutate(short_sam, 
         one_of = 
           case_when(
             1:n() %% 10 == 0 ~ 'tens',
             1:n() %% 100 == 0 ~ 'hundreds',
             1:n() %% 1000 == 0 ~ 'thousands',
             1:n() %% 10000 == 0 ~ 'ten_thousands',
             TRUE ~ 'one')
  )


sam <- readRDS("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Sam\ Data/Sam\ and\ slices\ of\ Sam/Manale_orig_8_3_2018/complete_sample_set2018-08-02.RDS")
library(dplyr)

