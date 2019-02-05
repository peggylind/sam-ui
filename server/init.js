
import { Meteor } from 'meteor/meteor'

const SamCitizens = new Mongo.Collection("samcity");

Meteor.publish('samcity',function(pipeline){
  console.log(pipeline.query)
  var query = pipeline.query
  //https://github.com/peggylind/DataMaps/blob/peggy_dev/server/livefeed.js
  //LiveData.aggregate(pipeline, { allowDiskUse: true });
  return SamCitizens.find(query);
})
