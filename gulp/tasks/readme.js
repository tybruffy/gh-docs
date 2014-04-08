var	gulp           = require( 'gulp' )
,	yaml           = require( 'js-yaml' )
,	fs             = require('fs')
,	download       = require("gulp-download")
,	mdConvert      = require( __dirname+'/md-convert' )
,	rename         = require( 'gulp-rename' )
,	pullHeaders    = require( __dirname+'/pull-header-data' )
,	fileSwap       = require( __dirname+'/file-content-swap' )
,	frontMatter    = require( 'gulp-front-matter' )
,	addData        = require( __dirname+'/file-prop-combine' )
,	addFrontMatter = require( __dirname+'/file-write-frontmatter' )

console.log( mdConvert )

module.exports = function() {
	// var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

	// download(config.project.readme)
	// 	.pipe( mdConvert() )
	// 	.pipe( rename("readme.html") )
	// 	.pipe( gulp.dest("./_includes") )
	// 	.pipe( pullHeaders() )

	// .pipe( fileSwap("./index.html") )
	// 	.pipe( rename("index.bak.html") )
	// 	.pipe( gulp.dest("./") )	

	// .pipe( frontMatter({
	// 		remove: true
	// 	}) )
	// 	.pipe( addData("sections") )
	// 	.pipe( addFrontMatter() )
	// 	.pipe( rename("index.html") )
	// 	.pipe( gulp.dest("./") )
};