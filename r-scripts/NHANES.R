#perhaps, but not yet included - https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HSQ_I.htm / general health self-report
#body measures https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/BMX_I.htm 
# and 4/30/2019 https://wwwn.cdc.gov/nchs/nhanes/search/datapage.aspx?Component=Questionnaire&CycleBeginYear=2015

library(rio)
library(dplyr)
library(FactoMineR)
source("tools.R")

#set working directory to your local data directory, this depends on your OneDrive setup - we could change to a Sharepoint
setwd("~/University Of Houston/Price, Daniel M - Social Network Hypergraphs")
#setwd("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NewSAMData")

NH_file_folder <- "NHANES/"
#https://wwwn.cdc.gov/nchs/nhanes/search/variablelist.aspx?Component=Demographics&CycleBeginYear=2015

fileNames <- c("DEMO_I.XPT", #demographics  https://wwwn.cdc.gov/nchs/nhanes/search/datapage.aspx?Component=Demographics&CycleBeginYear=2015 download on March 10, 2019
               "DR1TOT_I.XPT", #diet_nutrient1
               "MCQ_I.XPT", #medical conditions: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/MCQ_I.htm download on 4/30/19
               "DPQ_I.XPT", #depression instrument: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DPQ_I.htm download on 4/30/1
               "BPQ_I.XPT", #blood_pressure
               "DIQ_I.XPT", #diabetes: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DIQ_I.htm
               "HIQ_I.XPT", #insurance https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HIQ_I.htm
               "HUQ_I.XPT", #healthcare utilization: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HUQ_I.htm
               "CBQ_I.XPT", #consumer
               "PAQ_I.XPT", #phys_act
               "PFQ_I.XPT") #phys_func

#"DR2TOT_I.XPT" #diet_nutrient2
#"CDQ_I.XPT" #cardio


fileList=lapply(fileNames, function(x){paste0(NH_file_folder,x)})
dataList = lapply(fileList, function(x){import(x)})
merged_NHANES_F <- Reduce(function(x,y) {merge(x,y, by="SEQN")}, dataList)

#Vitamin D for the NHANES data: it is called 1,25 (OH)3 D3

#the measured active form of B6 in serum is pyridoxal phosphate (PLP.)
#folate
#vitamin A retinol

