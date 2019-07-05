#author: "Anoushka Gokhale"
#summer, 2018

#add to exp_sam
#since did it after, just creating smaller number of columns and adding it by individual_id, later.
#test_sam <- sam[1:50000,]
#new_sam <- sam %>% select(individual_id,race,age,sex) %>% filter(sex=='Female') 
#sam_merge <- merge(sam,sam_preg_autism,by = "individual_id",all=FALSE)

#rewrite for mutate 
sam <- sam %>% 
  mutate(
    pregnant = as.character(case_when(
      sex == "Female" & age >=15 & age <= 17 ~ sample(c("1", "2"), size = 1, prob = c(0.036, 0.964)),
      sex == "Female" & age >=18 & age <= 19 ~ sample(c("1", "2"), size = 1, prob = c(0.106, 0.894)),
      sex == "Female" & age >=20 & age <= 24 ~ sample(c("1", "2"), size = 1, prob = c(0.154, 0.846)),
      sex == "Female" & age >=25 & age <= 29 ~ sample(c("1", "2"), size = 1, prob = c(0.169, 0.831)),
      sex == "Female" & age >=30 & age <= 34 ~ sample(c("1", "2"), size = 1, prob = c(0.138, 0.862)),
      sex == "Female" & age >=35 & age <= 39 ~ sample(c("1", "2"), size = 1, prob = c(0.077, 0.923)),
      sex == "Female" & age >=40 & age <= 44 ~ sample(c("1", "2"), size = 1, prob = c(0.019, 0.981)),
      sex == "Female" & age >=45 & age <= 51 ~ sample(c("1", "2"), size = 1, prob = c(0.001, 0.999)),
      sex == "Female" & age < 15  ~ "2",
      sex == "Female" & age > 51  ~ "2",
      TRUE ~ '0' #0 is male; 1 is pregnant; 2 is non-pregnant female
    )),
    prenatal_first_tri = as.character(case_when(
      pregnant == "1" & age >=15 & age <= 19 ~ sample(c("1", "2"), size = 1, prob = c(0.543, 0.467)),
      pregnant == "1" & age >=20 & age <= 24 ~ sample(c("1", "2"), size = 1, prob = c(0.632, 0.368)),
      pregnant == "1" & age >=25 & age <= 29 ~ sample(c("1", "2"), size = 1, prob = c(0.739, 0.261)),
      pregnant == "1" & age >=30 & age <= 40 ~ sample(c("1", "2"), size = 1, prob = c(0.792, 0.208)),
      pregnant == "1" & age >=41 & age <= 51 ~ sample(c("1", "2"), size = 1, prob = c(0.763, 0.237))
    )),
    autism_by_maternal_age = as.character(case_when(
      pregnant == "1" & age >=15 & age <= 19 ~ sample(c("1", "2"), size = 1, prob = c(0.054, 0.946)),
      pregnant == "1" & age >=20 & age <= 24 ~ sample(c("1", "2"), size = 1, prob = c(0.19, 0.810)),
      pregnant == "1" & age >=25 & age <= 29 ~ sample(c("1", "2"), size = 1, prob = c(0.293, 0.707)),
      pregnant == "1" & age >=30 & age <= 34 ~ sample(c("1", "2"), size = 1, prob = c(0.292, 0.708)),
      pregnant == "1" & age >=35 & age <= 44 ~ sample(c("1", "2"), size = 1, prob = c(0.148, 0.852)),
      pregnant == "1" & age >=45 & age <= 54 ~ sample(c("1", "2"), size = 1, prob = c(0.024, 0.976))
    )),
    maternal_CRH = as.character(case_when(
      prenatal_first_tri == "1" & race == 'asian' ~ rnorm(1, mean = 4.5, sd = .25),
      prenatal_first_tri == "1" & race == 'other.race' ~ rnorm(1, mean = 3.85, sd = .25),
      prenatal_first_tri == "1" & race == 'multiracial' ~ rnorm(1, mean = 5.3, sd = .25),
      prenatal_first_tri == "1" & race == 'black' ~ rnorm(1, mean = 3.85, sd = .25),
      prenatal_first_tri == "1" & race == 'hispanic' ~ rnorm(1, mean = 3.95, sd = .25),
      prenatal_first_tri == "1" & race == 'white' ~ rnorm(1, mean = 4.33, sd = .25)
    )),
    autism_by_CRH = as.character(case_when(
      maternal_CRH > 5.29 ~ "1"
    ))
  )
#this gets you about all the autistic kids. I'm not sure the science supports it
#sam_merge <- merge(sam,sam_preg_autism,by = "individual_id",all=FALSE)


Pregnancy Rates
## probably per 1000 mistake?
Age
15 to 17     3.6 %
18 to 19     10.6 %
20 to 24     15.4 %
25 to 29     16.2 %
30 to 34     13.8 %
35 to 44     7.7 %
45 to 54     1.9 %
55 to 64     1.9 %

I think this information might be more credible for the prenatal care ages:
  
  Under 15 Years: 32.9 %
15-19 Years: 54.3 %
20-24 Years: 63.2 %
25-29 Years: 73.9 %
30-34 Years: 79.1 %
35-39 Years: 79.2 %
40-44 Years: 76.3 %
https://mchb.hrsa.gov/chusa11/hsfu/pages/312pc.html


CRH 

Prenatal Care Received
Yes 

