// middlewares/logger.js
const logger = (req, res, next) => {
    const currentDate = new Date().toISOString();
    console.log(`[${currentDate}] ${req.method} ${req.originalUrl}`);
    next();
  };
  
  module.exports = logger;
  