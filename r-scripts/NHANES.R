# part of process run inside sam_mongolite
# March 10, 2019 accessed from: 2015-16 / https://wwwn.cdc.gov/nchs/nhanes/search/datapage.aspx?Component=Demographics&CycleBeginYear=2015
#perhaps, but not yet included - https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HSQ_I.htm / general health self-report

# and 4/30/2019 https://wwwn.cdc.gov/nchs/nhanes/search/datapage.aspx?Component=Questionnaire&CycleBeginYear=2015
#to include: diabetes: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DIQ_I.htm
#depression instrument: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DPQ_I.htm download on 4/30/1
#medical conditions: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/MCQ_I.htm download on 4/30/19
#insurance: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HIQ_I.htm
#healthcare utilization: https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/HUQ_I.htm
#body measures https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/BMX_I.htm download on 4/30/19


library(rio)
demo_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/DEMO_I.XPT")
#https://wwwn.cdc.gov/nchs/nhanes/search/variablelist.aspx?Component=Demographics&CycleBeginYear=2015
diet_nutrient1_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/DR1TOT_I.XPT")
#diet_nutrient2_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/DR2TOT_I.XPT")
med_condition_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/MCQ_I.XPT")
depression_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/DPQ_I.XPT")
blood_pressure_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/BPQ_I.XPT")
#cardio_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/CDQ_I.XPT")
diabetes_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/DIQ_I.XPT")
insurance_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/HIQ_I.XPT")
hospital_use_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/HUQ_I.XPT")
consumer_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/CBQ_I.XPT")
#phys_act_NH <- import("/Users/dan/Downloads/UH_OneDrive/OneDrive\ -\ University\ Of\ Houston/Social\ Network\ Hypergraphs/NHANES/PAQ_I.XPT")
# etc.

merged_NHANES_1 <- merge(demo_NH,diet_nutrient1_NH,by="SEQN")
#Vitamin D for the NHANES data: it is called 1,25 (OH)3 D3

#the measured active form of B6 in serum is pyridoxal phosphate (PLP.)
#folate
#vitamin A retinol


library(plyr)
#make sure to get HH reference person
#plyr::rename(merged_NHANES_1, c(birth_country="DMDHRBR4"))#="birth_country","DMDHRGND"="gender",
#                          "DMDHREDU"="education","DMDHRAGE"="age","INDFMPIR"="poverty_ratio",
#                          "INDHHIN2"="household_income"))

library(dplyr)
#see NHANES_2015.json for brief descriptions - didn't finish putting those in, or getting all the codes / types
NHANES_1 <- merged_NHANES_1 %>% rename(gender=DMDHRGND,
                                       education=DMDHREDU,
                                       family_size=DMDFMSIZ,
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
                                       age_arthritis=MCQ180a,
                                       age_coronary_heart_disease=MCQ180c,
                                       age_heart_attack=MCQ180c,
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
                                       times_overnight_hosp=HUQ080,
                                       mental_last_year=HUQ090,
                                       #https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/CBQ_I.htm
                                       money_supermarket=CBD071,
                                       money_non_food=CBD091,
                                       eating_out=CBD121,
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
    select(SEQN,gender,education,family_size,age,marital_status,yrs_US,vet_foreign_war,veteran,birth_country,
           poverty_ratio,pregnant,race,age_first_asthma,ever_told_asthma,still_have_asthma,asthma_attack_1yr,
           ER_asthma_1yr,age_arthritis,age_coronary_heart_disease,age_heart_attack,no_interest_do_things,
           depressed,trouble_sleep,no_energy,poor_eating,feel_bad_self,better_dead,BP_dr_said,age_hypertension,
           prescribed_BP,taking_prescribed_BP,prescribed_cholest,taking_prescribed_cholest,age_diabetes,
           told_prediabetes,feel_risk_diabetes,health_insurance,medicare,medicaid,no_insurance_1yr,
           gen_health,gen_health_v1yr,where_healthcare,how_many_healthcare,times_overnight_hosp,mental_last_year,
           money_supermarket,money_non_food,eating_out,
           d1_calories,d1_protein,d1_carb,
           d1_sugar,d1_fiber,d1_fat,d1_sat_fat,d1_cholesterol,d1_vit_E,d1_supp_E,d1_retinol,d1_vit_A,d1_alpha_carotene,
           d1_beta_carotene,d1_lycopene,d1_b1_thiamine,d1_b2_riboflavin,d1_niacin,d1_vit_b6,d1_total_folate,
           d1_b12,d1_supp_b12,d1_vit_C,d1_vit_D,d1_vit_K,d1_calcium,d1_phosphorus,d1_magnesium,d1_iron,d1_zinc,
           d1_copper,d1_sodium,d1_potassium,d1_selenium,d1_caffeine,d1_alcohol)

#household_income is ranges - can use as binary?
#make factors into list of binary variables, which will be removed later...
NHANES_1["male"] <- ifelse(NHANES_1$gender == 1, 1, 0)
NHANES_1["female"] <- ifelse(NHANES_1$gender == 2, 1, 0)

#for(fact in unique(NHANES_1$marital_status)){
#  NHANES_1[paste("marital_status", fact, sep = "_")] <- ifelse(NHANES_1$marital_status == fact, 1, 0)
#}

for(fact in unique(NHANES_1$race)){
  NHANES_1['hispanic'] <- ifelse(NHANES_1$race == 1 | NHANES_1$race ==2, 1, 0);
  NHANES_1['white'] <- ifelse(NHANES_1$race == 3, 1, 0);
  NHANES_1['black'] <- ifelse(NHANES_1$race == 4, 1, 0);
  NHANES_1['asian'] <- ifelse(NHANES_1$race == 6, 1, 0);
  NHANES_1['multiracial'] <- ifelse(NHANES_1$race == 7, 1, 0);
}

#changing random household_income so they'll ascend more or less - will drop for values from census sample
#https://wwwn.cdc.gov/Nchs/Nhanes/2015-2016/DEMO_I.htm#INDHHIN2
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 12, 7, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 13, 4, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 77, 0, NHANES_1$household_income)
#NHANES_1["household_income"] <- ifelse(NHANES_1$household_income == 99, 0, NHANES_1$household_income)
#for(fact in unique(NHANES_1$race)){
#  NHANES_1[paste("race", fact, sep = "_")] <- ifelse(NHANES_1$race == fact, 1, 0)
#}
#because RIDEXPG in NHANES has 1,2,3 levels
NHANES_1["pregnant"] <- ifelse(NHANES_1$pregnant == 1, 1, 0)

