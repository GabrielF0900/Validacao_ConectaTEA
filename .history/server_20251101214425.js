const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Handle all routes by serving index.html (SPA fallback)
app.use((req, res, next) => {
  // If no static file was found, serve index.html
  if (!req.path.includes('.')) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ConectaTEA server running at http://localhost:${PORT}`);
});
