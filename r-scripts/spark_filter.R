library(sparklyr)
library(tidyverse)
library(dplyr)


setwd("~/Development/humana/sampleRDS")
spark_dir = "/data/spark/"
sc = spark_connect(master = "local")

med = spark_read_csv(sc, name = "med", path = "med_tab_10k.csv")
med <- read_table("med_tab_10k.csv",)

tic = Sys.time()
counts_by_code <- med %>%
  group_by(PATIENT_ID)%>%
  count(MEDICAL_PRIMARY_DIAGNOSIS_CODE)
counts_by_code
(toc = Sys.time() - tic)

eclam <- med_tab_10k%>% filter_at(vars(contains("DIAGNOSIS_CODE")), any_vars(. %in% c('6424', '64240','64241','64242','64243','64244','6425','64250','64251','64252','64253','64254','6426','64260','64261','64262','64263','64264','6427','64270','64271','64272','64273','64274')))
eclam







        