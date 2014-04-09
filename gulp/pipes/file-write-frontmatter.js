var	gulp = require('gulp')
,	es   = require('event-stream')
,	yaml = require('js-yaml')

module.exports = function(key) {
	return es.map(function (file, callback) {
		var front = yaml.safeDump( file[key] )
		,	text  = file._contents.toString()
		
		file._contents = new Buffer("---\n" + front + "---\n" + text)

		callback(null, file)
	})	
};
