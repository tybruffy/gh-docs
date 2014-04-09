var	gulp           = require('gulp')
,	yaml           = require('js-yaml')
,	fs             = require('fs')
,	frontMatter    = require('gulp-front-matter')
,	rename         = require('gulp-rename')
,	download       = require('gulp-download')
,	mdConvert      = require('../pipes/md-convert')
,	pullHeaders    = require('../pipes/pull-header-data')
,	fileSwap       = require('../pipes/file-content-swap')
,	addData        = require('../pipes/file-prop-combine')
,	addFrontMatter = require('../pipes/file-write-frontmatter')

module.exports = function() {
	var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

	download(config.project.readme)
		.pipe( mdConvert() )
		.pipe( rename("readme.html") )
		.pipe( gulp.dest("./_includes") )
		.pipe( pullHeaders() )

	.pipe( fileSwap("./index.html") )
		.pipe( rename("index.bak.html") )
		.pipe( gulp.dest("./") )	

	.pipe( frontMatter({
			remove: true
		}) )
		.pipe( addData("sections") )
		.pipe( addFrontMatter() )
		.pipe( rename("index.html") )
		.pipe( gulp.dest("./") )
};