var	gulp = require('gulp')
,	es   = require('event-stream')

module.exports = function() {
	return es.map(function (file, callback) {
		var	regex     = /<h[1-6].*id="(.*)">(.*)<\/h[1-6]>/g
		file.sections = []

		while ((matches = regex.exec(file.contents)) !== null) {
			file.sections.push({ slug: matches[1], name: matches[2] })
		}
		callback(null, file)
	})
};