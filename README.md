# SAM UI 

The following instructions are for developers who want to setup their own version. This is a [meteor](https://www.meteor.com/) based framework.

## Prerequisites

* We are running with a local [MongoDB](https://docs.mongodb.org/manual/installation/)

to install e.g on Mac OS install via [homebrew](http://brew.sh/):

`brew install mongodb`

* [meteor](https://www.meteor.com/install)

to install e.g. on Mac OS or Linux:

`curl https://install.meteor.com/ | sh`

* [npm](https://www.npmjs.com/get-npm)


## Getting started

A) Clone or fork and run: `meteor npm install` This will install all necessary npm packages.
B) Start up your MongoDB instance by running: `mongod`. 

Import data (e.g. `sam_export`) into your MongoDB instance. When using the database export files as provided by DASH you won't have to manually configure anything.


## Testing in local development environment

`MONGO_URL=mongodb://localhost:27017/Samcity meteor`

This will install more metor packages, connect the meteor app to your local MongoDB instance and deploy the app.

Then you can open a browser and access the app at: http://localhost:3000

## Deployment with PM2

* change into the working directory and run `meteor build ..` - this will generate a *.tar .gz file
* move the file to the install location and extract it (you will end up with a `bundle` directory
* `cd bundle/programs/server/` and `npm install`
* generate a configuration file for PM2 (see example [gist](https://gist.github.com/fcbee3b520b4fdf97552.git)) outside of bundle
* run `pm2 start [your_pm2_conf_file] --node-args="--max_old_space_size=6144"`

