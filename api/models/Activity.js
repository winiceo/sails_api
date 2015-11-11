/**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	 code:{
  	 	type:'string'
  	 },
  	 name:{
  	 	type:"string"
  	 },
     event_id:{
      type:"string"
     },
  	 tel:{
  	 	type:"string"
  	 },
  	 imgs:{
  	 	type:"json"
  	 }
  }
};

