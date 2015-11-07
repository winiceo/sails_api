module.exports = function (gulp, plugins) {
	gulp.task('api', function (cb) {
		plugins.sequence(
			'apidoc',
			 
			cb
		);
	});
};
