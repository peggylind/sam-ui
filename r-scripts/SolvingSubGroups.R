#write all the outcomes as true false probabilities

v1 <- 'pregnant women with eclampsia'
v1l1 <- TRUE
v1l2 <- FALSE
v1l1P <- .001
v1numer <- c('v1l1')
v1denom <- c('v1l1','v1l2')

v2 <- 'pregnant women with preeclamplsia'
v2l1 <- TRUE
v2l2 <- FALSE
v2l1P <- .065  #getting contradictory numbers
v2numer <- c('v2l1')
v2denom <- c('v2l1','v2l2') 

v3 <- 'pregnant women with HELP syndrome'
v3l1 <- TRUE
v3l2 <- FALSE
v3l1P <- .15
v3numer <- c('v3l1')
v3denom <- c('v3l1','v3l2') 

v4 <- 'pregnant women with High BMI'
v4l1 <- TRUE
v4l2 <- FALSE
v4l1P <- .45
v4numer <- c('v4l1')
v4denom <- c('v4l1','v4l2')

v5 <- 'pregnant women with no/low prenatal care'
v5l1 <- TRUE
v5l2 <- FALSE
v5l1P <- .152
v5numer <- c('v5l1')
v5denom <- c('v5l1','v5l2') 

v6 <- 'pregnant white mild preeclampsia'
v6l1 <- TRUE
v6l2 <- FALSE
v6l1P <- .032
v6numer <- c('v6l1')
v6denom <- c('v6l1','v6l2') 

v7 <- 'pregnant white severe preeclampsia'
v7l1 <- TRUE
v7l2 <- FALSE
v7l1P <- .016
v7numer <- c('v7l1')
v7denom <- c('v7l1','v7l2') 

v8 <- 'pregnant white eclampsia'
v8l1 <- TRUE
v8l2 <- FALSE
v8l1P <- .001
v8numer <- c('v8l1')
v8denom <- c('v8l1','v8l2') 

v9 <- 'pregnant black mild preeclampsia'
v9l1 <- TRUE
v9l2 <- FALSE
v9l1P <- .048
v9numer <- c('v9l1')
v9denom <- c('v9l1','v9l2') 

v10 <- 'pregnant black severe preeclampsia'
v10l1 <- TRUE
v10l2 <- FALSE
v10l1P <- .035
v10numer <- c('v10l1')
v10denom <- c('v10l1','v10l2') 

v11 <- 'pregnant black eclampsia'
v11l1 <- TRUE
v11l2 <- FALSE
v11l1P <- .001
v11numer <- c('v11l1')
v11denom <- c('v11l1','v11l2') 

v12 <- 'pregnant hispanic mild preeclampsia'
v12l1 <- TRUE
v12l2 <- FALSE
v12l1P <- .035
v12numer <- c('v12l1')
v12denom <- c('v12l1','v12l2') 

v13 <- 'pregnant hispanic severe preeclampsia'
v13l1 <- TRUE
v13l2 <- FALSE
v13l1P <- .023
v13numer <- c('v13l1')
v13denom <- c('v13l1','v13l2') 

v14 <- 'pregnant hispanic eclampsia'
v14l1 <- TRUE
v14l2 <- FALSE
v14l1P <- .001
v14numer <- c('v14l1')
v14denom <- c('v14l1','v14l2') 


#I don't think v15 thru v17 give new information, since they're just averages.
v15 <- 'pregnant with mild preeclampsia'
v15l1 <- TRUE
v15l2 <- FALSE
v15l1P <- .042
v15numer <- c('v6l1', 'v9l1', 'v12l1')
v15denom <- c('v6l1', 'v9l1', 'v12l1','v6l2', 'v9l2', 'v12l2')

v16 <- 'pregnant with severe preeclampsia'
v16l1 <- TRUE
v16l2 <- FALSE
v16l1P <- .028
v16numer <- c('v7l1', 'v10l1', 'v13l1')
v16denom <- c('v7l1', 'v10l1', 'v13l1','v7l2', 'v10l2', 'v13l2')

v17 <- 'pregnant with eclampsia'
v17l1 <- TRUE
v17l2 <- FALSE
v17l1P <- .001
v17numer <- c('v8l1', 'v11l1', 'v14l1')
v17denom <- c('v8l1', 'v11l1', 'v14l1','v8l2', 'v11l2', 'v14l2')
v17eq <- list(v17,v17l1P,v17numer,v17denom)

eqs1 <- list(v1l1,v1l2,-v2l1,-v2l2)
eq1pos <- c(1)
eq1neg <- c(2)
eq_list <- list(eq1pos,eq1neg)
eqs2 <- list(v1l1,v1l2,-v3l1,-v3l2)
eqs3 <- list(v1l1,v1l2,-v4l1,-v4l2)
eqs4 <- list(v1l1,v1l2,-v5l1,-v5l2)
eqs5 <- list(v6l1,v6l2,v7l1,v7l2,v8l1,v8l2,v9l1,v9l2,v10l1,v10l2,v11l1,v11l2,v12l1,v12l2,v13l1,v13l2,v13l1,v13l2,v14l1,v14l2,-v1l1,-v1l2)
equations <- list(eqs1,eqs2,eqs3,eqs4,eqs5)
probs_list <- list(v1l1P,v2l1P,v3l1P,v4l1P,v5l1P,v6l1P,v7l1P,v8l1P,v9l1P,v10l1P,v11l1P,v12l1P,v13l1P,v14l1P)
#prob_equations <- 
input_list <- list()

#prob_array <- array(1:length(probs_list),dim=c(2))
#prob_matrix <- matrix(data = 0, nrow=2, ncol = 19) #14 vars and 5 eqs

prob_df <- data.frame()

j <- 0
for (i in 1:length(probs_list)){
  prob_df[i,j+1] <- as.numeric(probs_list[i])
  prob_df[i,j+2] <- as.numeric(probs_list[i]) - 1
  j <- j+2
}
prob_df[is.na(prob_df)] <- 0
m <- 1
for (k in length(probs_list):length(probs_list)+(length(eq_list)/2)){
  prob_df[k,] = 0
  prob_df[k,eq_list[m]]
}


