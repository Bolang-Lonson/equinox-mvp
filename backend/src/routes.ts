import { Router } from 'express';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';


const upload = multer({ dest: 'uploads/' });
export const api = Router();

// Local auth: login
api.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    const { rows } = await pool.query('select * from users where email=$1 and provider=$2', [email, 'local']);
    const user = rows[0];
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Set session
    req.login?.(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login failed' });
      res.json({ user: { id: user.id, email: user.email, name: user.name } });
    });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Local auth: signup
api.post('/auth/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const existing = await pool.query('select id from users where email=$1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `insert into users (email, name, password_hash, provider) values ($1, $2, $3, 'local') returning id, email, name` ,
      [email, name, password_hash]
    );
    res.status(201).json({ user: rows[0] });
  } catch (e) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// CRUD: trademarks
api.post('/trademarks', async (req, res) => {
  const { mark_text, owner_id, status, reg_num, classes, filing_date, country } = req.body;
  const { rows } = await pool.query(
    `insert into trademarks (mark_text, owner_id, status, reg_num, classes, filing_date, country)
     values ($1,$2,$3,$4,$5,$6,$7) returning *`,
    [mark_text, owner_id, status, reg_num, classes, filing_date, country],
  );
  res.json(rows[0]);
});

api.put('/trademarks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { mark_text, owner_id, status, reg_num, classes, filing_date, country } = req.body;
  const { rows } = await pool.query(
    `update trademarks set mark_text=$1, owner_id=$2, status=$3, reg_num=$4, classes=$5, filing_date=$6, country=$7 where id=$8 returning *`,
    [mark_text, owner_id, status, reg_num, classes, filing_date, country, id],
  );
  res.json(rows[0]);
});

api.get('/trademarks', async (req, res) => {
  const q = String(req.query.q || '').trim();
  const { rows } = q
    ? await pool.query(
        `select * from trademarks where mark_text ilike $1 or country ilike $1 order by created_at desc limit 100`,
        [`%${q}%`],
      )
    : await pool.query(`select * from trademarks order by created_at desc limit 100`);
  res.json(rows);
});

api.get('/trademarks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await pool.query(`select * from trademarks where id=$1`, [id]);
  res.json(rows[0] || null);
});

// Owners
api.post('/owners', async (req, res) => {
  const { name, contact_email } = req.body;
  const { rows } = await pool.query(`insert into owners (name, contact_email) values ($1,$2) returning *`, [
    name,
    contact_email,
  ]);
  res.json(rows[0]);
});

api.get('/owners', async (_req, res) => {
  const { rows } = await pool.query(`select * from owners order by name asc`);
  res.json(rows);
});

// Docket entries
api.post('/dockets', async (req, res) => {
  const { trademark_id, title, due_date } = req.body;
  const { rows } = await pool.query(
    `insert into docket_entries (trademark_id, title, due_date) values ($1,$2,$3) returning *`,
    [trademark_id, title, due_date],
  );
  res.json(rows[0]);
});

api.get('/dockets', async (req, res) => {
  const trademarkId = req.query.trademark_id ? Number(req.query.trademark_id) : undefined;
  if (trademarkId) {
    const { rows } = await pool.query(`select * from docket_entries where trademark_id=$1 order by due_date`, [
      trademarkId,
    ]);
    return res.json(rows);
  }
  const { rows } = await pool.query(`select * from docket_entries order by due_date`);
  res.json(rows);
});

// Upload document
api.post('/trademarks/:id/documents', upload.single('file'), async (req, res) => {
  const id = Number(req.params.id);
  const file = req.file!;
  const { rows } = await pool.query(
    `insert into documents (trademark_id, filename, original_name, mime_type, size, url)
     values ($1,$2,$3,$4,$5,$6) returning *`,
    [id, file.filename, file.originalname, file.mimetype, file.size, `/uploads/${file.filename}`],
  );
  res.json(rows[0]);
});


