import 'module-alias/register';

import app from '@lib/express/app.express';
import configs from '@lib/config/default.config';
import { connectToDatabase } from '@lib/connection/db.connection';
import options from '@lib/config/version.config';
import setupRouters from '@routers/index.router';
/* 
 * Connect to database!
*/
connectToDatabase();
/*
 * Setup Global Router!
*/
setupRouters(app);

app.get('/', (req, res) => {
	res.json(options);
});

/*
 * Global Error Handler!
*/

app.use((err: any, req: any, res: any, next: any) => {
	if (err.name === 'SequelizeDatabaseError' || err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
		switch (err.original?.code) {
			case '23505':
				res.status(403).json({ code: 403, error: `${err.fields[Object.keys(err.fields)[0]]} already present in ${Object.keys(err.fields)[0]}!`, fields: err.fields, details: err.original?.detail });
				break;
			default:
				console.log(err);
				res.status(500).json({ code: 500, error: 'Internal Server Error(Sequelize)', details: err.original?.detail });
		}
	} else {
		next(err);
	}
});


app.use((err: any, req: any, res: any, next: any) => {
	console.log(err);
	res.status(500).json({ code: 500, error: 'Internal Server Error', details: err.original?.detail });
});
/*
 * Start the server!
*/
app.listen(configs.PORT, () => {
	console.log('Server starting at http://localhost:' + configs.PORT);
})
