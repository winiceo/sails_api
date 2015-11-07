var apidoc = require('gulp-apidoc');
module.exports = function(gulp, plugins, growl) {
	gulp.task('apidoc', function(done){
         apidoc({
             src: "./api/",
             dest: "./assets/doc/"
 
             
          },done);
	});
	 
};