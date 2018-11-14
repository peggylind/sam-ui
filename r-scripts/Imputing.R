#I already have a sam
test_income <- NHANES_Diabetes %>% select(household.income)
income_cats <- cbind(unique(test_income)$household.income)
#make household_income usable 
#run level(sam$bracket_household_income) to get the right order for the labels
NHANES_income1 <- within(NHANES_Diabetes, income1 <- factor(household.income, labels = c(0,10000,125000,15000,'None',25000,35000,45000,5000,55000,65000,75000,'None','None','None')))
Sam_income <- within(sam, income1 <- factor(bracket_household_income, labels = c(0,10000,100000,125000,15000,150000,20000,200000,25000,30000,35000,40000,45000,50000,60000,75000,0,5000,10000,15000,20000,25000,35000,50000,65000,75000)))

NHANES_income1$race <- lapply(NHANES_income1$race,tolower)
NHANES_income1$income <- lapply(NHANES_income1$income,as.numeric)
NHANES_income2 <- as.data.frame(NHANES_income1, stringsAsFactors = FALSE)
test_sam_income1 <- as.data.frame(test_sam_income, stringsAsFactors = FALSE)
test_sam_income1$race <- as.factor(test_sam_income1$race)
NHANES_income2$race <- as.factor(NHANES_income2$race)

TestSamDiabetesMerge <- merge(NHANES_income2, test_sam_income1, all = TRUE, by = c('income1'))
new_test <- TestSamDiabetesMerge %>% select(-coords)  # have to add coords back with a merge on data
library(mice)
#https://datascienceplus.com/handling-missing-data-with-mice-package-a-simple-approach/
init = mice(new_test, maxit = 0)
#need to select on the ones that work, then do the imputation.
meth = init$method
predM = init$predictorMatrix
