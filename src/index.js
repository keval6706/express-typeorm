import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import log4js from 'log4js';
import moment from 'moment';
import routerV1 from 'routes/v1';
import { dataSource } from 'db/dataSource';
import compression from 'compression';

// Import Env Variables
dotenv.config();

// Init DB
dataSource
  .initialize()
  .then(() => console.log('DB Connected.:)'))
  .catch((err) => {
    console.log('DB ERR');
    console.log(err);
    process.exit(0);
  });

const app = express();
app.server = http.createServer(app);

// Add Compression
app.use(compression());

app.use(helmet());

// Logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors());

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Server statics
app.use('/public', express.static('public'));

// Routes
app.use('/api/v1', routerV1);

/// catch 404 and forward to 404 page
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'html/404.html'));
});

// Error handler
app.use((error, req, res, next) => {
  // Write log for errors
  log4js.configure({
    appenders: {
      error_log: {
        type: 'file',
        filename: `logs/${moment().format('MM-DD-YYYY')}_error_log.log`,
      },
    },
    categories: { default: { appenders: ['error_log'], level: 'error' } },
  });
  const logger = log4js.getLogger('error_log');
  logger.error(req.body);
  logger.error(error);

  // Send response with error
  res.status(error.status || 500).send({
    ...error,
    success: false,
    status: error.status || 500,
    // eslint-disable-next-line prettier/prettier
    message: error.message || "We're sorry, an unexpected error has occurred.",
  });
});

app.server.listen(process.env.PORT || 4000, () => {
  console.log(`################################################
  🛡️  Server listening on port: ${app.server.address().port} 🛡️
################################################`);
});

export default app;
