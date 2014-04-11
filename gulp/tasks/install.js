var	gulp   = require('gulp')
,	rename = require('gulp-rename')
,	gutil  = require('gulp-util')
,	prompt = require('gulp-prompt')
,	config = require('../pipes/config-prompt')


module.exports = function() {
	gulp.src('./src/_config.yml')
		.pipe( prompt.confirm("This will overwrite all comments in _config.yml. Continue?") )
		.pipe( rename("_config.bak.yml") )
		.pipe( gulp.dest("./src/") )	
		.pipe( config() )
		.pipe( rename("_config.yml") )
		.pipe( gulp.dest("./src/") )
};

