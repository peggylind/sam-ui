library(MatchIt)
library(dplyr)
library(ggplot2)

#simple views on data
test_var <- c('age.sam','race.sam','educ_level.sam','poverty_ratio.sam','age.NH','race.NH','educ_level.NH','poverty_ratio.NH')

#sam_matched %>% 
#  group_by(race.sam) %>%
#  select(one_of(test_var)) %>%
#  summarise_all(funs(mean(., na.rm = T)))

glm()


#testing just with rnorm

a <- .25
b <- .85


res <- sample(1:2, size = 1, replace = FALSE, prob = c(.1,.9))

sam_test <- sam_matched %>% 
  #group_by(race.NH) %>%
  mutate(out_var = case_when(
    .$size.sam > 3 & .$size.NH > 3 ~ sample(1:2, size = 1, replace = FALSE, prob = c(1,0)),
    #etc.
    TRUE ~ as.integer(0)  #everything that didn't get caught above
    )) #%>%
  #ungroup()
