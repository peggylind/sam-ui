//import { createGraphqlSchema } from "mongo-graphql-starter";
//import projectSetup from "./projectSetupA";
//
// import path from "path";
//createGraphqlSchema(projectSetup, '../');
// console.log(path.resolve("./"))
//currently saves to .meteor/local/build/programs/server/

//import "../imports/startup/server";

//import SamCitizens from "/imports/api/sam_citizens/sam_citizens";

import { Meteor } from 'meteor/meteor'

const SamCitizens = new Mongo.Collection("samcity");

// Meteor.methods({
//   async AggregateSam(args) {
//     const pipeline = [ {$match: {one_of:{$gte:1000},'race':'white'}} ];
//     const options = {  };
//     return SamCitizens.rawCollection().aggregate(pipeline, options);
//   },
// });


Meteor.publish('samcity',function(pipeline){
  //console.log(pipeline)
  var pipe = pipeline
  return SamCitizens.find(pipeline);
})
