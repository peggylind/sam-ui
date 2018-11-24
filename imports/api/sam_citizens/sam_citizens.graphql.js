export default `

scalar FloatwNA

type SamCitizen {
  age: Int
  asthma: String
  autism_by_CRH: String
  autism_by_maternal_age: String
  bbox_bl:[Float]
  bbox_ur:[Float]
  bracket_age: String
  citizenship: String
  coords: [Float]
  date_erected: String
  disability: String
  education_entropy_index: Float
  educational_attainment: String
  employment: String
  english_speaking_skills: String
  health_insurance: String
  household_id: ID!
  household_income: Int
  household_type: String
  individual_id: Int
  language_at_home: String
  limit: Int
  loc_num: String
  loc_name: String
  lowbirthweightbyrace: String
  maternal_CRH: FloatwNA
  means_of_transportation_to_work: String
  member: String
  nativity: String
  one_of: Int
  pregnant: String
  prenatal_first_tri: String
  quality_description: String
  race: String
  racial_entropy_index: Float
  sex: String
  stresslevelincome: FloatwNA
  stresslevelrace: FloatwNA
  travel_time_to_work: FloatwNA
  veteran_status: String
  zip: String
  zip_education_entropy_index: Float
  zip_racial_entropy_index: Float
}

type Factor {
  factorName: [String]
}

type Category {
  categoryName: [String]
}

type FindFactors {
  category: Category
  factor: Factor
}

type count {
  fieldcount:Int
}

type Query {
  samhouse(
    age: Int,
    asthma:String,
    autism_by_maternal_age: String,
    bbox_bl:[Float],
    bbox_ur:[Float],
    bottom_range: Int,
    bracket_age: String,
    citizenship: String,
    coords:[Float],
    disability: String,
    dist:Float,
    education_entropy_index:Float,
    educational_attainment:String,
    employment: String,
    english_speaking_skills: String,
    health_insurance: String,
    household_id: ID,
    household_income: Int,
    household_type: String,
    individual_id: Int,
    limit:Int,
    loc_num:String,
    loc_name:String,
    lowbirthweightbyrace:String,
    maternal_CRH:FloatwNA,
    means_of_transportation_to_work:String,
    member:String,
    nativity: String,
    one_of:Int,
    pregnant:String,
    prenatal_first_tri:String,
    quality_description: String,
    race:String,
    racial_entropy_index: Float,
    sex: String,
    stresslevelincome: FloatwNA,
    stresslevelrace: FloatwNA,
    travel_time_to_work: FloatwNA,
    top_range: Int,
    veteran_status: String,
    zip: String,
    zip_education_entropy_index: Float,
    zip_racial_entropy_index: Float
  ),:[SamCitizen],
  samcity(
      age: Int,
      asthma:String,
      autism_by_maternal_age: String,
      bbox_bl:[Float],
      bbox_ur:[Float],
      bottom_range: Int,
      bracket_age: String,
      citizenship: String,
      coords:[Float],
      disability: String,
      dist:Float,
      education_entropy_index:Float,
      educational_attainment:String,
      employment: String,
      english_speaking_skills: String,
      health_insurance: String,
      household_id: ID,
      household_income: Int,
      household_type: String,
      individual_id: Int,
      limit:Int,
      loc_num:String,
      loc_name:String,
      lowbirthweightbyrace:String,
      maternal_CRH:FloatwNA,
      means_of_transportation_to_work:String,
      member:String,
      nativity: String,
      one_of:Int,
      pregnant:String,
      prenatal_first_tri:String,
      quality_description: String,
      race:String,
      racial_entropy_index: Float,
      sex: String,
      stresslevelincome: FloatwNA,
      stresslevelrace: FloatwNA,
      travel_time_to_work: FloatwNA,
      top_range: Int,
      veteran_status: String,
      zip: String,
      zip_education_entropy_index: Float,
      zip_racial_entropy_index: Float
    ):[SamCitizen],
  factorlist(category:String):[Factor]
}

type Mutation {
  createSamCitizen(name: String!): SamCitizen
}
`;

/*
{
    person (
        filter: {
            age: { GT: 18 },
            name: {
                firstName: { EQ: "John" }
            }
        },
        sort: { age: DESC },
        pagination: { limit: 50 }
    ) {
        name {
            lastName
        }
        age
    }
}
*/
