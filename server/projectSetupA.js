//https://github.com/arackaf/mongo-graphql-starter
//may also want: https://www.npmjs.com/package/graphql-geojson

import { dataTypes } from "mongo-graphql-starter";
console.log('something')
const {
  MongoIdType,
  MongoIdArrayType,
  StringType,
  StringArrayType,
  BoolType,
  IntType,
  IntArrayType,
  FloatType,
  FloatArrayType,
  DateType,
  arrayOf,
  objectOf,
  formattedDate,
  JSONType,
  typeLiteral
} = dataTypes;

const Constituent = {
  table: "users",
  fields: {
    _id: MongoIdType,
    name: StringType,
    birthday: DateType,
    address: StringType
  }
};

const Denizen = {
  table: "denizens",
  fields: {
    _id: MongoIdType,
    account: StringType,
    household_type: StringType,
    member: StringType,
    size: StringType,
    age: StringType,
    race: StringType,
    school_enrollment: StringType,
    education_attainment: StringType,
    employment: StringType,
    number_of_vehicles: StringType, //change in R/db???
    disability: StringType,
    nativity: StringType,
    english_speaking_skills: StringType,
    citizenship: StringType,
    language_at_home: StringType,
    veteran_status: StringType,
    means_of_transportation_to_work: StringType,
    travel_time_to_work: StringType, //change in R/db??
    household_income: StringType, //change in R/db??
    health_insurance: StringType,
    state: IntType,
    county: IntType,
    tract: StringType, //change in R/db??
    household_id: StringType, //need to change
    hcad_num: StringType, //change in R/db??
    blk_num: StringType, //change in R/db??
    lot_num: StringType, //change in R/db?? - may be string in HCAD??
    condo_flag: StringType, //change in R/db??
    parcel_typ: StringType, //change in R/db??
    curr_owner: StringType, //maybe drop/change in db???
    loc_addr: StringType,
    city: StringType, // isn't there also a named places code for city??
    zip: StringType, //change in R/db??
    loc_num: IntType,
    loc_name: StringType,
    shape_area: FloatType, //need to check!!
    shape_len: FloatType,
    valid: StringType, // change to boolean
    county_2: StringType, //change in R/db??
    tract_2: StringType, //change in R/db??
    use_code: StringType, //change in R/db??
    building_number: StringType, //change in R/db??
    imprv_type: StringType, //change in R/db??
    building_style_code: StringType, //change in R/db??
    class_structure: StringType,
    class_struc_description: StringType,
    depreciation_value: StringType, //change in R/db??
    cama_replacement_cost: StringType, //change in R/db??
    accrued_depr_pct: StringType, //change in R/db??
    quality: StringType,
    quality_description: StringType,
    date_erected: StringType, //change in R/db?? DateType??
    effective_date: StringType, //change in R/db?? DateType??
    yr_remodel: StringType, //change in R/db?? DateType??
    yr_roll: StringType, //change in R/db?? DateType??
    appraised_by: StringType,
    appraised_date: StringType, //DateType??
    note: StringType,
    impr_sq_ft: StringType, //change in R/db??
    actual_area: StringType, //change in R/db??
    heat_area: StringType, //change in R/db??
    gross_area: StringType, //change in R/db??
    effective_area: StringType, //change in R/db??
    base_area: StringType, //change in R/db??
    perimeter: StringType, //change in R/db??
    percent_complete: StringType, //change in R/db??
    nbhd_factor: StringType, //change in R/db??
    rcnld: StringType, //change in R/db??
    size_index: StringType, //change in R/db??
    lump_sum_adj: StringType, //change in R/db??
    noticed_depr_value: StringType, //change in R/db??
    ms_replacement_cost: StringType, //change in R/db??
    category: StringType,
    category_desc: StringType,
    property_name: StringType, //if not NA, is it an apt?
    units: StringType, //change in R/db??
    net_rent_area: StringType, //change in R/db??
    lease_rate: StringType, //change in R/db??
    occupancy: StringType, //change in R/db??
    total_income: StringType, //change in R/db??
    geometry: StringArrayType, //check
    na_dcentroids: StringArrayType, //check and change named
    ptcoords: StringArrayType,
    coords: FloatArrayType
  }
};

// const Subject = {
//   table: "subjects",
//   fields: {
//     _id: MongoIdType,
//     name: StringType
//   }
// };

export default {
  Constituent,
  Denizen
};
