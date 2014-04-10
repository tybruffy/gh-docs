var	gulp   = require('gulp')
,	rename = require('gulp-rename')
,	prompt = require('../pipes/config-prompt')


module.exports = function() {
	gulp.src('./_config.yml')
		// .pipe( rename("./_config.bak.yml") )
		// .pipe( gulp.dest("./") )	
		.pipe( prompt() )
};