#see NHANES_2015.json for brief descriptions - didn't finish putting those in, or getting all the codes / types
NHANES_merged <- merged_NHANES_F %>% rename(gender=DMDHRGND,
                                       educational_attainment=DMDHREDU,
                                       size=DMDFMSIZ, #family size but to match for PCA with sam
                                       age=DMDHRAGE,
                                       marital_status=DMDHRMAR,
                                       yrs_US=DMDYRSUS,
                                       vet_foreign_war=DMQADFC,
                                       veteran=DMQMILIZ,
                                       birth_country=DMDHRBR4,
                                       poverty_ratio=INDFMPIR,
                                       pregnant=RIDEXPRG,
                                       race=RIDRETH3,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/MCQ_I.htm
                                       age_first_asthma=MCQ025,
                                       ever_told_asthma=MCQ010,
                                       still_have_asthma=MCQ035,
                                       asthma_attack_1yr=MCQ040,
                                       ER_asthma_1yr=MCQ050,
                                       age_arthritis=MCQ180A,
                                       age_coronary_heart_disease=MCQ180C,
                                       age_heart_attack=MCQ180E,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DPQ_I.htm#Codebook
                                       no_interest_do_things=DPQ010, #1-3 counts as some problems
                                       depressed=DPQ020,
                                       trouble_sleep=DPQ030,
                                       no_energy=DPQ040,
                                       poor_eating=DPQ050,
                                       feel_bad_self=DPQ060,
                                       better_dead=DPQ090,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/BPQ_I.htm
                                       BP_dr_said=BPQ020,
                                       age_hypertension=BPD035,
                                       prescribed_BP=BPQ040A,
                                       taking_prescribed_BP=BPQ050A,
                                       prescribed_cholest=BPQ090D,
                                       taking_prescribed_cholest=BPQ100D,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DIQ_I.htm
                                       age_diabetes=DID040,
                                       told_prediabetes=DIQ160,
                                       feel_risk_diabetes=DIQ172,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HIQ_I.htm
                                       health_insurance=HIQ011,
                                       medicare=HIQ031B,
                                       medicaid=HIQ031D,
                                       no_insurance_1yr=HIQ210,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HUQ_I.htm
                                       gen_health=HUQ010,
                                       gen_health_v1yr=HUQ020,
                                       where_healthcare=HUQ041,
                                       how_many_healthcare=HUQ051,
                                       times_overnight_hosp=HUD080,
                                       mental_last_year=HUQ090,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/CBQ_I.htm
                                       money_supermarket=CBD071,
                                       money_non_food=CBD091,
                                       eating_out=CBD121,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/PAQ_I.htm#PAD615
                                       minutes_vigorous_work=PAD615,
                                       minutes_moderate_work=PAD630,
                                       walk_bike_work=PAD645,
                                       minutes_vigorous_rec=PAD660,
                                       minutes_moderate_rec=PAD675,
                                       minutes_sedentary=PAD680,
                                       hours_TV=PAQ710,
                                       hours_computer=PAQ715,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/PFQ_I.htm
                                       #the missing data corresponds to age groups skip patterns
                                       phys_limit_child=PFQ020,
                                       phys_limit_child_1yr=PFQ030,
                                       special_ed=PFQ041,
                                       health_prevent_work=PFQ049,
                                       health_limit_work=PFQ051,
                                       confusion=PFQ057,
                                       health_chronic_1=PFQ063A,
                                       health_chronic_2=PFQ063B,
                                       health_chronic_3=PFQ063C,
                                       health_chronic_4=PFQ063D,
                                       health_chronic_5=PFQ063E,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DR1TOT_I.htm
                                       d1_calories=DR1TKCAL,
                                       d1_protein=DR1TPROT,
                                       d1_carb=DR1TCARB,
                                       d1_sugar=DR1TSUGR,
                                       d1_fiber=DR1TFIBE,
                                       d1_fat=DR1TTFAT,
                                       d1_sat_fat=DR1TSFAT,
                                       d1_cholesterol=DR1TCHOL,
                                       d1_vit_E=DR1TATOC,
                                       d1_supp_E=DR1TATOA,
                                       d1_retinol=DR1TRET,
                                       d1_vit_A=DR1TVARA,
                                       d1_alpha_carotene=DR1TACAR,
                                       d1_beta_carotene=DR1TBCAR,
                                       d1_lycopene=DR1TLYCO,
                                       d1_b1_thiamine=DR1TVB1,
                                       d1_b2_riboflavin=DR1TVB2,
                                       d1_niacin=DR1TNIAC,
                                       d1_vit_b6=DR1TVB6,
                                       d1_total_folate=DR1TFOLA,
                                       d1_b12=DR1TVB12,
                                       d1_supp_b12=DR1TB12A,
                                       d1_vit_C=DR1TVC,
                                       d1_vit_D=DR1TVD,
                                       d1_vit_K=DR1TVK,
                                       d1_calcium=DR1TCALC,
                                       d1_phosphorus=DR1TPHOS,
                                       d1_magnesium=DR1TMAGN,
                                       d1_iron=DR1TIRON,
                                       d1_zinc=DR1TZINC,
                                       d1_copper=DR1TCOPP,
                                       d1_sodium=DR1TSODI,
                                       d1_potassium=DR1TPOTA,
                                       d1_selenium=DR1TSELE,
                                       d1_caffeine=DR1TCAFF,
                                       d1_alcohol=DR1TALCO) %>%
    select(SEQN,gender,educational_attainment,size,age,marital_status,yrs_US,vet_foreign_war,veteran,birth_country,
           poverty_ratio,pregnant,race,age_first_asthma,ever_told_asthma,still_have_asthma,asthma_attack_1yr,
           ER_asthma_1yr,age_arthritis,age_coronary_heart_disease,age_heart_attack,no_interest_do_things,
           depressed,trouble_sleep,no_energy,poor_eating,feel_bad_self,better_dead,BP_dr_said,age_hypertension,
           prescribed_BP,taking_prescribed_BP,prescribed_cholest,taking_prescribed_cholest,age_diabetes,
           told_prediabetes,feel_risk_diabetes,health_insurance,medicare,medicaid,no_insurance_1yr,
           gen_health,gen_health_v1yr,where_healthcare,how_many_healthcare,times_overnight_hosp,mental_last_year,
           money_supermarket,money_non_food,eating_out,minutes_vigorous_work,minutes_moderate_work,
           walk_bike_work,minutes_vigorous_rec,minutes_moderate_rec,minutes_sedentary,hours_TV,hours_computer,
           phys_limit_child,phys_limit_child_1yr,special_ed,health_prevent_work,health_limit_work,confusion,
           health_chronic_1,health_chronic_2,health_chronic_3,health_chronic_4,health_chronic_5,
           d1_calories,d1_protein,d1_carb,
           d1_sugar,d1_fiber,d1_fat,d1_sat_fat,d1_cholesterol,d1_vit_E,d1_supp_E,d1_retinol,d1_vit_A,d1_alpha_carotene,
           d1_beta_carotene,d1_lycopene,d1_b1_thiamine,d1_b2_riboflavin,d1_niacin,d1_vit_b6,d1_total_folate,
           d1_b12,d1_supp_b12,d1_vit_C,d1_vit_D,d1_vit_K,d1_calcium,d1_phosphorus,d1_magnesium,d1_iron,d1_zinc,
           d1_copper,d1_sodium,d1_potassium,d1_selenium,d1_caffeine,d1_alcohol)
