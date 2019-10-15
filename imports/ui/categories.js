export function categories(list) {
  //add html_title later
  //take out factors for type: range, but make sure it doesn't break anything.
  const cat_list = [
      //0
    {category: 'none', pretty_name: 'none', type: 'non', low: 0, high:0, factors:
      [{factorName:'none',factorColor:5}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //1
    {category: 'age', pretty_name: 'age', type: 'range', low: 0, high:120, factors:
      [{factorName:'low',factorColor:11},{factorName:'high',factorColor:10}],fnd:'',fnd_top_num:100,fnd_bottom_num:0,ScaleHeight:1,Mode:"Scatter"},
      //2
    {category: 'disability', pretty_name: 'disability', type: 'factor', factors: [{factorName:'No Disabilities',factorColor:3},{factorName:'With One Type of Disability',factorColor:2},
      {factorName:'With Two or More Types of Disabilities',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //3
    {category: 'educational_attainment', pretty_name: 'education', html_title: 'Self-reported highest level of education', type: 'factor',
      factors: [{factorName:'High School Graduate',factorColor:3},{factorName:'Graduate or Professional Degree',factorColor:2},
        {factorName:"Bachelor's Degree",factorColor:1},{factorName:"Associate's degree",factorColor:5},{factorName:"Some College, no degree",factorColor:5},
        {factorName:"Less than 9th grade",factorColor:1},{factorName:"9th to 12th grade, no diploma",factorColor:5}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //4
    {category: 'education_entropy_index', pretty_name: 'educational entropy', type: 'range', low: -.01, high:-.43,
      factors:[{factorName:'low',factorColor:3},{factorName:'high',factorColor:6}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0,ScaleHeight:1,Mode:"Scatter"},
      //5
    {category: 'employment', pretty_name: 'employment', type: 'factor',
      factors: [{factorName:'Not in labor force',factorColor:3},{factorName:'Employed',factorColor:2},
        {factorName:'Unemployed',factorColor:1},{factorName:'In Armed Forces',factorColor:6}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //6
    {category: 'household_income', pretty_name: 'income', type: 'range', low: 0, high:700000,
      factors:[{factorName:'low',factorColor:5},{factorName:'high',factorColor:1}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0,ScaleHeight:1,Mode:"Scatter"},
      //7
    // {category: 'lowbirthweightbyrace', pretty_name: 'low birthweight by race', type: 'factor',
    //   factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
    {category: 'lowbirthweightbyrace', pretty_name: 'Hypertension and Preeclampsia', type: 'factor',
      factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //8
    {category: 'member', pretty_name: 'family member',
      html_title: 'Which person in family - householder is the person leading family and adult is an additional adult in the household', type: 'factor',
      factors: [{factorName:'Adult',factorColor:3},{factorName:'Child',factorColor:2},
          {factorName:'Householder',factorColor:1},{factorName:'Wife',factorColor:6}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //9
    {category: 'pregnant', pretty_name: 'Pregnant last year', type: 'factor',
      factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //10
    {category: 'quality_description', type: 'factor', pretty_name: 'HCAD house quality',
      factors: [{factorName:'Average',factorColor:3},{factorName:'Good',factorColor:2},
        {factorName:'Excellent',factorColor:1},{factorName:'Poor',factorColor:6},{factorName:"Superior",factorColor:1},{factorName:"Low",factorColor:5}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //11
    {category: 'race', pretty_name: 'race', html_title: 'Self-reported race for census', type: 'factor',
      factors: [{factorName:'white',factorColor:3},{factorName:'asian',factorColor:2},
        {factorName:'black',factorColor:1},{factorName:'hispanic',factorColor:5},{factorName:'other.race',factorColor:4},
        {factorName:'multiracial',factorColor:0}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //12
    {category: 'racial_entropy_index', pretty_name: 'racial entropy', type: 'range', low: -.01, high:-.13, factors:
      [{factorName:'low',factorColor:3},{factorName:'high',factorColor:6}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0,ScaleHeight:1,Mode:"Scatter"},
      //13
    {category: 'sex', type: 'factor', pretty_name: 'gender', factors: [{factorName:'Male',factorColor:5},{factorName:'Female',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //14
    {category: 'stresslevelincome', pretty_name: 'stress by income', type: 'range', low:-2, high:30,
      factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //15
    {category: 'stresslevelrace', pretty_name: 'stress by race', type: 'range', low:-2, high:30,
      factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:'',ScaleHeight:1,Mode:"Scatter"},
      //16
    // {category: 'veteran_status', pretty_name: 'veteran', type: 'factor',
    //   factors: [{factorName:'Nonveteran',factorColor:1},{factorName:'Veteran',factorColor:11}],fnd:'',ScaleHeight:1,Mode:"Scatter"}
    {category: 'veteran_status', pretty_name: 'Preeclampsia', type: 'factor',
      factors: [{factorName:'Nonveteran',factorColor:1},{factorName:'Veteran',factorColor:11}],fnd:'',ScaleHeight:1,Mode:"Scatter"}

];
let ret_cats = [];
list == -1 ?
  ret_cats = cat_list
  :
  list.forEach(cat => {
    ret_cats.push(cat_list[cat]);
  })
return ret_cats
};
