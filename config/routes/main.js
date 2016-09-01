module.exports = function (app, globals, path) {

	var home = require(path.join(globals.paths.controllers, 'home.controller'));
	var about = require(path.join(globals.paths.controllers, 'about.controller'));
	var skills = require(path.join(globals.paths.controllers, 'skills.controller'));
	var alexa = require(path.join(globals.paths.controllers, 'alexa.controller'));

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
	app.post('/projects', home.projects);
	app.post('/tags', home.tags);
	app.get('/about', about.stuff);
	app.get('/skills', skills.index);

	/*
		Slack Bots
	 */
	app.post('/dante', dantebot);
	app.get('/dante', dantebot);
	app.post('/suki', suki);
	app.get('/suki', suki);

	/*
		Alexa
		- endpoints to support my Lambda Storefront app
	 */
	app.get('/api/1.0/user', alexa.getUser);
	app.get('/api/1.0/orders', alexa.getUserOrders);
	app.get('/api/1.0/suppliers.json', alexa.getSupplierByLocation);
	app.get('/api/1.0/offers', alexa.getSpecialOffers);


};
