var	gulp = require('gulp')
,	es   = require('event-stream')
,	_    = require('lodash')

module.exports = function(key, alt) {
	return es.map(function (file, callback) {
		var heads = alt || "1-6"
		,	regex = new RegExp('<h[' + heads + '].*id="(.*)">(.*)<\/h[' + heads + ']>', "g")

		file[key] = _.isArray(file[key]) ? file[key] : []

		while ((matches = regex.exec(file.contents)) !== null) {
			file[key].push({ slug: matches[1], name: matches[2] })
		}
		callback(null, file)
	})
};