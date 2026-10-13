const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { getDb } = require('./db');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Serve static frontend build
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// Fallback for Single Page App (SPA) in Express 5
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AI-Powered Student Career Guidance System</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f8fafc; padding: 40px; }
          .card { max-width: 600px; margin: 40px auto; background: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #334155; }
          h2 { color: #60a5fa; margin-top: 0; }
          a { color: #38bdf8; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>CareerAI Pro - Autonomous Career Intelligence</h2>
          <p>Global Career Acceleration & Placement Intelligence Platform</p>
          <p>Status: Backend active on Port ${PORT}.</p>
        </div>
      </body>
    </html>
  `);
});

let serverInstance = null;

async function startServer() {
  try {
    console.log('Connecting to database...');
    await getDb();
    console.log('Database connected successfully.');

    serverInstance = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(` CAREERAI PRO - AUTONOMOUS CAREER INTELLIGENCE PLATFORM`);
      console.log(` Production SaaS Edition 2026`);
      console.log(` Server running live at: http://localhost:${PORT}`);
      console.log(` API Health Check:       http://localhost:${PORT}/api/health`);
      console.log(`=======================================================`);
    });
    return serverInstance;
  } catch (err) {
    console.error('Fatal error starting server:', err);
    process.exit(1);
  }
}

// Start if run directly
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
