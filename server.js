const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;


// Middleware: 靜態檔案目錄
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints: 車型資料
app.get('/api/models', (req, res) => {
  const carDataPath = path.join(__dirname, './data/car_data.json');
  if (fs.existsSync(carDataPath)) {
    const carData = JSON.parse(fs.readFileSync(carDataPath, 'utf-8'));
    res.json(carData);
  } else {
    res.status(404).json({ error: 'Car data not found' });
  }
});

// API Endpoints: 選配資
app.get('/api/options', (req, res) => {
  const optionsDataPath = path.join(__dirname, './data/options.json');
  if (fs.existsSync(optionsDataPath)) {
    const optionsData = JSON.parse(fs.readFileSync(optionsDataPath, 'utf-8'));
    res.json(optionsData);
  } else {
    res.status(404).json({ error: 'Options data not found' });
  }
});

// 預設路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
