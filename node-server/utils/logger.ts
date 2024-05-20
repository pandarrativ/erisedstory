import winston from 'winston';

const errorLogPath = process.env.ERROR_LOG_PATH || 'logs/error.log';
const combinedLogPath = process.env.COMBINED_LOG_PATH || 'logs/combined.log';


const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }), 
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    new winston.transports.File({ filename: errorLogPath, level: 'error' }),

    new winston.transports.File({ filename: combinedLogPath })
  ]
});

export default logger;
