//import Description from "../descriptions/descriptions";
//import {DataLoader} from 'dataloader';
import SamCitizens from "./sam_citizens";
//import Sam20k from "./sam_20k";

//if we start with starter version, we can try to get count, etc.
//https://www.npmjs.com/package/mongo-graphql-starter
//https://github.com/APIs-guru/graphql-voyager
//will do it only on full_sam, and with nested calls on one_of == 'tenthousands', 'thousands', etc.
//the nested calls made from SamDataForm and combine with $limit
const factor_vars = [//add use_code from HCAD - B1 gives all renters //love to get this working with an automated pipeline for all the gql
  'asthma',
  'autism_by_CRH',
  'autism_by_maternal_age',
  'citizenship',
  'disability',
  'educational_attainment',
  'employment',
  'english_speaking_skills',
  'health_insurance',
  'household_type',
  'loc_num',
  'loc_name',
  'lowbirthweightbyrace',
  'maternal_CRH',
  'means_of_transportation_to_work',
  'member',
  'nativity',
  'one_of',
  'pregnant',
  'prenatal_first_tri',
  'quality_description',
  'race',
  'travel_time_to_work',
  'veteran_status',
  'zip'
];
const range_vars = [
  'age',
  'education_entropy_index',
  'household_income',
  'racial_entropy_index',
  'stresslevelincome',
  'stresslevelrace',
  'zip_education_entropy_index',
  'zip_racial_entropy_index'
  ]; //finish later

export default {

  Query: {
    //should be able to speed it up by creating an aggregate pipeline, but not sure what I'm doing wrong.
    //  //return await SamCitizens.rawCollection().aggregate(pipeline, options).fetch();
//use toShow for potential fields/factors
//have to make sure they're only factors somehow
    //https://stackoverflow.com/questions/15259493/listing-counting-factors-of-unique-mongo-db-values-over-all-keys
    async samhouse(obj, args, { _id }){
      const rtn = await SamCitizens.find(
           {account:args.account}
         )//.sort({
            // "household_id" : 1,
            // "member" : 1
     //})//.fetch();
      return rtn
    },
//can we get args from new apollo client more flexibly??
    async samcity(obj, args, { _id }){
      // console.log('args: '+JSON.stringify(args))
      // console.log('obj: '+JSON.stringify(obj))
      // console.log('parent: '+parent)
      // console.log('context: '+context)
      // console.log('info: '+info)
      var qdbNear = {
        coords: {
          $near: {
            $geometry: {
              type: "Point" ,
              coordinates: args.coords
            },
            $maxDistance: args.dist//, //in meters
            //$minDistance: 10
          }
        },
        one_of:{$gte : args.one_of},
      };
//looks like geowithin is slower than geonear....
      var qdb = {
        coords: {
          $geoWithin: {
            $box: [args.bbox_bl,args.bbox_ur] //needs [[bottom-left],[upper-right]]
          }
        },
        one_of:{$gte : args.one_of}
      };
      for (var arg in args){
        if(factor_vars.indexOf(arg) >=0){
          if(args[arg]){
            qdb[arg] = args[arg];
          }
        };
        if(range_vars.indexOf(arg) >=0){
          if(args[arg]){
            console.log("args['bottom_range']" + args['bottom_range'])
            //qdb[arg] = {$gte : args['bottom_range'],$lte : args['top_range']};
          // and some mechanism for obj with $gte, etc.
          }
        };
      };
    const rtn = await SamCitizens.find(
         qdb//,
  //       {limit:args.limit}
       ).fetch();

    return rtn
    }
  },

  FloatwNA : {
    __parseLiteral(ast) {
        if (ast.kind === Kind.FLOAT) {
          return parseFloat(ast.value); // ast value is always in string format
        }
        return null;
      }
  },

  SamCitizen: {
  },

  Mutation: {
    createSamCitizen(obj, { name }, { userId }) {
      if (userId) {
        const SamCitizenId = SamCitizens.insert({
          name,
          userId
        });
        return SamCitizens.findOne(SamCitizenId);
      }
      throw new Error("Unauthortized");
    }
  }
};
