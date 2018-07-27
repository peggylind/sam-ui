//import Description from "../descriptions/descriptions";
import {DataLoader} from 'dataloader';
import SamCitizens from "./sam_citizens";
import Sam20k from "./sam_20k";


//https://www.npmjs.com/package/mongo-graphql-starter
//https://github.com/APIs-guru/graphql-voyager
//will do it only on full_sam, and with nested calls on one_of == 'tenthousands', 'thousands', etc.
//the nested calls made from SamDataForm and combine with $limit

export default {
  Query: {
    async samcity(obj, args, { _id }){
      console.log('return in sam_citizens/resolvers')
      //const pipeline =  [ {$sample: { size:1000}} ]
      //const pipeline = [ ... ];
     const options = {  };
     //return await SamCitizens.rawCollection().aggregate(pipeline, options).fetch();
     return await SamCitizens.find( {}, {limit:40} ).fetch();
      //return await SamCitizens.find( {_id: /[0]$/}, {limit:10000} ).fetch();
    },
    async samcity20k(obj, args, { _id }){
      console.log('in async samcity20k '+JSON.stringify(args.limit))
       return await Sam20k.find( {member:args.member}, {limit:args.limit} ).fetch();
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
