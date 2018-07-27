#doesn't work on sf objects

library(dplyr)
sam2 <-  mutate(sam,
    one_of = case_when(
        1:n() %% 10 == 0 ~ 'tens',
        1:n() %% 100 == 0 ~ 'hundreds',
        1:n() %% 1000 == 0 ~ 'thousands',
        1:n() %% 10000 == 0 ~ 'ten_thousands',
        TRUE ~ 'one')
)
