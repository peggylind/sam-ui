export function categories(list) {
  const cat_list = [
    {category: 'none', pretty_name: 'none', type: 'non', low: 0, high:0, factors:
      [{factorName:'none',factorColor:5}],fnd:''},
    {category: 'race', pretty_name: 'race', html_title: 'Self-reported race for census', type: 'factor',
      factors: [{factorName:'white',factorColor:3},{factorName:'asian',factorColor:2},
        {factorName:'black',factorColor:1},{factorName:'hispanic',factorColor:5},{factorName:'other.race',factorColor:4},
        {factorName:'multiracial',factorColor:0}],fnd:''},
    {category: 'educational_attainment', pretty_name: 'education', html_title: 'Self-reported highest level of education', type: 'factor',
      factors: [{factorName:'High School Graduate',factorColor:3},{factorName:'Graduate or Professional Degree',factorColor:2},
        {factorName:"Bachelor's Degree",factorColor:1},{factorName:"Associate's degree",factorColor:5},{factorName:"Some College, no degree",factorColor:5},
        {factorName:"Less than 9th grade",factorColor:1},{factorName:"9th to 12th grade, no diploma",factorColor:5}],fnd:''},
    {category: 'racial_entropy_index', pretty_name: 'racial entropy', type: 'range', low: -.01, high:-.13, factors:
      [{factorName:'low',factorColor:3},{factorName:'high',factorColor:6}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0},
    {category: 'member', pretty_name: 'Family Member',
      html_title: 'Which person in family - householder is the person leading family and adult is an additional adult in the household', type: 'factor',
      factors: [{factorName:'Adult',factorColor:3},{factorName:'Child',factorColor:2},
        {factorName:'Householder',factorColor:1},{factorName:'Wife',factorColor:6}],fnd:''},
    {category: 'household_income', pretty_name: 'income', type: 'range', low: 30000, high:70000, factors:
      [{factorName:'low',factorColor:5},{factorName:'high',factorColor:1}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0},
    // {category: 'sex', type: 'factor', factors: [{factorName:'Male',factorColor:5},{factorName:'Female',factorColor:1}],fnd:''},
    {category: 'age', pretty_name: 'age', type: 'range', low: 0, high:120, factors:
      [{factorName:'low',factorColor:11},{factorName:'high',factorColor:10}],fnd:'',fnd_top_num:100,fnd_bottom_num:0},
    {category: 'employment', pretty_name: 'employment', type: 'factor', factors: [{factorName:'Not in labor force',factorColor:3},{factorName:'Employed',factorColor:2},
      {factorName:'Unemployed',factorColor:1},{factorName:'In Armed Forces',factorColor:6}],fnd:''},
    // {category: 'stresslevelincome', type: 'factor', factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:''},
    // {category: 'quality_description', type: 'factor', factors: [{factorName:'Average',factorColor:3},{factorName:'Good',factorColor:2},
    //   {factorName:'Excellent',factorColor:1},{factorName:'Poor',factorColor:6},{factorName:"Superior",factorColor:1},{factorName:"Low",factorColor:5}],fnd:''},
    {category: 'disability', pretty_name: 'disability', type: 'factor', factors: [{factorName:'No Disabilities',factorColor:3},{factorName:'With One Type of Disability',factorColor:2},
      {factorName:'With Two or More Types of Disabilities',factorColor:1}],fnd:''},
    {category: 'veteran_status', pretty_name: 'veteran', type: 'factor', factors: [{factorName:'Nonveteran',factorColor:1},{factorName:'Veteran',factorColor:11}],fnd:''}

];
let ret_cats = [];
list.forEach(cat => {
  ret_cats.push(cat_list[cat]);
})


return ret_cats
};
