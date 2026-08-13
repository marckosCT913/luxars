require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const photographersRoutes = require('./routes/photographersRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

let indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8');
indexHtml = indexHtml
  .replace('__SUPABASE_URL__', process.env.SUPABASE_URL || '')
  .replace('__SUPABASE_ANON_KEY__', process.env.SUPABASE_ANON_KEY || '');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/photographers', photographersRoutes);
app.use('/api/bookings', bookingsRoutes);

// 404 JSON para rutas /api no reconocidas
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Ruta de API no encontrada.' });
});

app.use(express.static(PUBLIC_DIR));

app.use((req, res) => {
  res.send(indexHtml);
});

app.listen(PORT, () => {
  console.log('LuxArs corriendo en http://localhost:' + PORT);
});
