var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');

gulp.task('default', ['jsbuild']);


gulp.task('jsbuild', function() {
	return browserify({
		entries: ['./lib/js/songplan.js'],
		extensions: ['.jsx','.js'],
		paths: ['./node_modules', './lib/js/'],
		debug:true
	})
	.transform(envify)
	.transform(reactify)
	.bundle()
	.pipe(source('songplan-build.js'))
	.pipe(gulp.dest('.'));
});

gulp.task('watch', ['jsbuild'], function() {
	gulp.watch(['lib/js/*'],['jsbuild']);
});
