const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para produção
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Handle all other routes by serving index.html (SPA fallback)
app.use((req, res, next) => {
  // Se não é um arquivo estático, serve o index.html
  if (!req.path.includes('.') && req.method === 'GET') {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ConectaTEA server running at http://localhost:${PORT}`);
});
