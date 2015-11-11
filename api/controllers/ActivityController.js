/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var sid = require('shortid');
var fs = require('fs');
var mkdirp = require('mkdirp');
 
var path = require('path');
//var io = require('socket.io');

var UPLOAD_PATH = process.cwd() + '/assets/upload';

// Setup id generator
sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
sid.seed(42);

function safeFilename(name) {
  name = name.replace(/ /g, '-');
  name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
  name = name.replace(/\.+/g, '.');
  name = name.replace(/-+/g, '-');
  name = name.replace(/_+/g, '_');
  return name;
}

function fileMinusExt(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}

function fileExtension(fileName) {
  return fileName.split('.').slice(-1);
}

// Where you would do your processing, etc
// Stubbed out for now
function processImage(id, name, path, cb) {
  console.log('Processing image');

  cb(null, {
    'result': 'success',
    'id': id,
    'name': name,
    'path': path
  });
}


module.exports = {
  create: function (req, res) {
  	res.setTimeout(0);
    var uploadOptions = {
        dirname: process.cwd() + '/assets/upload/', 
        
    }
    req.file('files').upload(uploadOptions,function (err, files) {
      
      if (err)
        return res.serverError(err);
      var imgs=[]
      files.map(function(file){
        imgs.push(file.filename)

      })
      var data=req.params.all();
      data["imgs"]=imgs;
      Activity.create(data).then(res.created)
      .catch(res.serverError);
      
    });

  },
  query:function(req,res){

		 Activity.findOne({where: {code: req.param('code'),event_id:req.param('event_id')}})
            .exec(function (err, obj) {

                if (err) return res.fail(err);
                if (!obj) return res.fail('', 1, '记录不存在');
                res.success(obj);
            })
	},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GifController)
   */
  _config: {}
};
 