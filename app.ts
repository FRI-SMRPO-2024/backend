import express from 'express';
import http from 'http';
import logger from './src/utils/winston-logger'

const cors = require('cors');
const schedule = require('node-schedule');
const app = express();
const errorHandler = require('errorhandler')

require('dotenv').config()

const APP_HTTP_PORT = process.env.APP_HTTP_PORT || '';
const FRONTEND_CORS_URL = process.env.FRONTEND_CORS_URL || '';

app.use(errorHandler({ dumpExceptions: true, showStack: true })); 
app.use(cors({origin: FRONTEND_CORS_URL, credentials: true}))
app.use(express.json());
// app.use('/api', );

http.createServer(app).listen(APP_HTTP_PORT, function() {
    console.log(`App is listening on port ${APP_HTTP_PORT} (http)`)
}).on('error', function(error: Error) {
    console.log(`Error in http server startup: ${error.message}`);
});