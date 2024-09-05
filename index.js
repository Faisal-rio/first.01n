require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const folderPath = path.join(__dirname, 'files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
  const timestamp = new Date();
  const filename = `${timestamp.toISOString().split('T')[0]}-${timestamp.toLocaleTimeString().replace(/:/g, '-')}.txt`;
  const filepath = path.join(folderPath, filename);

  fs.writeFileSync(filepath, timestamp.toString(), 'utf8');
  res.send(`File created: ${filename}`);
});

// API to retrieve all text files in the folder
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
