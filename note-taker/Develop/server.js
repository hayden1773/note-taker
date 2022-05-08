const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');
const PORT = process.env.port || 3001;
const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes'))
);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);