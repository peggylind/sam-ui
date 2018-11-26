export function model_explanations(index) {
  const models = [
    {
  model_name: 'Sam City',
  div_width: '25%',
  div_left: '75%',
  author: 'Carol Upchurch and Manale Henini',
  h2_title: 'What is Sam?',
  text: `
  We have simulated residents for all the houses in Harris County (don't look for real people!) so that we can model community health at the individual scale
  and then allow patterns to emerge. Sam is a visual tool that helps us understand community interventions and their effects.
  Carol and Manale did the R implementation of the data and the user interface is Dan Price's fault.
  `,
  img: '/images/sam_uh.png',
  img_title: 'South Campus and Neighbors',
  text6: `Mea Culpa: I (Dan Price) broke the plot population characteristics button yesterday - it was very nice, and made the students' narratives work much better.
  `,
  search_terms: {},
  notes: `Have to decide - could make text have subobjects with paragraphs, etc.
  should add a place for source code and explanation of sources.
  `,
  //button: <span onClick={window.alert("ugh")}>X</span>,
  tooltip_terms: {terms:[0,2,5]}, //matches the indices for the categories in toShow
  //need all the button_text, etc., so it knows how to back out
//categories need to be read in for the step after - so they will show up for all the changes after this.
  steps: [ //n.b. range factor is bottom_range
   {category:[{age:{factor:14,fnd:14},bottom_range:14,top_range:50,race:{factor:'asian',fnd:"asian"},employment:{factor:"Employed",fnd:"Employed"}}], //can only do one range variable at a time now // reset all somewhere???
      categIndex: 0, //should be the same categIndex for the whole thing - the first one is the one that will write...
      steptext:'This is what needs to be said',
      condition:1,
      side_button_text:'Start Tour',
      button_text:'Tour Sam'},
   {category:[{age:{factor:'range',fnd:14},bottom_range:14,top_range:50,race:{factor:'asian',fnd:"asian"},employment:{factor:"Employed",fnd:"Employed"}}],
      categIndex: 0,
      steptext:'This is what wants to be said',
      condition:0,
      side_button_text:'Start Tour',
      button_text:'Filter for asians between 14 and 50'}
         ] //can't pass nested selection object to resolver
},
{
  model_name: 'Birthweight and Autism',
  div_width: '65%',
  div_left: '35%',
  author: 'Anoushka Gokhale',
  h2_title: 'Modeling Effects of Maternal Age, Access to Prenatal Care, and Stress on Birthweight',
  notes: `She has images for CRH that could be included - have to run it again
    pregnancy rates are for 2009 - image: https://www.cdc.gov/nchs/images/databriefs/101-150/db136_fig1.png
    I produced an autism_by_age and autism_by_CRH (with prenatal care - and thus age - and race)
  `,
  img2: '/images/stress.jpg',
  img_title: 'Stress and Preterm Effects on Pregnancy',
  img3: '/images/preterm.png',
  img: '/images/stressbodies.png',
  hrefs: 'links here; perhaps an order to things? perhaps in the click function??',
  search_terms: {sex:'female',age:{low:15,high:55}},
  text: `I am researching the correlation between prenatal care and autism prevalence,
varying by maternal age. Using hypergraphs and a user interface to model this research,
I hope to bring awareness to the importance of prenatal care during pregnancy to reduce
autism prevalence. As maternal age at delivery increases, the risk of autism for that
child increases. Prenatal care is important in reducing pregnancy risks as it reduces
prenatal stress. One biological pathway is found in examining
CRH (Corticotropin- releasing hormone) and mast cell activation.
Prenatal stress not only increases CRH levels in the mother, but in the child
as well by passing through the placenta. As a result, CRH increases mast cell activation,
leading to increased autism prevalence through disrupting the blood brain barrier.
The ideal prevention would entail prenatal care beginning in the first trimester of pregnancy,
which can reduce prenatal stress in the mother. Reduced prenatal stress results in a
decrease in both CRH levels and mast cell activation, lowering the likelihood of
autistic prevalence in the individual. For this reason, as the maternal age at
conception increases, the importance of prenatal care also increases. `
},
{
  model_name: 'Low Birthweight',
  div_width: '65%',
  div_left: '35%',
  author: 'Merina Thomas',
  h2_title: 'Modeling the Effect of Psychological Stress on Birthweight',
  search_terms: {sex:'female',age:{low:15,high:45}},
  img: '/images/LowBirthweight.png',
  img_title: 'Social Characteristic of Pregnancy',
  img1: '/images/stresslevelincomeByrace.png',
  img2: '/images/stresslevelraceByRace.png',
  img3: '/images/racebylowbirthweight.png',
  text: `
    I modeled Stress Level by Race and by Income separately.
    The stress levels were measured on the Psychological Stress Scale (also called the Perceived Stress Scale).
    This survey asks people to asses the degree to which they perceive situations in their life as stressful. The final product should show on a future version of Sam (Dan says it's his fault)
  `,
  img_title: 'Stress and Low Birthweight',
  citations: `
    Who’s Stressed? Distributions of Psychological Stress in the United States in Probability Samples from 1983, 2006, and 2009
    http://www.psy.cmu.edu/~scohen/Whos_Stressed_JASP_2012.pdf
`,
  citations1:`
    2010 Pregnancy Rates Among U.S. Women
    https://www.cdc.gov/nchs/data/hestat/pregnancy/2010_pregnancy_rates.pdf
`,
  citations2:`
    Work Stress in First Trimester Causes Low Birth Weight Baby
    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3214454/
`,
  citations3:`
    Racial/Ethnic Inequities in Low Birth Weight and Preterm Birth: The Role of Multiple Forms of Stress
    https://link.springer.com/article/10.1007%2Fs10995-018-2500-7
`,
  citations4:`
    Chronic Stress and Low Birth Weight Neonates in a Low-Income Population of Women
    https://journals.lww.com/greenjournal/Fulltext/2007/02000/Chronic_Stress_and_Low_Birth_Weight_Neonates_in_a.16.aspx
`,
  citations5:`
    Impact of Perceived Stress, Major Life Events and Pregnancy Attitudes on Low Birth Weight
    https://www.jstor.org/stable/2648197?seq=1#metadata_info_tab_contents
  `,
  steps: [{category:[{age:{low:20,high:50},race:{factor:'white'}}],
           steptext:'This is what wants to be said',
           button_text:'Filter'}]
},
{
  model_name: 'Diversity Entropy',
  div_width: '65%',
  div_left: '35%',
  author: 'Tom Ngyuen and Aditya Mankare',
  h2_title: 'The Positive Effect of Racial Diversity in American Neighborhoods',
  text: `

About:
This research project is about how racial diversity can have a positive and vibrant impact on the neighborhoods in Houston. Analysis of the available public health literature has displayed a consistent trend between levels of racial segregation and poor health outcomes among African Americans (Kramer & Hogue, 2009) .On the other hand, a separate study has shown that several, nationwide health disparities were either not present or significantly curtailed within an integrated community in Southwest Baltimore (LaVeist, Pollack, Thorpe, Fesahazion & Gaskin,  2011).  Integration of various races creates healthier individuals both mentally and physically, and the purpose of my research is to prove this point. We have gathered data about multiple mental health statistics ranging from “heart disease”, “hopelessness”, “worthlessness”, “nervousness”, “sadness”, “restlessness” and “serious psychological distress”.

What is unique about this project is that we are not just being limited to categorical data like different ethnicities and geographical boundaries.

Analyzing and interpreting causative factors, we are going a step forward by modelling the mental health data according to different races in different areas of Houston to show that racial integration relates mutually with positive health outcomes and leads to a happier and healthier life.

Process:
The challenge was to measure residential segregation. To do that, we decided to make an index for the diversity of neighborhoods, we measured something called the “Diversity Score” of certain races according to zip codes. The formula for the Diversity Score was obtained from a paper on the U.S. Census Bureau website. The paper was written by John Iceland.

For Racial Diversity, the races we have used are “Whites”, “African Americans”, “Asians”, “Hispanic or Latino”, “Two or more races” and “Some other races”.

`,
img: '/images/Racialentropy.png',
img_title: 'Racial Diversity Entropy Index, with lighter colors showing more entropy/diversity',
text2: `Here is the formula for the Diversity score:

Diversity Score = ∑(πri) ln[1/πri]

Where πri refers to a particular racial/ethnic group’s proportion of the population in zip code i.

Therefore the Diversity Score can also be written as:

∑(πri) ln[1/πri] = (πwhites) ln[1/πwhites] + (πblacks) ln[1/πblacks] + (πhispanic/latino) ln[1/πhispanic/latino] + (πasian) ln[1/πasian] + (πtwo_or_more) ln[1/πtwo_or_more] + (πmixed) ln[1/πmixed]

Similarly for For Educational Diversity we have used “Associate’s Degree”, “Bachelor’s Degree”, “Graduate or Professional Degree” and “Some college no degree”.

Again we use the formula for the Diversity score:

Diversity Score = ∑(πri) ln[1/πri]

Where πri refers to a particular educational group’s proportion of the population in zip code i.

The Educational Diversity Score can also be written as:

∑(πri) ln[1/πri] = (πassociates_degree) ln[1/πassociates_degree] + (πbachelors_degree) ln[1/πbachelor’s degree] + (πgraduate_or_professional_degree) ln[1/πgraduate_or_professional_degree] + (πsome_college_no_degree) ln[1/πsome_college_no_degree]

Later, the mental health statistics were observed according to Houston zip codes, so they could be shown, along with the diversity scores on the area of map selected.

Conclusion:
The health effects of segregation are relatively consistent, but complex.
Isolation segregation is mutually related with poor mental health outcomes and increased mortality for blacks.
Future work should extend recent developments in measuring and conceptualizing segregation in a multilevel framework, build upon the findings and challenges in the neighborhood-effects literature, and utilize longitudinal data sources to illuminate opportunities for public health action to reduce racial disparities in disease.

Note:
Like any other research topic, this one needs to be confirmed with a larger sample of data. However, there is still strong evidence to support the argument.

  `,
  citations: `
  Iceland, J. (2004). Beyond Black and White: Metropolitan residential segregation in multi-ethnic America. Social Science Research 33(2), 248-271.
  https://www.census.gov/hhes/www/housing/resseg/pdf/beyond_black_and_white.pdf`,
  citations1: `
  LaVeist, T., Pollack, K., Thorpe, R. Jr., Fesahazion R., Gaskin D. (2011). Place, not race: disparities dissipate in southwest Baltimore when blacks and whites live under similar conditions.Health Affairs 30(11), 1880-1887.
  https://www.healthaffairs.org/doi/pdf/10.1377/hlthaff.2011.0640`,
  citations2: `Kramer M., Hogue C., (2009). Is Segregation Bad for Your Health? Epidemiologic Reviews 31, 178-194.
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4362512/pdf/nihms668381.pdf`,
  citations3: `
  SimplyAnalytics (2018). % All Types of Heart Disease 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Hopelessness 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Worthlessness 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Nervousness 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Sadness 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Restlessness 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  SimplyAnalytics (2018). % Serious psychological distress 2017 .Retrieved July 18th, 2018, from SimplyAnalytics database.
  `,
  note:`
  Variable MetaData for datasets from SimplyAnalytics
  Name	% All Types Heart Disease
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   All Types Heart Disease
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  Name	% Hopelessness - All or most of the time
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Hopelessness - All or most of the time
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).

  Name	% Worthlessness - All or most of the time
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Hopelessness - All or most of the time
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  Name	% Nervousness - All or most of the time
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Nervousness - All or most of the time
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  Name	% Sadness - All or most of the time
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Sadness - All or most of the time
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  Name	% Restlessness - All or most of the time
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Restlessness - All or most of the time
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  Name	% Serious psychological distress
  Year   2018
  Path   EASI Health Care » Adults » Mental Health
  Definition   Full Guidelines (strenthing and aerobic combined) - Met both muscle-strenghtening and aerobic guidelines
  Source Agency   Easy Analytic Software, Inc. (EASI) - Healthcare and Illness (Deaths) Database
  Vendor   EASI
  Data Set   EASI Health US
  Categories   Health
  Tagged   Health:   Mental Health
  Data Source   EASI has modeled the health statistics for the U.S. population based upon age, sex, and race probabilities. The probabilities are modeled against the EASI Census, current year and five year forecasts.
  The sources include:

  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Adults: National Health Interview Survey - Series 10, #235
  - Vital and Health Statistics; Centers for Disease Control and Prevention; Summary Health Statistics for US Children: National Health Interview Survey - Series 10, #234
  - National Vital Statistics Reports United States Life Tables; Centers for Disease Control and Prevention - Volume 56, #9.
  - For each Health Data variable, EASI has developed an estimate of how many adults or children reported the condition or died of a listed illness (top 15 causes of death).
  `
},
{
  model_name: 'Type 2 Diabetes',
  div_width: '35%',
  div_left: '65%',
  author: 'Akash Ramesh',
  contact: 'akash.skyler.ramesh@gmail.com',
  h2_title: 'The Efficacy of Screening for Prostate Cancer at Different Ages',
  search_terms: {member:'Adult',age:{low:15,high:85},BMI:{low:10,high:100}},
  text: `
  This project attempts to look at Type 2 Diabetes from a perspective that is different than the normal standard of simply using BMI to calculate the risk. Much progress has been made to include other factors such as race, sex, and household income. However, this project attempts to take this progress one step further by:
1)	Including nutritional levels to get a better understanding of what foods affect diabetes the most
2)	Allowing a person to be interactive with the model
3)	Matching a person’s data, as closely as possible, to other individuals in a dataset to receive a more accurate relative risk

The evaluation of the risk uses a hypergraph theory model. The hypergraph model was chosen because it allows us to look at the strengths of connections between various factors and allows us to keep the person as an individual rather than classifying them into a group. There has been a rapid increase of the use of this model in biological systems, and this project aims to be able to apply it to public health as well.

    `,
    img: `/images/BMIbycarb.png`,
    img1: `/images/Fiber.png`,
    img2: `/images/Protein.png`,
    img3: `/images/B6.png`,
  citations: `
  “Diabetes Diet, Eating, & Physical Activity.” National Institute of Diabetes and Digestive and Kidney Diseases, U.S. Department of Health and Human Services, 1 Nov. 2016, www.niddk.nih.gov/health-information/diabetes/overview/diet-eating-physical-activity.

Klamt, Steffen, et al. “Hypergraphs and Cellular Networks.” NCBI, 2009, www.ncbi.nlm.nih.gov/pmc/articles/PMC2673028/pdf/pcbi.1000385.pdf.

Narayan, K.M.V., et al. “Effect of BMI on Lifetime Risk for Diabetes in the U.S.” Diabetes Care, American Diabetes Association, 1 June 2007, care.diabetesjournals.org/content/30/6/1562.

West, Kelly M, and John M Kalbfleisch. “Glucose Tolerance, Nutrition, and Diabetes in Uruguay, Venezuela, Malaya, and East Pakistan.” Diabetes, American Diabetes Association, 1 Jan. 1966, diabetes.diabetesjournals.org/content/15/1/9.short.

  a.	Ganz ML, Wintfeld N, Li Q, Alas V, Langer J, Hammer M. The association of body mass index with the risk of type 2 diabetes: a case-control study nested in an electronic health records system in the United States. Diabetol Metab Syndr. 2014;6(1):50. http://www.dmsjournal.com/content/6/1/50
  Demo. Var: https://wwwn.cdc.gov/Nchs/Nhanes/2013-2014/DEMO_H.htm#DMDHRGND

  Nutrition:  https://wwwn.cdc.gov/Nchs/Nhanes/2013-2014/DR2TOT_H.htm#Appendix_5._Variables_in_the_Total_Nutrients_Files_(DR1TOT_H_and_DR2TOT_H)_by_Position
  `
},
{
  model_name: 'Prostate Cancer',
  div_width: '65%',
  div_left: '35%',
  author: 'Raj Iyer',
  contact: 'rajiyer2012@gmail.com',
  h2_title: 'The Efficacy of Screening for Prostate Cancer at Different Ages',
  search_terms: {sex:'female',age:{low:15,high:45}},
  img: `/images/HasProstateCancer.png`,
  img1: `/images/HasScreening.png`,
  img2: `/images/hasFalsePositive.png`,
  img3: `/images/hasFalsePositive.png`,
  img4: `/images/Cancer outcome.png`,
  text: `
  This project’s focus is modeling prostate cancer screening and outcomes. Prostate cancer screening, specifically the PSA test, is a controversial topic as the test used in screening is sensitive and may lead to overdiagnosis. It is often debated whether the potential of screening to save lives outweighs the harm it may cause with false positive diagnoses. Using statistics from various peer-reviewed sources, this model predicts if individuals will be diagnosed with prostate cancer, undergo prostate cancer screening, and if their screening would result in a false positive diagnosis. Whether a patient will get prostate cancer or undergo screening is predicted based off their race and age. If individuals have a false positive diagnosis, the model will further predict the outcome of prostate cancer treatment and if there will be any complications as a result of treatment.
The obvious solution to reducing the amount of false positives would be to raise the age at which screening occurs. Raising the screening age away from 50 and closer to the average age of diagnosis, 65, could work. In general, those near 50 have a low probability of developing prostate cancer so removing the chance of a false positive may outweigh the risk of missing an actual prostate cancer diagnosis. However, raising the age is not that simple. There is no one size fits all solution to this since other factors, such as genetics/family history, play a large role in the development of prostate cancer. And since certain races are at a considerably higher risk for developing prostate cancer, some races could get away with starting screening much later than others.
While there is a lot to consider, the fact of the matter is that prostate cancer screening produces a concerning amount of false positive diagnoses. It is a useful tool for catching prostate cancer early in its development, but ideally, it should be more accurate. Improving the test itself could fix this, but a more realistic fix would be adjusting the age ranges of screening.
  `,
  citations: ``
},
{
  model_name: 'Breast Cancer',
  div_width: '55%',
  div_left: '45%',
  author: 'Sasanka Thupili',
  h2_title: 'Breast Cancer Screening: Potential Negative Consequences',
  img: '/images/breastcancer.png',
  img_title: 'Breast Cancer Among all New Cancers by the CDC',
  notes: `
  Proposed UI
Like Raj, I think that a map wouldn’t work as well for a visual. The main visual I can think of would be like his essentially. An important note is that within my code is columns denoting those who go in for screening, get successive screening, proceed to get annual screens along with columns denoting cancer detection, false positives, and false negatives within each set of screenings.
First, there would be a visual with all the female individuals (modeled by dots, miniature images of people, whichever works best).
From there, the figures will be repeatedly subdivided, initially into two groups: those who don’t go for screening (the women under age 40 who don’t need to go for screening and ~33% of women ages 40 and above above who chose not to), and then those that do (~67% of women ages 40 and above). Within this, individuals will be color coded as follows: green = no cancer, red = correctly detected cancer, blue = received a false positive, yellow = received a false negative. Rates are as follows – correct detection at 80% of those who have cancer (meaning there’s a 20% false negative rate), false positive detection at 7% for those who do not have cancer.
The next subdivision will occur in the second group, with a new set of 2 groups: those who continue to go in for screening (about 16% of those who went in for screening), and those who do not. The same color coding will occur as before except the rate of false positives will increase to ~10%, meaning slightly more might be color coded as blue.
The group that goes for a second screening would have a subdivision exactly like the previous, continued screening or ending it there and going for treatment if positive, except that the rate of those who proceed to receive annual screening following the second becomes 10% (each are again denoted whether or not they continue to go for screening). The color coding is the same as before, but the new rate for false positives is 5% since annual screenings start to have a much lower rate of false positives.
There could be a summary page that indicates how many of each occurred, and whether overdiagnosis occurred (the false positives) and thus overtreatment occurred.
  `,
  contact: 'sasanka.thupili@gmail.com',
  h2_title: 'The Efficacy of Screening for Breast Cancer at Different Ages',
  search_terms: {sex:'female',age:{low:15,high:45}},
  text: `
  As with various forms of cancer, screening for breast cancer can aid in early detection, monitoring of suspicious areas, and allow for attaining knowledge of one’s body. While there are benefits to partaking in screening and starting annual checkups, there are also drawbacks, primarily with the chance of obtaining a false positive or a false negative. As of now, the approximate annual percent of U.S. women with cancer is 12%, the rate of obtaining a false negative is 20%, meaning about one in five patients with breast cancer will not know from a screening that they have it; the rate of a false positive is approximately 10-12% for an initial screen (with some variance based on factors including breast size) with successive screenings allowing for double checking for those who attained a false positive, and unfortunately, a higher chance of a new false positive arising from other patients (Limitations, September 2018). All data regarding detection and false positive rates come from the Center of Disease Control (CDC) and the American Cancer Society (U.S., June 2018).
  `,
  text2: `
  My project revolves around simulating screenings of women ages 40 and above in a hypothetical city in the R Studio program. Based on statistics specifying the proportion of certain demographics (i.e. uninsured vs. insured) that go in for screening, columns will be created denoting whether each woman was screened or didn’t go in, whether the woman actually had cancer or didn’t, whether it was correctly detected, a false negative, or a false positive, and if successive screening occurred or not. Each column will be created with R’s capacity to modify data tables based on a random number simulating the percent of each of the aforementioned conditions with the mutate, ifelse and sample commands. The visualization will denote each group of women (those with cancer and those without, the screenings they go for, and the obtaining of false positives and false negatives)
  The simulation can then be used to examine proportions of patients harmed, helped, or unaffected by screenings. Possible expansions include forced additional screening on a known false positive/ false negative to see if the result could be corrected, examining the proportion saved by the information provided by their screenings, and perhaps examining how breast size specifically affects the false positive rate. The former two can be accomplished by similar methods to the above, the latter would be more qualitative and might require more concrete research on the topic.
  `,
  citations: ``
}
];
let retVals=models[index];
if (index == 'names'){
  retVals=models;
};

return retVals
};
