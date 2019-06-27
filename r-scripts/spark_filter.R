library(sparklyr)
library(tidyverse)
library(dplyr)


setwd("~/Development/humana/sampleRDS")
spark_dir = "/data/spark/"
sc = spark_connect(master = "local")

med = spark_read_csv(sc, name = "med", path = "med_tab_10k.csv")
med <- read_csv("med_tab_10k.csv")

tic = Sys.time()
counts_by_code <- med %>%
  group_by(PATIENT_ID)%>%
  count(MEDICAL_PRIMARY_DIAGNOSIS_CODE)
counts_by_code
(toc = Sys.time() - tic)

hpylori <- med %>% filter_at(vars(contains("DIAGNOSIS_CODE")), any_vars(. == 04186))
hpyloriSyst






        