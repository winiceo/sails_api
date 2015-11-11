var apidoc = require('gulp-apidoc');
//var browserify = require('gulp-browserify');
var path=require("path")
 
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

//express = require('express'),
//app = express(),
pubDir = path.join(process.cwd(), 'assets', 'client'),
module.exports = function(gulp, plugins, growl) {
	gulp.task('apidoc', function(done){
         apidoc({
             src: "./api/",
             dest: "./assets/doc/"
 
             
          },done);
	});
	 

	 gulp.task('browserify', function () {
	  return gulp.src(['./assets/js/app.js'])
	   .pipe(browserify())
	   //.pipe(uglify())
	   .pipe(gulp.dest('./assets'));
	});
	// // Basic usage 
	// gulp.task('scripts', function() {
	//     // Single entry point to browserify 
	//     gulp.src(path.join(pubDir, 'js', 'app.js'))
	//         .pipe(browserify({
	//           insertGlobals : true,
	//           debug : !gulp.env.production
	//         }))
	//         .pipe(gulp.dest('./assets/'))
	// });
	 
};