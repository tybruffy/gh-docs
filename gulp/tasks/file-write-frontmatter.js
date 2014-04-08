var	gulp = require('gulp')
,	es   = require('event-stream')
,	yaml = require('js-yaml')


module.export = function(data) {
	return es.map(function (file, callback) {
		var front      = yaml.safeDump(file.frontMatter)
		,	text       = file._contents.toString()
		
		file._contents = new Buffer("---\n" + front + "---\n" + text)

		callback(null, file)
	})	
};
