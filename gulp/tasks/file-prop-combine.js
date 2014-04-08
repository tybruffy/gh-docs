var	gulp = require('gulp')
,	es   = require('event-stream')

module.export = function(key, value) {
	return es.map(function (file, callback) {
		file.frontMatter[key] = file.sections;
		callback(null, file)
	})		
};