const express = require("express");
const path = require("path");
const prisma = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

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

// API Routes
// POST /api/click - Registrar um clique
app.post('/api/click', async (req, res) => {
  try {
    const { key, type } = req.body;
    
    if (!key || !type) {
      return res.status(400).json({ error: 'Key and type are required' });
    }

    if (!['feature', 'pricing'].includes(type)) {
      return res.status(400).json({ error: 'Type must be "feature" or "pricing"' });
    }

    // Upsert: incrementa se existe, cria se não existe
    const click = await prisma.click.upsert({
      where: {
        type_key: {
          type: type,
          key: key
        }
      },
      update: {
        count: {
          increment: 1
        }
      },
      create: {
        key: key,
        type: type,
        count: 1
      }
    });

    res.json({ success: true, click });
  } catch (error) {
    console.error('Error recording click:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/clicks - Listar todos os cliques
app.get('/api/clicks', async (req, res) => {
  try {
    const clicks = await prisma.click.findMany({
      orderBy: [
        { type: 'asc' },
        { key: 'asc' }
      ]
    });

    // Organizar os dados no mesmo formato do localStorage
    const organized = clicks.reduce((acc, click) => {
      if (!acc[click.type]) {
        acc[click.type] = {};
      }
      acc[click.type][click.key] = click.count;
      return acc;
    }, {});

    res.json({
      success: true,
      clicks: organized,
      raw: clicks
    });
  } catch (error) {
    console.error('Error fetching clicks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/form - Salvar submissão do formulário
app.post('/api/form', async (req, res) => {
  try {
    const formData = req.body;
    
    const submission = await prisma.formSubmission.create({
      data: {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        age: formData.age,
        tools: formData.tools,
        toolsOther: formData.toolsOther,
        features: JSON.stringify(formData.features || []),
        featuresOther: formData.featuresOther,
        price: formData.price,
        beta: formData.beta
      }
    });

    res.json({ success: true, submission });
  } catch (error) {
    console.error('Error saving form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle all other routes by serving index.html (SPA fallback)
app.use((req, res, next) => {
  // Se não é um arquivo estático, serve o index.html
  if (!req.path.includes(".") && req.method === "GET") {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ConectaTEA server running at http://localhost:${PORT}`);
});
