import path from 'path';
import { Buffer } from 'buffer';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { desserts, address } from './data/menu.js';
const port = process.env.PORT || 5000;
import uploadRoute from './routes/uploadRoute.js';
import menuRoute from './routes/menuRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';

globalThis.Buffer = Buffer;

connectDB();

const app = express();
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('API is running...');
//   });

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use('/api/menu', menuRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoute);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use(express.static(process.cwd() + '/frontend/dist'))

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // any route that's not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.get('/api/desserts', (req, res) => {
  res.json(desserts);
});
app.get('/api/address', (req, res) => {
  res.json(address);
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
