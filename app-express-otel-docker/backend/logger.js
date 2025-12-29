module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const clientIP = req.ip || req.connection.remoteAddress;
  
  console.log(`🔗 [${timestamp}] ${req.method} ${req.originalUrl} (${clientIP})`);
  
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`   ✅ ${res.statusCode} (${duration}ms)\n`);
  });
  
  next();
};