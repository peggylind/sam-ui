
import { Meteor } from 'meteor/meteor'

const SamCitizens = new Mongo.Collection("samcity");

Meteor.publish('samcity',function(pipeline){
  console.log(JSON.stringify(pipeline))
  var query = pipeline.query
  var fields = pipeline.fields
  return SamCitizens.find(query,{fields:fields});
})
