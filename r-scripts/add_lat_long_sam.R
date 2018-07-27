#loading full from Carol Upchurch - https://github.com/DataAnalyticsinStudentHands/SyntheticDataSet/tree/master/citymodels
#complete_sam <- readRDS("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social Network Hypergraphs/complete_sam.RDS")
complete_sam <- readRDS("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Sam\ Data/Sam\ and\ slices\ of\ Sam/complete_sam_2018-06-20.RDS")
#part_sam <-readRDS("/Users/dan/Documents/complete_sam_geom950000.RDS") #for testing

library(sf)
library(dplyr)

complete_sam_geom <- complete_sam[1:3950000,]  #not sure why it dies on last few rows; need to explore
sf_sam <- st_as_sf(complete_sam_geom, crs=3674)

sf_sam_full <- sf_sam %>%
  ungroup() %>%
  mutate(
    NADcentroids = st_centroid(geometry),
    ptcoords = st_transform(NADcentroids,crs=4326),
  )

sf_sam_full$coords = st_coordinates(sf_sam_full$ptcoords)

saveRDS(sf_sam_full,"sam_full_geom_7_7.RDS")
