#first version from Chelsea Cheung

library(sf)
library(dplyr)
library(magrittr)
library(rgdal)
library(RANN)



poly <- st_as_sfc(c("POLYGON((0 0 , 0 1 , 1 1 , 1 0, 0 0))")) %>% 
  st_sf(ID = "poly1")    

pts <- st_as_sfc(c("POINT(0.5 0.5)",
                   "POINT(0.6 0.6)",
                   "POINT(3 3)")) %>%
  st_sf(ID = paste0("point", 1:3))



sam<-readRDS("sam_12250.RDS")

geometry.no.na<-filter(sam, sam$geometry=="NA")
sam.no.na<-sam[!(sam$geometry %in% geometry.no.na$geometry),]

sf_sam <- st_as_sf(sam.no.na, crs=3674)

sf_sam_full <- sf_sam %>% 
  ungroup() %>% 
  mutate(
    NADcentroids = st_centroid(geometry),
    ptcoords = st_transform(NADcentroids,crs=4326),
  )

sf_sam_full$coords = st_coordinates(sf_sam_full$ptcoords)


# load in HISD high school boundaries shape file
HISD_High_School_Boundaries<-readOGR(dsn="High1718", layer="HighSchool1718")

HISD_High_School_Boundaries<-st_as_sf(HISD_High_School_Boundaries)

st_crs(HISD_High_School_Boundaries)<-st_crs(poly)

st_crs(sf_sam_full)<-st_crs(pts)


High_Schools<-over(as(sf_sam_full, "Spatial"), as(HISD_High_School_Boundaries, "Spatial"))

sf_sam_full$ID<-seq.int(nrow(sf_sam_full))
High_Schools$ID<-seq.int(nrow(High_Schools))
sam_high_schools <- merge(sf_sam_full, High_Schools,by="ID")





## load in HISD elementary boundaries shape file
HISD_Elementary_School_Boundaries<-readOGR(dsn = "Elementary1718", layer = "Elementary1718")

HISD_Elementary_School_Boundaries<-st_as_sf(HISD_Elementary_School_Boundaries)

st_crs(HISD_Elementary_School_Boundaries)<-st_crs(poly)

st_crs(sf_sam_full)<-st_crs(pts)

Elementary_Schools<-over(as(sf_sam_full, "Spatial"), as(HISD_Elementary_School_Boundaries, "Spatial"))

Elementary_Schools$ID<-seq.int(nrow(Elementary_Schools))

sam_high_and_elementary<-merge(sam_high_schools, Elementary_Schools, by="ID")




## load in HISD middle school boundaries shape file
HISD_Middle_School_Boundaries<-readOGR(dsn = "Middle1718", layer = "Middle1718")

HISD_Middle_School_Boundaries<-st_as_sf(HISD_Middle_School_Boundaries)

st_crs(HISD_Middle_School_Boundaries)<-st_crs(poly)

Middle_Schools<-over(as(sf_sam_full, "Spatial"), as(HISD_Middle_School_Boundaries, "Spatial"))

Middle_Schools$ID<-seq.int(nrow(Middle_Schools))

sam_high_elementary_and_middle<-merge(sam_high_and_elementary, Middle_Schools, by="ID")





### texas school districts geodatabase file is 'texas_school_districts'
############################
fgdb <- "//Users/dan/Downloads/hisdschoolsandtexasschooldistricts/USCB_School_Districts_2010/USCB_School_Districts_2010.gdb"
subset(ogrDrivers(), grepl("GDB", name))
fc_list <- ogrListLayers(fgdb)
fc_list
Texas_School_Districts <- readOGR(dsn=fgdb,layer="USCB_School_Districts_2010")

Texas_School_Districts_json <- geojson_json(Texas_School_Districts)
geojson_write(Texas_School_Districts_json, file="Texas_School_Districts.geojson")


texas_school_districts.sf<-st_as_sf(Texas_School_Districts)


st_crs(texas_school_districts.sf)<-st_crs(poly)

texas.school.districts<-over(as(sf_sam_full, "Spatial"), as(texas_school_districts.sf, "Spatial"))

texas.school.districts$ID<-seq.int(nrow(texas.school.districts))

texas_HISD_and_texas_ISDs<-merge(sam_high_elementary_and_middle, texas.school.districts, by="ID")
#####################################

