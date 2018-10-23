require(ggplot2)
require(rgeos)
require(maptools)
require(rgdal)
require(RColorBrewer)
require(plotly)

library(sf)
library(tidyr)

zip_summed_sam_race <- sam_inserted_10_17 %>%
  group_by_at(vars(zip)) %>%
  mutate(ziptotal = n(),zip_racial_entropy_index = mean(zip_racial_entropy_index)) %>%
  group_by_at(vars(zip,race)) %>%
  summarize(zip_racetotal = n(),zip_percent_race = mean(zip_percent_race),zip_racial_entropy_index = mean(zip_racial_entropy_index),
            zip_racial_entropy_index = mean(zip_racial_entropy_index), ziptotal = mean(ziptotal)) %>%
  complete(race, fill = list(zip_racetotal = 0, zip_percent_race = 0, zip_racial_entropy_index = 0, zip_racial_entropy_index = 0, ziptotal = 0))

# read the precinct data
df <- read.delim("Texas_General_Election_Results_2002-2010.tab")
normalVote <- read.delim("Texas_Normal_Vote_2002-2010.tab")
# add a column for total votes
df$total2008 <- normalVote[,12]
# keep only rows for Harris County & columns needed later (votes in presidentail election 2008)
df <- df[which(df$county == "Harris"),c(1,2,3,4, 102, 103, 153)]

# calculate percentages for D and R
df$pc_Pres_D_2008 <- mapply(function(x,y) 100 * x/y, df$t_Pres_D_2008, df$total2008)
df$pc_Pres_R_2008 <- mapply(function(x,y) 100 * x/y, df$t_Pres_R_2008, df$total2008)

# read the shapefile
shp <- readShapeSpatial("USA_Zip_Code_Boundaries/Shapes/zip_poly")

#keep only data for sam zips
zips <- unique(zip_summed_sam_race$zip)
shp <- shp[shp@data$ZIP_CODE %in% zips, ]

# assign an ID to each polygon, and pull out the individual points
shp@data$id <- rownames(shp@data)
pts <- fortify(shp,region="id")

# merge in the other shapefile data
shp.df <- merge(pts,shp,by="id")

# merge in the election results
shp.df <- merge(shp.df,zip_summed_sam_race,by.x="ZIP_CODE", by.y = "zip")

# shp.df is all kinds of out of order right now. need to order by WARD_PRECINCT,order
# or we end up with a broken polygon path
shp.df <- shp.df[order(shp.df$id,shp.df$order),]

# make new factor variables for candidate vote %
shp.df$racial_entropy <- cut(shp.df$zip_racial_entropy_index,breaks=seq(-1,0,0.1),include.lowest=T)


# plot the map w/ each candidates win percentage 
d <- ggplot(shp.df,aes(long,lat,group=group)) + geom_polygon(aes(fill=racial_entropy )) + 
  coord_equal() + scale_fill_brewer(palette="Blues",name="Racial Entropy") 

(gg <- ggplotly(d))



