import gql from "graphql-tag";

export default samQuery = gql`
  query SamCitizens(
    $account: String,
    $age: Int,
    $asthma: String,
    $autism_by_CRH: String,
    $autism_by_maternal_age: String,
    $bbox_bl:[Float],
    $bbox_ur:[Float],
    $bottom_range: Int,
    $citizenship: String,
    $coords: [Float],
    $disability: String,
    $dist: Float,
    $education_entropy_index: Float,
    $educational_attainment: String,
    $employment: String,
    $english_speaking_skills: String,
    $health_insurance: String,
    $household_id: ID,
    $household_income: Int,
    $household_type: String,
    $limit: Int,
    $loc_num: String,
    $loc_name: String,
    $lowbirthweightbyrace: String,
    $maternal_CRH: FloatwNA,
    $means_of_transportation_to_work: String,
    $member: String,
    $nativity: String,
    $one_of: Int,
    $pregnant: String,
    $prenatal_first_tri: String,
    $quality_description: String,
    $race: String,
    $racial_entropy_index: Float,
    $stresslevelincome: FloatwNA,
    $stresslevelrace: FloatwNA,
    $travel_time_to_work: FloatwNA,
    $top_range: Int,
    $veteran_status: String,
    $zip: String,
    $zip_education_entropy_index: Float,
    $zip_racial_entropy_index: Float
  ) {
    samcity(
      account: $account,
      age: $age,
      asthma: $asthma,
      autism_by_CRH: $autism_by_CRH,
      autism_by_maternal_age: $autism_by_maternal_age,
      bbox_bl:$bbox_bl,
      bbox_ur:$bbox_ur,
      bottom_range: $bottom_range,
      citizenship: $citizenship,
      coords: $coords,
      disability: $disability,
      dist: $dist,
      education_entropy_index: $education_entropy_index,
      educational_attainment: $educational_attainment,
      employment: $employment,
      english_speaking_skills: $english_speaking_skills,
      health_insurance: $health_insurance,
      household_id: $household_id,
      household_income: $household_income,
      household_type: $household_type,
      limit: $limit,
      loc_num: $loc_num,
      loc_name: $loc_name,
      lowbirthweightbyrace: $lowbirthweightbyrace,
      maternal_CRH: $maternal_CRH,
      means_of_transportation_to_work: $means_of_transportation_to_work,
      member: $member,
      nativity: $nativity,
      one_of: $one_of,
      pregnant: $pregnant,
      prenatal_first_tri: $prenatal_first_tri,
      quality_description: $quality_description,
      race: $race,
      racial_entropy_index: $racial_entropy_index,
      stresslevelincome: $stresslevelincome,
      stresslevelrace: $stresslevelrace,
      top_range: $top_range,
      travel_time_to_work: $travel_time_to_work,
      veteran_status: $veteran_status,
      zip: $zip,
      zip_education_entropy_index: $zip_education_entropy_index,
      zip_racial_entropy_index: $zip_racial_entropy_index
    ) {
      account
      age
      asthma
      autism_by_CRH
      autism_by_maternal_age
      bbox_bl
      bbox_ur
      citizenship
      coords
      disability
      education_entropy_index
      educational_attainment
      employment
      english_speaking_skills
      health_insurance
      household_id
      household_income
      household_type
      limit
      loc_num
      loc_name
      lowbirthweightbyrace
      maternal_CRH
      means_of_transportation_to_work
      member
      nativity
      one_of
      pregnant
      prenatal_first_tri
      quality_description
      race
      racial_entropy_index
      stresslevelincome
      stresslevelrace
      travel_time_to_work
      veteran_status
      zip
      zip_education_entropy_index
      zip_racial_entropy_index
    }
  }
`;
