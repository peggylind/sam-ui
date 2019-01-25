
import { Meteor } from 'meteor/meteor'

const SamCitizens = new Mongo.Collection("samcity");

Meteor.publish('samcity',function(pipeline){
  return SamCitizens.find(pipeline);
})
