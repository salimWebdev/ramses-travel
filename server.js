import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ramses-travel-secret-2024';

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
fs.existsSync(DATA_DIR) || fs.mkdirSync(DATA_DIR, { recursive: true });

const UPLOADS_DIR = path.join(__dirname, 'uploads');
fs.existsSync(UPLOADS_DIR) || fs.mkdirSync(UPLOADS_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: (req, file, cb) => { if (/^image\//.test(file.mimetype)) cb(null, true); else cb(new Error('Seules les images sont acceptées')); } });

const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10);

function readJSON(file) {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, '[]');
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(h.split(' ')[1], JWT_SECRET);
    next();
  } catch { return res.status(401).json({ error: 'Invalid token' }); }
}

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (!bcrypt.compareSync(password, ADMIN_PASSWORD_HASH))
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

app.get('/api/destinations', (req, res) => res.json(readJSON('destinations.json')));
app.post('/api/destinations', auth, (req, res) => {
  const data = readJSON('destinations.json');
  const d = { id: Date.now().toString(), ...req.body };
  data.push(d);
  writeJSON('destinations.json', data);
  res.json(d);
});
app.put('/api/destinations/:id', auth, (req, res) => {
  let data = readJSON('destinations.json');
  const idx = data.findIndex(d => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data[idx] = { ...data[idx], ...req.body, id: req.params.id };
  writeJSON('destinations.json', data);
  res.json(data[idx]);
});
app.delete('/api/destinations/:id', auth, (req, res) => {
  let data = readJSON('destinations.json');
  data = data.filter(d => d.id !== req.params.id);
  writeJSON('destinations.json', data);
  res.json({ ok: true });
});

app.get('/api/contacts', auth, (req, res) => res.json(readJSON('contacts.json')));
app.delete('/api/contacts/:id', auth, (req, res) => {
  let data = readJSON('contacts.json');
  data = data.filter(c => c.id !== req.params.id);
  writeJSON('contacts.json', data);
  res.json({ ok: true });
});
app.post('/api/contact', (req, res) => {
  const data = readJSON('contacts.json');
  const c = { id: Date.now().toString(), date: new Date().toISOString(), ...req.body };
  data.unshift(c);
  writeJSON('contacts.json', data);
  res.json({ ok: true });
});

app.get('/api/reviews', (req, res) => res.json(readJSON('reviews.json')));
app.post('/api/reviews', auth, (req, res) => {
  const data = readJSON('reviews.json');
  const r = { id: Date.now().toString(), date: new Date().toISOString(), source: 'manual', ...req.body };
  data.unshift(r);
  writeJSON('reviews.json', data);
  res.json(r);
});
app.put('/api/reviews/:id', auth, (req, res) => {
  let data = readJSON('reviews.json');
  const idx = data.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data[idx] = { ...data[idx], ...req.body, id: req.params.id };
  writeJSON('reviews.json', data);
  res.json(data[idx]);
});
app.delete('/api/reviews/:id', auth, (req, res) => {
  let data = readJSON('reviews.json');
  data = data.filter(r => r.id !== req.params.id);
  writeJSON('reviews.json', data);
  res.json({ ok: true });
});

app.get('/api/reviews/config', auth, (req, res) => {
  const cfg = readJSON('reviews_config.json');
  res.json(cfg);
});
app.post('/api/reviews/config', auth, (req, res) => {
  writeJSON('reviews_config.json', req.body);
  res.json({ ok: true });
});

app.post('/api/reviews/sync', auth, async (req, res) => {
  try {
    const cfg = readJSON('reviews_config.json');
    if (!cfg.placeId || !cfg.apiKey) return res.status(400).json({ error: 'Place ID et API Key requis' });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(cfg.placeId)}&fields=reviews,rating,user_ratings_total&language=fr&key=${cfg.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== 'OK') return res.status(400).json({ error: `Google API: ${data.status}` });
    const existing = readJSON('reviews.json');
    const existingIds = new Set(existing.map(r => r.googleReviewId).filter(Boolean));
    const googleReviews = (data.result.reviews || [])
      .filter(r => !existingIds.has(r.time.toString()))
      .map(r => ({
        id: 'g-' + r.time,
        googleReviewId: r.time.toString(),
        name: r.author_name,
        text: r.text,
        rating: r.rating,
        profilePhoto: r.profile_photo_url,
        time: r.time,
        source: 'google',
        date: new Date(r.time * 1000).toISOString(),
      }));
    const merged = [...googleReviews, ...existing];
    writeJSON('reviews.json', merged);
    res.json({ ok: true, synced: googleReviews.length, total: merged.length, rating: data.result.rating, totalRatings: data.result.user_ratings_total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/organized-destinations', (req, res) => res.json(readJSON('organized-destinations.json')));
app.post('/api/organized-destinations', auth, (req, res) => {
  const data = readJSON('organized-destinations.json');
  const d = { id: Date.now().toString(), ...req.body };
  data.unshift(d);
  writeJSON('organized-destinations.json', data);
  res.json(d);
});
app.put('/api/organized-destinations/:id', auth, (req, res) => {
  let data = readJSON('organized-destinations.json');
  const idx = data.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data[idx] = { ...data[idx], ...req.body, id: req.params.id };
  writeJSON('organized-destinations.json', data);
  res.json(data[idx]);
});
app.delete('/api/organized-destinations/:id', auth, (req, res) => {
  let data = readJSON('organized-destinations.json');
  data = data.filter(x => x.id !== req.params.id);
  writeJSON('organized-destinations.json', data);
  res.json({ ok: true });
});

app.get('/admin', (_, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')));
app.get('/admin/*', (_, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