Gestational Age (wks)                                  CRH Levels (pg/mL)
15                                                                         12
20                                                                         25
25                                                                         50
30                                                                         250
32                                                                         225                                                                         
34                                                                         140
36                                                                         100
38                                                                         80
40                                                                         75
42                                                                          60
#her code, below

Probability of an ASD Diagnosis by Gestational Age 

Gestational Age                                      ASD 
Early Pre-Term ( <33 weeks)                  2.08 %
Late Pre-Term (34-36 weeks)                 1.32 %
Term                                                        1.09 %
Post-Term                                                0.94 %




exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "15 to 17", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.016, 0.984)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "18 to 19", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.041, 0.959)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "20 to 24", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.479, 0.521)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "25 to 29", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.479, 0.521)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "30 to 34", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.433, 0.567)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "35 to 44", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.433, 0.567)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "45 to 54", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.031, 0.969)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "55 to 64", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.031, 0.969)), "2")

#Autism Prevalence Column based on age  

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "15 to 17", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.054, 0.946)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "18 to 19", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.054, 0.946)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "20 to 24", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.19, 0.810)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "25 to 29", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.293, 0.707)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "30 to 34", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.292, 0.708)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "35 to 44", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.148, 0.852)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "45 to 54", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.024, 0.976)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "55 to 64", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.024, 0.976)), "2")

#Subset Data

Pregnantsample1 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 1
#Run age 15 to 17 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "15 to 17", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.024, 0.976)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "15 to 17", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.016, 0.984)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "15 to 17", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.054, 0.946)), "2")

#Run Subset Data Function for Pregnant Sample 1

Pregnantsample1 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 2
#Run age 18 to 19 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "18 to 19", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.055, 0.945)),"2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "18 to 19", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.041, 0.959)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "18 to 19", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.054, 0.946)), "2")

#Run Subset Data Function for Pregnant Sample 2

Pregnantsample2 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 3
#Run age 20 to 24 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "20 to 24", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.509, 0.491)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "20 to 24", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.479, 0.521)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "20 to 24", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.19, 0.810)), "2")

#Run Subset Data Function for Pregnant Sample 3

Pregnantsample3 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 4
#Run age 25 to 29 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "25 to 29", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.509, 0.491)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "25 to 29", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.479, 0.521)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "25 to 29", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.293, 0.707)), "2")

#Run Subset Data Function for Pregnant Sample 4

Pregnantsample4 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 5
#Run age 30 to 34 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "30 to 34", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.382, 0.618)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "30 to 34", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.433, 0.567)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "30 to 34", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.292, 0.708)), "2")

#Run Subset Data Function for Pregnant Sample 5

Pregnantsample5 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 6
#Run age 35 to 44 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "35 to 44", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.382, 0.618)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "35 to 44", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.433, 0.567)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "35 to 44", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.148, 0.852)), "2")

#Run Subset Data Function for Pregnant Sample 6

Pregnantsample6 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 7
#Run age 45 to 54 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "45 to 54", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.029, 0.971)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "45 to 54", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.031, 0.969)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "45 to 54", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.024, 0.976)), "2")

#Run Subset Data Function for Pregnant Sample 7

Pregnantsample7 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Subset Data- Pregnant Sample 8
#Run age 55 to 64 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "55 to 64", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.029, 0.971)), "2")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "55 to 64", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.031, 0.969)), "2")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "55 to 64", sample(c("1", "2"), size = 100000, replace = FALSE, prob = c(0.024, 0.976)), "2")

#Run Subset Data Function for Pregnant Sample 8

Pregnantsample8 <- exp_sam_test[(exp_sam_test$Pregnant == "1"),]

#Final Subset of Data to use for plotting 
#Use Append function to merge Pregnant Sample 1-8 into 1 large subset 

Pregnantsamplesum <- rbind(Pregnantsample1, Pregnantsample2, Pregnantsample3, Pregnantsample4, Pregnantsample5, Pregnantsample6, Pregnantsample7, Pregnantsample8)

View(Pregnantsamplesum)

#Box Plot

library(ggplot2)
boxplot(age_in_years~Prenatal_care_began_first_trimester, data=Pregnantsamplesum, main=toupper("Boxplot"), font.main = 3, cex.main = 1.2, xlab = "Prenatal Care began first semester", ylab = "Maternal Age", font.lab = 3, col = "yellow")
boxplot(age_in_years~Autism_prevalence, data = Pregnantsamplesum, main=toupper("Boxplot"), font.main = 3, cex.main = 1.2, xlab = "Autism Prevalence", ylab = "Maternal Age", font.lab = 3, col = "lightblue")

#CRH Column (Mean log CRH level in pg/ml) based on Prenatal Care and Race

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "Hispanic or Latino"), print("5.58")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "White"), print("5.69")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "Black or African American"), print("5.45")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "Asian"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "Some Other Race"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "2") & ($race == "Two or More Races"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "Black or African American"), print("3.85")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "Hispanic or Latino"), print("3.95")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "White"), print("4.33")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "Asian"), print("4.50")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "Some Other Race"), print("3.85")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "1") & ($race == "Two or More Races"), print("3.85")

#Autism Prevalence Column Based on CRH Levels

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.58"), print("1")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.69"), print("1")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.45"), print("1")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.30"), print("1")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "3.85"), print("2")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "3.95"), print("2")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "4.33"), print("2")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "4.5"), print("2")