#rename race_ and select out race (there was no race_5)
NHANES_1 <- NHANES_1 %>% #rename(mex_american=race_1,hispanic=race_2,white=race_3,black=race_4,asian=race_6,multiracial=race_7) %>%
  select(-race, -gender)

#education may be meaningful as increases, so kept it going - 9 = "Don't know", but only 5 cases
#for(fact in unique(NHANES_1$education)){
#  NHANES_1[paste("education", fact, sep = "_")] <- ifelse(NHANES_1$education == fact, 1, 0)
#}

library(FactoMineR)
#could do it where we didn't break out the categorical values, and just did the PCA with supplemental values, but
#this should give us more dimensions for the predictive fit.
#sam and NHANES_1 have to have some matching column names
#will expand sam, then take extras out after the PCA and matching.
#create S3 PCA object to use for prediction
res.pca <- PCA(NHANES_1,scale.unit=TRUE, ncp=8)
res.pca1 <- PCA(NHANES_1[,c(2,3,43:49,7,11)],scale.unit=TRUE, ncp=8)
res.pca2 <- PCA(NHANES_1[,c(2,3,43)],scale.unit=TRUE, ncp=3)
#calculate approximate poverty_ratio for sam - https://aspe.hhs.gov/poverty-guidelines
test_sam['poverty_ratio'] <- round(test_sam$household_income / (8000 + (test_sam$size*4500) ), digits = 3)

test_sam["male"] <- ifelse(test_sam$sex == "Male", 1, 0)
test_sam["female"] <- ifelse(test_sam$sex == "Female", 1, 0)
for(fact in unique(test_sam$race)){
  test_sam[paste(fact)] <- ifelse(test_sam$race == fact, 1, 0)
}
#for each in names(NHANES_1) that you want
test_sam["d1_calories"] <- 0
test_sam["d1_fiber"] <- 0

#predict https://cran.r-project.org/web/packages/FactoMineR/FactoMineR.pdf p. 72
pca_predict <- predict(res.pca1,test_sam[,c(8,67:69,71,72,74,70,75,79,78)])
summary.PCA(res.pca)
#do the select, etc., first to get order correct



#so, if you take each value, multiply it by res.pca$eig[,2][i] (the variance explained), and repeat for
#however eigendimensions you want...
#example: mod = NHANES, as (SEQN,dim1:dim5 /etc); then SAM, filled in with predict_PCA from same NHANES
#modifying from : https://github.com/allr/benchR/blob/master/MachineLearningAlg/learners-in-r/knn.R
#k is the number of neighbors considered - trying with top 10, then sample
k <- 10
mod <- res.pca1$ind$coord[,1:5] #whole thing, but only first 5 eigen dimensions
targ <- pca_predict$coord[,1:5] #
var <- res.pca1$eig[,2] #multiply each dimension in mod and targ by the percent var explained
match_individuals = function(mod,targ,k){
  n = nrow(targ)
  extrap = rep(NA_character_, n)
  for(i in 1:n){
    nn = order(apply(mod, 1, function(x) sum((x - targ[i, ])^2)))[1:k] #treats all eigendimensions the same,
    test_sam[i,9:11] = NHANES_1[sample(nn, 1),9:11]
    #extrap[i] = sample(nn,1)
  }
  #returns nn as mod ordered by closest for each row ##try on dfs with multiple columns
  return(extrap)
}


#testing
