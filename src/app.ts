// src/app.ts
import express from 'express';
import { PORT } from './config';
import paymentRoutes from './routes/paymentRoutes';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/payment', paymentRoutes);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/config', (req, res) => {
  res.json({ clientKey: process.env.CLIENT_KEY });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));