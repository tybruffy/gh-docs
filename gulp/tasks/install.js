var	gulp   = require('gulp')
,	yaml   = require('js-yaml')
,	fs     = require('fs')
,	prompt = require('gulp-prompt')
// ,	rename = require('gulp-rename')
,	_      = require('lodash')

module.exports = function() {
	gulp.src('./_config.yml')
		.pipe(prompt.prompt([{
			type: 'input',
			name: 'project.name',
			message: 'Project Name:'
		},
		{
			type: 'input',
			name: 'project.repo',
			message: 'Project Repo (URL):'
		},
		{
			type: 'input',
			name: 'project.readme',
			message: 'Raw ReadMe URL (defaults to repo/master/README.md):'
		},
		{
			type: 'input',
			name: 'project.version',
			message: 'Project Version:'
		},
		{
			type: 'input',
			name: 'project.description',
			message: 'Project Description:'
		},
		{
			type: 'input',
			name: 'author.name',
			message: 'Author\'s Name:'
		},
		{
			type: 'input',
			name: 'author.website',
			message: 'Author\'s Website:'
		}], function( response ) {
			var config = yaml.safeLoad( fs.readFileSync('./_config.yml', 'utf8') )	
			, 	data   = yaml.safeDump( _.extend( response, config ) )

			console.log( _.extend( response, config ) )
		}));


};