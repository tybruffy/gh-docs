var	gulp   = require('gulp')
,	marked = require('marked')
,	es     = require('event-stream')

module.exports = function() {
	var renderer = new marked.Renderer();
	renderer.heading = function (txt, lvl) {
		var escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
		return '<h'+ lvl +' class="page-header" id="'+ escTxt +'">'+ txt +'</h'+ lvl +'>\n';
	}

	renderer.code = function (code, lang) {
		return "{% highlight " + lang + " %}\n"	+ code + "\n{% endhighlight %}\n";
	}

	return es.map(function (file, callback) {
		if (file.isBuffer()) {
			var html      = marked(String(file.contents), {renderer: renderer})
			file.contents = new Buffer(html)
		}
		callback(null, file)
	})		
};