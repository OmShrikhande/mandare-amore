const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend/valentine/out')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Catch-all handler for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/valentine/out/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌹 Valentine server is running on port ${PORT}`);
  console.log(`💝 Open http://localhost:${PORT} in your browser`);
});
