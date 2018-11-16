 %>% group_by(race)  %>% summarise(tes = which(colSums(lowbirthweightbyrace == "Yes") > 0))


 levels(forboxplot$lowbirthweightbyrace)[1]<-"1"
 levels(forboxplot$lowbirthweightbyrace)[2]<-"0"
 forboxplot$lowbirthweightbyrace <- as.numeric(as.character( forboxplot[, 4] ))
 

No <- forboxplot %>%
  group_by(race) %>%
  summarize(lowbirthweightNo = sum(lowbirthweightbyrace))

race <- chart.data$race
lowbirthweightNO <- chart.data$percentNo
lowbirthweightYes <- chart.data$percentYes

df <- data.frame(race, lowbirthweightNO, lowbirthweightYes)

library(forcats)
df %>% 
  select(-total) %>% 
  gather(type, percent, lowbirthweightNO:lowbirthweightYes) %>% 
  ggplot(., aes(x=race, y=percent, fill=forcats::fct_rev(type))) +
  geom_bar(stat="identity")



summarize(sumNo = sum(lowbirthweightbyrace == "No")),
sumYes = sum(lowbirthweightbyrace == "Yes"))
forboxplot %>%
group_by(race) %>%
summarize(sumNo = sum(lowbirthweightbyrace[lowbirthweightbyrace == "No"])),
sumYes = sum(lowbirthweightbyrace[lowbirthweightbyrace == "Yes"]))
forboxplot %>%
group_by(race) %>%
summarize(sumNo = sum(lowbirthweightbyrace[lowbirthweightbyrace == "No"]),
sumYes = sum(lowbirthweightbyrace[lowbirthweightbyrace == "Yes"]))
forboxplot$lowbirthweightbyrace <- as.numeric(as.character( forboxplot[, 4] ))
levels(forboxplot$lowbirthweightbyrace)
forboxplot <- data.frame(race = sam_inserted_10_17$race ,stresslevelincome = sam_inserted_10_17$stresslevelincome, stresslevelrace = sam_inserted_10_17$stresslevelrace, lowbirthweightbyrace = sam_inserted_10_17$lowbirthweightbyrace)
levels(forboxplot$lowbirthweightbyrace)
levels(forboxplot$lowbirthweightbyrace)[1]<-"0"
levels(forboxplot$lowbirthweightbyrace)[2]<-"1"
levels(forboxplot$lowbirthweightbyrace)
sum(forboxplot$lowbirthweightbyrace)
forboxplot$lowbirthweightbyrace <- as.numeric(as.character( forboxplot[, 4] ))
sum(forboxplot$lowbirthweightbyrace)
forboxplot %>%
group_by(race) %>%
summarize(sumYes = sum(lowbirthweightbyrace)))
forboxplot %>%
group_by(race) %>%
summarize(sumYes = sum(lowbirthweightbyrace))
forboxplot %>%
group_by(race) %>%
summarize(lowbirthweight = sum(lowbirthweightbyrace))
Yes <- forboxplot %>%
group_by(race) %>%
summarize(lowbirthweightYes = sum(lowbirthweightbyrace))
forboxplot <- data.frame(race = sam_inserted_10_17$race ,stresslevelincome = sam_inserted_10_17$stresslevelincome, stresslevelrace = sam_inserted_10_17$stresslevelrace, lowbirthweightbyrace = sam_inserted_10_17$lowbirthweightbyrace)
levels(forboxplot$lowbirthweightbyrace)[1]<-"1"
levels(forboxplot$lowbirthweightbyrace)[2]<-"0"
forboxplot$lowbirthweightbyrace <- as.numeric(as.character( forboxplot[, 4] ))
No <- forboxplot %>%
group_by(race) %>%
summarize(lowbirthweightNo = sum(lowbirthweightbyrace))
No
No$race
No$lowbirthweightNo
chart.data <- data.frame(race = No$race, lowbirthweightNo= No$lowbirthweightNo, lowbirthweightYes = Yes$lowbirthweightYes)
chart.data %>% mutate(total = lowbirthweightYes + lowbirthweightNo)
chart.data %>% mutate(total = lowbirthweightYes + lowbirthweightNo, percentNo = lowbirthweightNo/total*100)
chart.data %>% mutate(total = lowbirthweightYes + lowbirthweightNo, percentNo = lowbirthweightNo/total*100, percentYes = lowbirthweightYes/total*100)
chart.data <- chart.data %>% mutate(total = lowbirthweightYes + lowbirthweightNo, percentNo = lowbirthweightNo/total*100, percentYes = lowbirthweightYes/total*100)
chart.data
ggplot() + geom_bar(aes(y = percentNo, x = race), data = charts.data, stat="identity")
ggplot() + geom_bar(aes(y = percentNo, x = race), data = chart.data, stat="identity")
ggplot() + geom_bar(aes(y = percentYes, x = race), data = chart.data, stat="identity")
df2 <- rbind(
data.frame(charts.data, "count" = percentNo, "type"="No"),
data.frame(charts.data, "count" = percentYes, "type"="Yes")
)
df2 <- rbind(
data.frame(chart.data, "count" = percentNo, "type"="No"),
data.frame(chart.data, "count" = percentYes, "type"="Yes")
)
df2 <- rbind(
chart.data$percentNo,chart.data$lowbirthweightYes
)
df2 <- rbind(
data.farme(chart.data$percentNo),
data.farme(chart.data$lowbirthweightYes)
)
df2 <- rbind(
data.frame(chart.data$percentNo),
data.frame(chart.data$lowbirthweightYes)
)
year <- c(1:5)
burglaries <- c(234,211,201,150,155)
robberies <- c(12, 19,18,23,25)
total <- burglaries + robberies
df <- data.frame(year, burglaries, robberies, total)
df %>%
select(-total) %>%
gather(type, count, burglaries:robberies) %>%
ggplot(., aes(x=year, y=count, fill=forcats::fct_rev(type))) +
geom_bar(stat="identity")
year <- chart.data$race
burglaries <- chart.data$percentNo
robberies <- chart.data$percentYes
df <- data.frame(year, burglaries, robberies)
df %>%
select(-total) %>%
gather(type, count, burglaries:robberies) %>%
ggplot(., aes(x=year, y=count, fill=forcats::fct_rev(type))) +
geom_bar(stat="identity")
df %>%
select(-total) %>%
gather(type, percent, burglaries:robberies) %>%
ggplot(., aes(x=year, y=percent, fill=forcats::fct_rev(type))) +
geom_bar(stat="identity")
library(forcats)
df %>%
select(-total) %>%
gather(type, percent, lowbirthweightNO:lowbirthweightYes) %>%
ggplot(., aes(x=race, y=percent, fill=forcats::fct_rev(type))) +
geom_bar(stat="identity")
race <- chart.data$race
lowbirthweightNO <- chart.data$percentNo
lowbirthweightYes <- chart.data$percentYes
df <- data.frame(race, lowbirthweightNO, lowbirthweightYes)
library(forcats)
df %>%
select(-total) %>%
gather(type, percent, lowbirthweightNO:lowbirthweightYes) %>%
ggplot(., aes(x=race, y=percent, fill=forcats::fct_rev(type))) +
geom_bar(stat="identity")
