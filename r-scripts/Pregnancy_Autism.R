#author: "Anoushka Gokhale"
#summer, 2018

#add to exp_sam
#test on 
exp_sam <- readRDS("exp_sam_1.RDS")
exp_sam_test <- sample_n(exp_sam,5000,replace = TRUE)

View(exp_sam_test)

#rewrite for mutate
exp_sam_preg_autism <- exp_sam_test %>% 
  mutate(
    pregnant = case_when(
      age >=15 & age <= 17 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.024, 0.976)),
      age >=18 & age <= 19 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.055, 0.945)),
      age >=20 & age <= 29 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.059, 0.941)),
      age >=30 & age <= 44 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.0382, 0.9618)),
      age >=45 & age <= 64 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.029, 0.971)),
      age < 15 | age > 64 ~ 'no'
  ),
    prenatal_first_tri = case_when(
      pregnant == "yes" & age >=15 & age <= 17 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.016, 0.984)),
      pregnant == "yes" & age >=18 & age <= 19 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.041, 0.959)),
      pregnant == "yes" & age >=20 & age <= 29 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.479, 0.521)),
      pregnant == "yes" & age >=30 & age <= 44 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.433, 0.567)),
      pregnant == "yes" & age >=45 & age <= 64 ~ sample(c("yes", "no"), size = 1, replace = TRUE, prob = c(0.031, 0.969)),
      age < 15 | age > 64 ~ 'no'
    ),
    
  )
  #mutate(pregnant = ifelse(age > 14 & age < 18, sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)),"no"))




exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "15 to 17", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.016, 0.984)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "18 to 19", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.041, 0.959)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "20 to 24", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.479, 0.521)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "25 to 29", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.479, 0.521)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "30 to 34", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.433, 0.567)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "35 to 44", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.433, 0.567)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "45 to 54", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.031, 0.969)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "55 to 64", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.031, 0.969)), "no")

#Autism Prevalence Column based on age  

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "15 to 17", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.054, 0.946)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "18 to 19", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.054, 0.946)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "20 to 24", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.19, 0.810)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "25 to 29", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.293, 0.707)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "30 to 34", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.292, 0.708)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "35 to 44", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.148, 0.852)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "45 to 54", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "55 to 64", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)), "no")

#Subset Data

Pregnantsample1 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 1
#Run age 15 to 17 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "15 to 17", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "15 to 17", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.016, 0.984)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "15 to 17", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.054, 0.946)), "no")

#Run Subset Data Function for Pregnant Sample 1

Pregnantsample1 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 2
#Run age 18 to 19 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "18 to 19", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.055, 0.945)),"no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "18 to 19", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.041, 0.959)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "18 to 19", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.054, 0.946)), "no")

#Run Subset Data Function for Pregnant Sample 2

Pregnantsample2 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 3
#Run age 20 to 24 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "20 to 24", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.509, 0.491)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "20 to 24", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.479, 0.521)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "20 to 24", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.19, 0.810)), "no")

#Run Subset Data Function for Pregnant Sample 3

Pregnantsample3 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 4
#Run age 25 to 29 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "25 to 29", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.509, 0.491)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "25 to 29", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.479, 0.521)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "25 to 29", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.293, 0.707)), "no")

#Run Subset Data Function for Pregnant Sample 4

Pregnantsample4 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 5
#Run age 30 to 34 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "30 to 34", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.382, 0.618)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "30 to 34", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.433, 0.567)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "30 to 34", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.292, 0.708)), "no")

#Run Subset Data Function for Pregnant Sample 5

Pregnantsample5 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 6
#Run age 35 to 44 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "35 to 44", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.382, 0.618)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "35 to 44", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.433, 0.567)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "35 to 44", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.148, 0.852)), "no")

#Run Subset Data Function for Pregnant Sample 6

Pregnantsample6 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 7
#Run age 45 to 54 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "45 to 54", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.029, 0.971)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "45 to 54", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.031, 0.969)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "45 to 54", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)), "no")

#Run Subset Data Function for Pregnant Sample 7

Pregnantsample7 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Subset Data- Pregnant Sample 8
#Run age 55 to 64 column 

exp_sam_test$Pregnant <- ifelse(exp_sam_test$age == "55 to 64", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.029, 0.971)), "no")

exp_sam_test$Prenatal_care_began_first_trimester <- ifelse(exp_sam_test$age == "55 to 64", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.031, 0.969)), "no")

exp_sam_test$Autism_prevalence <- ifelse(exp_sam_test$age == "55 to 64", sample(c("yes", "no"), size = 100000, replace = TRUE, prob = c(0.024, 0.976)), "no")

#Run Subset Data Function for Pregnant Sample 8

Pregnantsample8 <- exp_sam_test[(exp_sam_test$Pregnant == "yes"),]

#Final Subset of Data to use for plotting 
#Use Append function to merge Pregnant Sample 1-8 into 1 large subset 

Pregnantsamplesum <- rbind(Pregnantsample1, Pregnantsample2, Pregnantsample3, Pregnantsample4, Pregnantsample5, Pregnantsample6, Pregnantsample7, Pregnantsample8)

View(Pregnantsamplesum)

#Box Plot

library(ggplot2)
boxplot(age_in_years~Prenatal_care_began_first_trimester, data=Pregnantsamplesum, main=toupper("Boxplot"), font.main = 3, cex.main = 1.2, xlab = "Prenatal Care began first semester", ylab = "Maternal Age", font.lab = 3, col = "yellow")
boxplot(age_in_years~Autism_prevalence, data = Pregnantsamplesum, main=toupper("Boxplot"), font.main = 3, cex.main = 1.2, xlab = "Autism Prevalence", ylab = "Maternal Age", font.lab = 3, col = "lightblue")

#CRH Column (Mean log CRH level in pg/ml) based on Prenatal Care and Race

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "Hispanic or Latino"), print("5.58")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "White"), print("5.69")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "Black or African American"), print("5.45")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "Asian"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "Some Other Race"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "no") & ($race == "Two or More Races"), print("5.30")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "Black or African American"), print("3.85")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "Hispanic or Latino"), print("3.95")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "White"), print("4.33")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "Asian"), print("4.50")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "Some Other Race"), print("3.85")

exp_sam_test$CRH <- ifelse(exp_sam_test$Prenatal_care_began_first_trimester== "yes") & ($race == "Two or More Races"), print("3.85")

#Autism Prevalence Column Based on CRH Levels

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.58"), print("yes")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.69"), print("yes")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.45"), print("yes")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "5.30"), print("yes")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "3.85"), print("no")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "3.95"), print("no")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "4.33"), print("no")

exp_sam_test$Autism Prevalence <- ifelse(exp_sam_test$CRH== "4.5"), print("no")

