//import "../imports/startup/client";
import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { render } from "react-dom";
import App from "../imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("app"));
});
