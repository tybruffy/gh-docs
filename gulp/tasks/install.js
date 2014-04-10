var	gulp   = require('gulp')
,	yaml   = require('js-yaml')
,	fs     = require('fs')
,	prompt = require('gulp-prompt')
// ,	rename = require('gulp-rename')
,	_      = require('lodash')

module.exports = function() {
	gulp.src('./_config.yml')
		.pipe( prompt.prompt(questions, handler) )
};

var questions = [
		{
			type: 'input',
			name: 'project',
			message: 'Project Name:'
		},
		{
			type: 'input',
			name: 'repo',
			message: 'Project Repo (URL):'
		},
		{
			type: 'input',
			name: 'readme',
			message: 'Raw ReadMe URL (defaults to repo/master/README.md):'
		},
		{
			type: 'input',
			name: 'version',
			message: 'Project Version:'
		},
		{
			type: 'input',
			name: 'description',
			message: 'Project Description:'
		},
		{
			type: 'input',
			name: 'author',
			message: 'Author\'s Name:'
		},
		{
			type: 'input',
			name: 'website',
			message: 'Author\'s Website:'
		}
	]

function handler( response) {
	var config  = yaml.safeLoad( fs.readFileSync('./_config.yml', 'utf8') )
	,	answers = getAnsObj( response )
	,	answers = parseAnswers( answers )

	 console.log( _.extend( config, answers ) )
}	

function getAnsObj( response ) {
	var projectKeys = ['project', 'repo', 'readme', 'version', 'description']
	,	authorKeys  = ['author', 'website']
	,	answers     = {};

	for (prop in response) {
		var section       = _.indexOf(projectKeys, prop) != -1 ? "project" : "author"
		,	 key          = prop === section ? "name" : prop;

		answers[section]      = answers[section] || {}
		answers[section][key] = response[prop]
	}
}

