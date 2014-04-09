var	gulp         = require('gulp')
,	yaml         = require('js-yaml')
,	fs           = require('fs')
,	frontMatter  = require('gulp-front-matter')
,	rename       = require('gulp-rename')
,	download     = require('gulp-download')
,	mdConvert    = require('../pipes/md-convert')
,	pullHeadings = require('../pipes/pull-header-data')
,	fileSwap     = require('../pipes/file-content-swap')
,	combineProps = require('../pipes/file-prop-combine')
,	writeFM      = require('../pipes/file-write-frontmatter')

module.exports = function() {
	var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

	download(config.project.readme)
		.pipe( mdConvert() )
		.pipe( rename("./readme.html") )
		.pipe( gulp.dest("./_includes") )
		.pipe( pullHeadings("sections", "2-6") )

	.pipe( fileSwap("./index.html") )
		.pipe( rename("./index.bak.html") )
		.pipe( gulp.dest("./") )	

	.pipe( frontMatter({ remove: true }) )
		.pipe( combineProps("frontMatter", ["sections"]) )
		.pipe( writeFM("frontMatter") )
		.pipe( rename("index.html") )
		.pipe( gulp.dest("./") )
};