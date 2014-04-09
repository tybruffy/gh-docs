var	gulp   = require('gulp')
,	es     = require('event-stream')

module.exports = function(newFile) {
	return es.map(function (file, callback) {
		var text      = fs.readFileSync(newFile, {encoding: "utf-8"})
		file.contents = new Buffer(text)
		callback(null, file)
	})	
};