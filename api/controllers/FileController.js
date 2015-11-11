/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="/v1/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="ok" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
     var uploadOptions = {
        dirname: process.cwd() + '/assets/upload/',
         
         
        
    }
    req.file('avatar').upload(uploadOptions,function (err, files) {
      console.log(req.param("ok"))
      if (err)
        return res.serverError(err);

      return res.json({
        text:req.param("text"),
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }

};

