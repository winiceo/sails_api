/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
 	user_id:{
  	 	type:"integer",
  	 	required:true,
  	 },
  	 type:{
  	 	type:"integer",
  	 },
  	 status:{
  	 	type:"integer"
  	 },
  	 start_time:{
  	 	type:"datetime"
  	 },
  	 end_time:{
  	 	type:"datetime"
  	 },
  	 content:{
  	 	type:"string"
  	 },
  	 address:{
  	 	type:"string"
  	 },
  	 reason:{
  	 	type:"string"
  	 }
  }
};

