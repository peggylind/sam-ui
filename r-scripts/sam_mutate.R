#mutate with sample function
#in test case, using samc_no_notes
test_sam <- samc_no_notes
library(dplyr)

sam_mutate <- function(df,)
df %>% group_by(segment) %>%
  mutate(SumA3 = SumA2) %>%     #Added another column to demonstrate 
  mutate_at(vars(starts_with("SumA")), funs(mean = "mean"))

sam_summarize <- function(df, group_var,factor_var){
  var_name <- quo_name(factor_var)
  df %>%
    group_by_at(vars(!!group_var,!!factor_var)) %>%
    summarize(cnt=n())
}
sam_ts <- sam_summarize(sam_coord,quo(tract),quo(employment))