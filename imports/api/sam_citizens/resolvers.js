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
    // async samcity2(obj, args, { _id }){
    //   console.log('return in sam_citizens/resolvers')
    //   //const pipeline =  [ {$sample: { size:1000}} ]
    //   //const pipeline = [ ... ];
    //  const options = {  };
    //  //return await SamCitizens.rawCollection().aggregate(pipeline, options).fetch();
    //  return await SamCitizens.find( {}, {limit:4000} ).fetch();
    //   //return await SamCitizens.find( {_id: /[0]$/}, {limit:10000} ).fetch();
    // },
    // async factorlist(obj, args, { _id }){
    //   console.log('in async factolist'+JSON.stringify(args))
    //
    //   // return await SamCitizens.distinct(args.category);
    // },
    async samcity(obj, args, { _id }){
      console.log('in async samcity obj '+JSON.stringify(obj))
      console.log('in async samcity args '+JSON.stringify(args))
       return await SamCitizens.find( {
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
        //  member:args.member,
        //race:args.race
        },
         {limit:args.limit}
       ).fetch();
    }//,
    // async jsonsam(obj, args, { _id }){
    //   return await fetch("/json/one_of100.json");
    // }
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
