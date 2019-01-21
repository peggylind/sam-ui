import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor'

const SamCitizens = new Mongo.Collection("samcity");


//console.log(SamCitizens.findOne())
export default SamCitizens;
