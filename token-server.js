/**
 * Design Tokens Server
 * Updates CSS tokens globally across the project
 * Run: node token-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3001;
const CSS_FILE = path.join(__dirname, 'assets/style.css');

// Read CSS file
function readCSSFile() {
  try {
    return fs.readFileSync(CSS_FILE, 'utf8');
  } catch (err) {
    console.error('Error reading CSS file:', err);
    return null;
  }
}

// Write CSS file
function writeCSSFile(content) {
  try {
    fs.writeFileSync(CSS_FILE, content, 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing CSS file:', err);
    return false;
  }
}

// Update a specific token in CSS
function updateToken(tokenName, tokenValue) {
  let cssContent = readCSSFile();
  if (!cssContent) return false;

  // Escape special regex characters in token value
  const escapedValue = tokenValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Find and replace the token
  const regex = new RegExp(`(--${tokenName}:\\s*)([^;]+)(;)`, 'g');
  const updated = cssContent.replace(regex, `$1${tokenValue}$3`);

  // Check if replacement was made
  if (updated !== cssContent) {
    return writeCSSFile(updated);
  }

  return false;
}

// Get all tokens from CSS
function getAllTokens() {
  const cssContent = readCSSFile();
  if (!cssContent) return {};

  const tokens = {};
  const tokenRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;

  while ((match = tokenRegex.exec(cssContent)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim();
  }

  return tokens;
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /api/tokens - Get all tokens
  if (pathname === '/api/tokens' && req.method === 'GET') {
    const tokens = getAllTokens();
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, tokens }));
    return;
  }

  // POST /api/tokens - Update tokens
  if (pathname === '/api/tokens' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { tokens } = data;

        let successCount = 0;
        for (const [tokenName, tokenValue] of Object.entries(tokens)) {
          const cleanName = tokenName.replace(/^--/, '');
          if (updateToken(cleanName, tokenValue)) {
            successCount++;
          }
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          message: `Updated ${successCount} token(s)`,
          updated: successCount,
          total: Object.keys(tokens).length,
        }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: err.message,
        }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ success: false, error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`\n✨ Design Tokens Server running on http://localhost:${PORT}`);
  console.log(`📝 CSS File: ${CSS_FILE}`);
  console.log(`\n📌 API Endpoints:`);
  console.log(`   GET  /api/tokens       - Get all tokens`);
  console.log(`   POST /api/tokens       - Update tokens`);
  console.log(`\nExample update:`);
  console.log(`  curl -X POST http://localhost:${PORT}/api/tokens \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"tokens":{"--brand":"#FF0000"}}'`);
  console.log(`\n`);
});