NHANES_1 <- NHANES_merged
#add 4 luck columns - I want them to be permanent, instead of newly generated by the js
set.seed(6743)
NHANES_1$luck1 <- sample(100, size = nrow(NHANES_1), replace = TRUE)
NHANES_1$luck2 <- sample(100, size = nrow(NHANES_1), replace = TRUE)
NHANES_1$luck3 <- sample(100, size = nrow(NHANES_1), replace = TRUE)
NHANES_1$luck4 <- sample(100, size = nrow(NHANES_1), replace = TRUE)

#preparation of NHANES for PCA
#make categorical variables in vectors of binary, which will be removed later...
#could do it where we didn't break out the categorical variables, and just did the PCA with supplemental values, but
#this should give us more dimensions for the predictive fit.
#gender
NHANES_1 <- cbind(NHANES_1, sapply(levels(as.factor(NHANES_1$gender)), function(x) as.integer(x == NHANES_1$gender)))
names(NHANES_1)[names(NHANES_1) == 1] <- 'Male'
names(NHANES_1)[names(NHANES_1) == 2] <- 'Female'
#race
for(fact in unique(NHANES_1$race)){
  NHANES_1['hispanic'] <- ifelse(NHANES_1$race == 1 | NHANES_1$race ==2, 1, 0);
  NHANES_1['white'] <- ifelse(NHANES_1$race == 3, 1, 0);
  NHANES_1['black'] <- ifelse(NHANES_1$race == 4, 1, 0);
  NHANES_1['asian'] <- ifelse(NHANES_1$race == 6, 1, 0);
  NHANES_1['multiracial'] <- ifelse(NHANES_1$race == 7, 1, 0);
}

#changing random household_income so they'll ascend more or less - will drop for values from census sample
#decided to use percent_poverty instead.
#https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DEMO_I.htm#INDHHIN2
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 12, 7, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 13, 4, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 77, 0, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 99, 0, NHANES_1$household_income)
#for(fact in unique(NHANES_1$race)){
#  NHANES_1[paste("race", fact, sep = "_")] <- ifelse(NHANES_1$race == fact, 1, 0)
#}
#because RIDEXPG in NHANES has 1,2,3 levels
#NHANES_1["pregnant"] <- ifelse(NHANES_1$pregnant == 1, 1, 0) #have to think through for everything

#education level is numeric and meaningful as goes up (will not be broken up in columns)
for(row in NHANES_1){
  NHANES_1['educ_level'] <- ifelse(NHANES_1$educational_attainment<=5,NHANES_1$educational_attainment,0)
} 

##preparation of SAM for PCA (needs to match column names in NHANES)
sam <- createSAMSample(samplesize = 1000)

