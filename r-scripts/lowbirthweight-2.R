#from Merina - waiting on double check of numbers

#load dplyr
library(dplyr)
##if spatial functions are used (i.e., st_as_sf(...))
library(sf) 
library(ggplot2)


#add new column called stresslevelrace (using rnorm)
#https://www.dshs.texas.gov/healthytexasbabies/Documents/HTBDatabook_2017.pdf
#13.5% for blacks, 9.0% for other, (about) 8.2% for Hispanics, and 7.2% for whites
sam <- sam %>%
  mutate(stresslevelrace = 
           ifelse(race == "white", rnorm(1000, mean = 15.70, sd = 7.51), 
            ifelse(race == "black", rnorm(1000, mean = 15.68, sd = 7.51), 
              ifelse(race == "hispanic", rnorm(1000, mean = 17.80, sd = 7.45), 
                  rnorm(1000, mean = 17.44, sd = 7.67)))),
         stresslevelincome = 
           ifelse(household_income < 25000, rnorm(1000, mean = 17.77, sd = 7.60), 
             ifelse(household_income >= 25000 & household_income < 34999, rnorm(1000, mean = 16.69, sd = 7.72),
               ifelse(household_income >= 35000 & household_income < 49999, rnorm(1000, mean = 16.37, sd = 8.27),
                 ifelse(household_income >= 50000 & household_income < 74999, rnorm(1000, mean = 15.26, sd = 7.54), 
                     rnorm(1000, mean = 14.74, sd = 6.88))))),
         lowbirthweightbyrace = 
           ifelse(race == "white", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.072, 0.928)), 
             ifelse(race == "black", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.135, 0.865)), 
               ifelse(race == "hispanic", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.082, 0.918)), 
                  sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.06, 0.94)))))
         )


#below is original code.
#add new column called stresslevelincome (using rnorm)
complete_15_45_fem_sam_age_years_40k_2018_06_24 <- complete_15_45_fem_sam_age_years_40k_2018_06_24 %>%
  mutate(stresslevelincome = ifelse(household.income == "less than 10,000"| household.income == "10,000 to 14,999" | household.income == "15,000 to 19,999" | household.income == "20,000 to 24,999", rnorm(1000, mean = 17.77, sd = 7.60), 
                                    ifelse(household.income == "25,000 to 29,999" | household.income == "30,000 to 34,999", rnorm(1000, mean = 16.69, sd = 7.72),
                                           ifelse(household.income == "35,000 to 39,999" | household.income == "40,000 to 44,999" | household.income == "45,000 to 49,999", rnorm(1000, mean = 16.37, sd = 8.27),
                                                  ifelse(household.income == "50,000 to 59,999" | household.income == "60,000 to 74,999", rnorm(1000, mean = 15.26, sd = 7.54), rnorm(1000, mean = 14.74, sd = 6.88))))))

#stress level scale: 0 - 12 is low stress, 13 - 23 is moderate stress, 24 and above is high stress

#add new column called lowbirthweight (using sample function)
complete_15_45_fem_sam_age_years_40k_2018_06_24 <- complete_15_45_fem_sam_age_years_40k_2018_06_24 %>% rowwise() %>% ungroup() %>% mutate(
  lowbirthweight = ifelse(race == "White", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.31, 0.69)), 
                        ifelse(race == "Black or African American", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.19, 0.81)), 
                               ifelse(race == "Hispanic or Latino", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.45, 0.55)), 
                                      ifelse(race == "Some Other Race"|race == "Asian"|race == "Two or More Races"|race == "Native Hawaiian or Other Pacific Islander"|race == "American Indian or Alaskan Native", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.06, 0.94)), NA)))))

#filter for lowbirthweight
lowbirthweight <- filter(complete_15_45_fem_sam_age_years_40k_2018_06_24, lowbirthweight == "yes")


#boxplots
boxplot(stresslevelincome~lowbirthweight, data=complete_15_45_fem_sam_age_years_40k_2018_06_24, main=toupper("Boxplot"), font.main=3, cex.main=1.2, xlab="Low Birth Weight Risk", ylab="Stress Level", font.lab=3, col="orange")
boxplot(stresslevelrace~lowbirthweight, data=complete_15_45_fem_sam_age_years_40k_2018_06_24, main=toupper("Boxplot"), font.main=3, cex.main=1.2, xlab="Low Birth Weight Risk", ylab="Stress Level", font.lab=3, col="orange")
boxplot(stresslevelincome~household.income, data=complete_15_45_fem_sam_age_years_40k_2018_06_24, main=toupper("Boxplot"), font.main=3, cex.main=1.2, xlab="Household Income", ylab="Stress Level", font.lab=3, col="orange")
boxplot(stresslevelrace~race, data=complete_15_45_fem_sam_age_years_40k_2018_06_24, main=toupper("Boxplot"), font.main=3, cex.main=1.2, xlab="Race", ylab="Stress Level", font.lab=3, col="orange")
