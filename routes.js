const indexRouter = require('./routes/index'),
	apiRouter = require('./routes/api');

module.exports = (app) => {
	app.use('/', indexRouter);
	app.use('/api/v1', apiRouter);
};