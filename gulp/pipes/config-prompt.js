var	gulp     = require('gulp')
,	es       = require('event-stream')
,	inquirer = require('inquirer')
,	yaml     = require('js-yaml')
,	_        = require('lodash')
,	fs       = require('fs')

module.exports = function() {
	return es.map(function(file, cb){
		inquirer.prompt(questions, function(answers){

			var config  = yaml.safeLoad( file._contents.toString() )
			,	answers = parseAnswers(answers)
			,	answers = getAnsObj(answers)
			,	content = yaml.safeDump( _.merge( config, answers ) );

			// console.log( new Buffer(content) )
			file._contents = new Buffer(content)

			cb(null, file);
		});
	});
};

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

	return answers;
}

function parseAnswers( answers ) {
	for (prop in answers) {
		if (answers[prop] === '') {
			delete answers[prop];
		} else {
			answers[prop] = filterProp( prop, answers )
		}
	}

	return answers;
}

function filterProp( prop, answers ) {
	switch (prop) {
		case 'readme':
			if (answers.readme == 'default' && answers.repo) {
				return 'https://raw.githubusercontent.com' + answers.repo + 'master/README.md'
			}
		break;
		default:
			return answers[prop];
		break;
	}
}

var questions = [
	{
		type: 'input',
		name: 'project',
		message: 'Project Name:'
	},
	{
		type: 'input',
		name: 'repo',
		message: 'Project Repo (/username/repo/):',
		validate: function(ans) {
			return (ans.charAt(0) == "/" && ans.charAt(ans.length-1) == "/") || ans == "";
		}
	},
	{
		type: 'input',
		name: 'readme',
		message: 'Raw ReadMe URL (\'default\' for repo/master/README.md):'
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