#trying to fix for synthetic data set file

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

#potential replacement for apts - 
geom_test <- sample_n(sam, 10000)

sf_sam_geom <- st_as_sf(geom_test, crs=3674) #can we do this after??

polys <- st_cast(sf_sam_geom[3000:3002,'geometry'], "POLYGON", group_or_split = FALSE)

sf_sam_geom_test <- sf_sam_geom %>%
  group_by(account) %>% 
  mutate(
  #  num_residents = n()
    new_coords = #st_sample(geometry,num_residents,replace = FALSE) #st_cast(geometry, "POLYGON")
        mapply(function(x) for (poly in x) print(poly), geometry)
 ) # %>% 
group_by(household_id) %>%
  mutate(apt_test =
    case_when(
      units > 1 ~ TRUE #calculate a line
  )) %>%
  ungroup()
  
large_units <- sam %>% filter(units>250) #this implies a million people live in large units??

library(rgdal)
#4326 is CRS for wgs-84
Major_Roads_folder <- "Traffic/Major_Roads/Major_Roads.gdb"
Major_Roads <- readOGR(dsn = Major_Roads_folder,layer = "Major_Roads") #there are 377 Major_Roads in TX 
bb <- st_bbox(c(xmin = -95.91, xmax = -94.67, ymax = 30.47, ymin = 28.93), crs = st_crs(4326))
M_R <- st_as_sfc(Major_Roads, crs = st_crs(4326))
st_crs(sf_sam_geom) <- st_crs(M_R)

tst_distance <- st_distance(sf_sam_geom,M_R,tolerance = 250) #measured in U.S. feet


st_distance(x, y, ..., dist_fun, by_element = FALSE,
            which = "Euclidean", par = 0, tolerance = 0)
