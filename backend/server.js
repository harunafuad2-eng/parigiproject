require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk mem-parsing body request JSON

// Route dasar untuk tes
app.get('/', (req, res) => {
  res.send('Hello World! Server backend berjalan dan terhubung ke Supabase.');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server backend mendengarkan di http://localhost:${port}`);
});
