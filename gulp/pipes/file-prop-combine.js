var	gulp = require('gulp')
,	es   = require('event-stream')
,	_    = require('lodash')

module.exports = function(key, properties) {
	return es.map(function(file, callback) {
		file[key] = _.extend({}, file[key]);
		
		_.forEach(properties, function(prop) {
			file[key][prop] = file[prop]
		})

		callback(null, file)
	})		
};


