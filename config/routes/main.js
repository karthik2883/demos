module.exports = function (app, globals, path) {

	var home = require(path.join(globals.paths.controllers, 'home.controller'));
	var about = require(path.join(globals.paths.controllers, 'about.controller'));

	var dantebot = require('../../slack_bots/dantebot');
	var suki = require('../../slack_bots/suki');

	/*
		Define Global View Vars
	 */
	app.use(function (req, res, next) {
		// Expose server vars
		res.locals = {
			static: globals.static
		};
		next();
	});


	/*
		Home
	 */
	app.get('/', home.index);
	app.get('/about', about.stuff);

	/*
		Slack Bots
	 */
	app.post('/dante', dantebot);
	app.get('/dante', dantebot);
	app.post('/suki', suki);
	app.get('/suki', suki);

};