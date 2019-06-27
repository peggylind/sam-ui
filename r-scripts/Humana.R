Humana De-identified

library(rio)
pat_sas <- import("/Volumes/Fortress/deid_2013_2015_v1_pat.sas7bdat")
lab_sas <- import("/Volumes/Fortress/deid_2013_2015_v1_lab.sas7bdat")
lab_tab <- read.csv("/Volumes/Fortress/DEID_2013_2015_V1_LAB.TAB",nrows=10000,sep = "\t")
med_tab <- read.csv("/Volumes/Fortress/DEID_2013_2015_V1_MED.TAB",nrows=10000,sep = "\t")
rx_tab <- read.csv("/Volumes/Fortress/DEID_2013_2015_V1_RX.TAB",nrows=10000,sep = "\t")






library(dplyr)
samp_pat_sas <- sample_n(pat_sas,10000)
samp_lab_sas <- sample_n(lab_sas,10000)

saveRDS(samp_pat_sas,file = "pat_sas_10k.RDS")
saveRDS(lab_tab,file = "lab_tab_10k.RDS")
saveRDS(med_tab,file = "med_tab_10k.RDS")
saveRDS(rx_tab,file = "rx_tab_10k.RDS")
