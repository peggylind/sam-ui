//import Description from "../descriptions/descriptions";
import {DataLoader} from 'dataloader';
import SamCitizens from "./sam_citizens";
//import Sam20k from "./sam_20k";

//if we start with starter version, we can try to get count, etc.
//https://www.npmjs.com/package/mongo-graphql-starter
//https://github.com/APIs-guru/graphql-voyager
//will do it only on full_sam, and with nested calls on one_of == 'tenthousands', 'thousands', etc.
//the nested calls made from SamDataForm and combine with $limit

export default {
  Query: {
    //should be able to speed it up by creating an aggregate pipeline, but not sure what I'm doing wrong.
    //  //return await SamCitizens.rawCollection().aggregate(pipeline, options).fetch();

    async samcity(obj, args, { _id }){
      var qdb = {
        coords: {
          $near: {
            $geometry: {
              type: "Point" ,
              coordinates: args.coords
            },
            $maxDistance: args.dist, //in meters
            $minDistance: 10
          }
        },
        one_of:{$gte : args.one_of},
      };
      const factor_vars = ['race','member','citizenship',
        'employment','quality_description','educational_attainment',
        'veteran_status','disability','asthma'];
      const range_vars = ['household_income','age']; //finish later
      for (var arg in args){
        if(factor_vars.indexOf(arg) >=0){
          if(args[arg]){
            console.log(args[arg])
            qdb[arg] = args[arg];
          }
        }
        if(range_vars.indexOf(arg) >=0){
          if(args[arg]){
            qdb[arg] = {$gte : args['bottom_range'],$lte : args['top_range']};
          // and some mechanism for obj with $gte, etc.
          }
        }
      }

    return await SamCitizens.find(
         qdb,
         {limit:args.limit}
       ).fetch();
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