#education level - move upward, with 7 levels instead of 5 but in ascending level of educ.
for(row in sam){
  sam['educ_level'] <- ifelse(sam$educational_attainment=="Less than 9th grade",1,
                              ifelse(sam$educational_attainment=="9th to 12th grade, no diploma",2,
                                     ifelse(sam$educational_attainment=="High School Graduate",3,
                                            ifelse(sam$educational_attainment=="Some College, no degree",4,
                                                   ifelse(sam$educational_attainment=="Associate's degree",5,
                                                          ifelse(sam$educational_attainment=="Bachelor's Degree",6,
                                                                 ifelse(sam$educational_attainment=="Graduate or Professional Degree",7,0)))))))
}

#gender
sam <- cbind(sam, sapply(levels(as.factor(sam$sex)), function(x) as.integer(x == sam$sex)))
#race
sam <- cbind(sam, sapply(levels(as.factor(sam$race)), function(x) as.integer(x == sam$race)))

#calculate approximate poverty_ratio for sam - https://aspe.hhs.gov/poverty-guidelines
sam$poverty_ratio <- round(sam$household_income / (8000 + (sam$size*4500) ), digits = 3)




#Run PCA
#4=(family_)size,5=age,110=Male,111=Female,112-6 are race (hispanic,white,black,asian,multiracial),117=educ_level,11=poverty_ratio
res.pca1 <- PCA(NHANES_1[,c(4,5,110:117,11)],scale.unit=TRUE, ncp=5) #add back education later - have to make them the same scales
#get warning that says: Missing values are imputed by the mean of the variable: you should use the imputePCA function of the missMDA package

#predict https://cran.r-project.org/web/packages/FactoMineR/FactoMineR.pdf p. 72
#needs to be in same order, with same names, as res.pca1 
colnamesForPredict <- colnames(NHANES_1[,c(4,5,110:117,11)])
pca_predict <- predict(res.pca1,sam[,colnames(sam)%in%colnamesForPredict])
#sam_eigens <- cbind(sam,pca_predict$coord[,1:5])





#so, if you take each value, multiply it by res.pca$eig[,2][i] (the variance explained), and repeat for
#however eigendimensions you want...
#example: mod = NHANES, as (SEQN,dim1:dim5 /etc); then SAM, filled in with predict_PCA from same NHANES
#modifying from : https://github.com/allr/benchR/blob/master/MachineLearningAlg/learners-in-r/knn.R
#k is the number of neighbors considered - trying with top 10, then sample
k <- 10
mod <- res.pca1$ind$coord[,1:5] #whole thing, but only first 5 eigen dimensions
targ <- pca_predict$coord[,1:5] #
var <- res.pca1$eig[,2] #multiply each dimension in mod and targ by the percent var explained

#  n = nrow(targ)
  #sam_out <- data.frame()
  #NHnames <- paste0('NH_',colnames(NHANES_1))
  #for(colname in NHnames){
  #  sam[colname] <- NA
  #}
  #filesize <- n/(no_cores)
  #foreach(m=1:no_cores) %dopar% {
  #  end <- ifelse(m*filesize<n,round(m*filesize),n)
  #  p_sam <- test_sam[round(((m-1)*filesize)+1):end,]
  #extrap = rep(NA_character_, n)
  #NHrows=list()
  
  

   
#create empty dataframe to hold NHANES columns for SAM    
nhanes_columns_for_sam <- data.frame(matrix(NA, nrow = nrow(sam), ncol = ncol(NHANES_1) + 1))   
#loop over all SAM
for(i in 1:nrow(sam)) {
  #create nearest neighbor
  nn <- order(apply(mod, 1, function(x) sum((x - targ[i, ])^2)))[1:k]
  #match with one of the nn
  nhanes_columns_for_sam[i,] <- NHANES_1[sample(nn, 1),]
  #add SAM ID column
  nhanes_columns_for_sam[i,ncol(NHANES_1) + 1] <- sam[i,1]
}

#put column names
colnames(nhanes_columns_for_sam) <- c(colnames(NHANES_1), "account")
#write the NHANES SAM dataframe
saveRDS(nhanes_columns_for_sam,"NewSAMData/temp/nhanes_columns_for_sam_1000.RDS")

#remove the additional columns that we had created for the PCA matching
