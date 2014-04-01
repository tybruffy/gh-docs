var gulp        = require('gulp')
,	rename      = require("gulp-rename")
,	less        = require("gulp-less")
,	jekyll      = require("gulp-jekyll")
,	gutil       = require("gulp-util")
,	livereload  = require("gulp-livereload")
,	connect     = require('gulp-connect')
,	request     = require('request')
,	fs          = require('fs')
,	marked      = require('marked')
,	gmarked      = require('gulp-marked')
,	yaml        = require('js-yaml')
,	frontMatter = require('gulp-front-matter')
,	fm          = require('front-matter')
,	es          = require('event-stream')
,	streamifier = require('streamifier')
,   gStreamify  = require('gulp-streamify')
,	download    = require("gulp-download")
,	gulpFilter  = require('gulp-filter');



gulp.task('less', function() {
	gutil.log('compiling less');
	var child = require('child_process').spawn
	,	less  = child('lessc', ['--yui-compress', './assets/less/docs.less', './assets/css/docs.min.css']);
});

gulp.task('jekyll', ['less'], function() {
	gutil.log('building jekyll');
	var child  = require('child_process').spawn
	,	jekyll = child('jekyll', ['build']);
});

gulp.task('serve', connect.server({
	root: ['_site'],
	port: 4000,
}));

gulp.task('watch', function() {
	gulp.watch('./assets/**/*.less', ['less']);
	gulp.watch(['./assets/**/*.*', './_includes/README.md', './**/*.html', '!./_site/**', '!./assets/**/*.less'], ['jekyll']);
});

gulp.task('develop', ['less', 'jekyll', 'watch', 'serve']);

gulp.task('default', ['develop']);


gulp.task('readme', function() {
	var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
	var filter = gulpFilter('index.html');

	download(config.project.readme)
		.pipe(convertMD())
		.pipe(rename("readme.html"))
		.pipe(gulp.dest("./_includes"))
		.pipe(parseReadme())
		.pipe(fileSwitch("./index.html"))
		.pipe(rename("index.bak.html"))
		.pipe(gulp.dest("./"))		
		.pipe(frontMatter({
			remove: true
		}))
		.pipe(addData("sections"))
		.pipe(addFrontMatter())
		.pipe(rename("index.html"))
		.pipe(gulp.dest("./"))
});

convertMD = function() {
	return es.map(function (file, callback) {
		if (file.isBuffer()) {
			var md   = String(file.contents)
			,	html = marked(md, {renderer: renderer})

			file.contents = new Buffer(html)
		}
		callback(null, file)
	})	
};

fileSwitch = function(newFile) {
	return es.map(function (file, callback) {
		
		var text = fs.readFileSync(newFile, {encoding: "utf-8"})
		file.contents = new Buffer(text)

		callback(null, file)
	})	
};

parseReadme = function(sections) {
	return es.map(function (file, callback) {
		var	regex     = /<h[1-6].*id="(.*)">(.*)<\/h[1-6]>/g
		file.sections = []

		while ((matches = regex.exec(file.contents)) !== null) {
			file.sections.push({ slug: matches[1], name: matches[2] })
		}

		callback(null, file)
	})
};

addData = function(key, value) {
	return es.map(function (file, callback) {
		file.frontMatter[key] = file.sections;
		callback(null, file)
	})	
};

addFrontMatter = function(data) {
	return es.map(function (file, callback) {
		var front = yaml.safeDump(file.frontMatter)
		,	text  = file._contents.toString()

		file._contents = new Buffer("---\n" + front + "---\n" + text)
		callback(null, file)
	})	
};

var renderer = new marked.Renderer();
renderer.heading = function (txt, lvl) {
	var escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
	return '<h'+ lvl +' class="page-header" id="'+ escTxt +'">'+ txt +'</h'+ lvl +'>\n';
}

renderer.code = function (code, lang) {
	return "{% highlight " + lang + " %}\n"	+ code + "\n{% endhighlight %}\n";
}