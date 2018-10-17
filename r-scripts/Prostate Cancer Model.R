sample_sam <- exp_sam_test

##Has prostate cancer 
sam1 <- exp_sam %>% 
  mutate( has_prostate_cancer = ifelse( sex == 'Male', ifelse( race == 'asian' & age >= 50 &
               age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.0013, 1 - 0.0013)),
               ifelse( race == 'asian' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.007, 1 - 0.007)),
               ifelse( race == 'black' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.0041, 1 - 0.0041)),
               ifelse( race == 'black' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.014, 1 - 0.014)),
               ifelse( race == 'hispanic' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.0026, 1 - 0.0026)),
               ifelse( race == 'hispanic' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.011, 1 - 0.011)),
               ifelse( race == 'white' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.003, 1 - 0.003)),
               ifelse( race == 'white' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.01, 1 - 0.01)),
               ifelse( age <= 49, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.002, 1 - 0.002)),
               'No'))))))))), 'No'))
  #mutate( has_prostate_cancer = ifelse( sex == 'Male',ifelse( age <= 69 & age >= 60,
               #sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.048, 1 - 0.048)), ifelse( age <= 
               #59 & age >= 50, sample( c('Yes', 'No'), size = 100000, replace = TRUE, prob = c( 0.017, 1 - 0.017))
               #, ifelse( age <= 49, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.002, 1 -
               #0.002)), ifelse( age >= 70, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.082,
               #1 - 0.082)), 'No')))), 'No')) 

##Has prostate cancer screening
sam2 <- sam1 %>% 
  mutate( has_prostate_cancer_screening = ifelse( sex == 'Male', ifelse( race == 'asian' & age >= 50 &
               age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.367, 1 - 0.367)),
               ifelse( race == 'asian' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.42, 1 - 0.42)),
               ifelse( race == 'black' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.419, 1 - 0.419)),
               ifelse( race == 'black' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.328, 1 - 0.328)),
               ifelse( race == 'hispanic' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.328, 1 - 0.328)),
               ifelse( race == 'hispanic' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.346, 1 - 0.346)),
               ifelse( race == 'white' & age >= 50 & age <= 64, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.333, 1 - 0.333)),
               ifelse( race == 'white' & age >= 65, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.267, 1 - 0.267)),
               'No')))))))), 'No'))
  #mutate( has_prostate_cancer_screening = ifelse( sex == 'Male', ifelse( age <= 74 & age >= 
               #50, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.308, 1 - 0.308 )), ifelse( 
               #age > 74, sample( c('Yes','No'), size = 100000, replace = TRUE, prob = c( 0.363, 1 - 0.363)), 'No'
               #)), 'No')) 

#Has false positive
sam3 <- sam2 %>% 
  mutate( has_false_positive = ifelse( has_prostate_cancer_screening == 'Yes' & has_prostate_cancer == 'No', sample( c('Yes',
               'No'), size = 100000, replace = TRUE, prob = c( 0.12, 0.88)), 'No'))

#Has complication from false positive treatment
sam4 <- sam3 %>%
  mutate( has_complication_from_false_positive_treatment = ifelse( has_false_positive == 'Yes', sample( c('Yes','No'), 
               size = 100000, replace = TRUE, prob = c( 0.099, 1 - 0.099)), 'No'))

#Outcome of prostate cancer
sam <- sam4 %>%
  mutate( prostate_cancer_outcome = ifelse( has_prostate_cancer == 'Yes' | has_false_positive == 'Yes', ifelse( age
               >= 70, sample( c( 'Dies', 'Lives'), size = 100000, replace = TRUE, prob = c( 0.029, 1 - 0.029)), ifelse(
               age <= 69 & age >= 60, sample( c( 'Dies', 'Lives'), size = 100000, replace = TRUE, prob = 
               c( 0.003, 1 - 0.003)), ifelse( age <= 59 & age >= 50, sample( c( 'Dies', 'Lives'), size = 
               100000, replace = TRUE, prob = c( 0.001, 1 - 0.001)), ifelse( age <= 49, 'Lives', 'Lives')))), 
               'none')) 

#Columns
View(sam$has_prostate_cancer_screening)
View(sam$has_false_positive)
View(sam$has_prostate_cancer)
View(sam$prostate_cancer_outcome)
View(sam$has_complication_from_false_positive_treatment)

#Boxplots
boxplot(sam$age~sam$has_prostate_cancer, data = sam, maint = toupper( "Boxplot"), font.main = 3, 
               cex.main = 1.2, xlab = "Has prostate cancer?", ylab = "Age", font.lab = 3, col = "orange")
boxplot(sam$age~sam$has_prostate_cancer_screening, data = sam, maint = toupper( "Boxplot"), font.main = 3, 
               cex.main = 1.2, xlab = "Has prostate cancer screening?", ylab = "Age", font.lab = 3, col = "orange")
boxplot(sam$age~sam$has_false_positive, data = sam, maint = toupper( "Boxplot"), font.main = 3, 
               cex.main = 1.2, xlab = "Has false positive?", ylab = "Age", font.lab = 3, col = "orange")
boxplot(sam$age~sam$prostate_cancer_outcome, data = sam, maint = toupper( "Boxplot"), font.main = 3, cex.main = 1.2, 
               xlab = "Prostate cancer outcome", ylab = "Age", font.lab = 3, col = "orange")
boxplot(sam$age~sam$has_complication_from_false_positive_treatment, data = sam, maint = toupper( "Boxplot"), 
        font.main = 3, cex.main = 1.2, xlab = "Has complication from false positive treatment?", ylab = "Age", font.lab =
        3, col = "orange") 

