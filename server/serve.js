// #region Imports
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { readFileSync } from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handler } from './build/handler.js';
// #endregion Imports

// #region Basic Definitions
// Set the working dir
process.chdir(path.dirname(fileURLToPath(import.meta.url)));

// Get the path of the file, starting from the working dir
const getPath = (...pathNames) => path.resolve(process.cwd(), ...pathNames);

// Log to console
const log = (...text) => console.log(new Date().toISOString(), ...text);

// Environment variables
const env = {
	...process.env,
	...dotenv.config({ path: getPath('.env') }).parsed
};
// #endregion Basic Definitions

// #region Listener Options
/**
 * Node Http Server Listener Options
 *
 * @type {import('node:net').ListenOptions}
 */
const httpListenerOptions = {
	port: env.PORT ?? 80,
	host: env.HOST ?? '0.0.0.0'
};

/**
 * Node Https Server Listener Options
 *
 * @type {import('node:net').ListenOptions}
 */
const httpsListenerOptions = {
	port: env.SSL_PORT ?? 443,
	host: env.HOST ?? '0.0.0.0'
};
// #endregion Listener Options

// #region Express Configuration
// Configure Express
const app = express();

// Use CORS middleware
app.use(cors());

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
// #endregion Express Configuration

// #region Server Process
// Create the non-ssl server and apply the listeners
const httpServer = http.createServer(app).listen(httpListenerOptions, () => {
	const addr = httpServer.address();
	log(`HTTP Server started on http://${addr.address}:${addr.port}`);
});

// Create the ssl enabled server and apply the listeners
const httpsServer = https
	.createServer(
		{
			key: readFileSync(env.SSL_KEY_FILE ?? getPath('private.key.pem')),
			cert: readFileSync(env.SSL_CERT_FILE ?? getPath('domain.cert.pem'))
		},
		app
	)
	.listen(httpsListenerOptions, () => {
		const addr = httpsServer.address();
		log(`HTTPS Server started on https://${addr.address}:${addr.port}`);
	});
// #endregion Server Process
