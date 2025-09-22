import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import connectPgSimple from 'connect-pg-simple';
import { initSchema, pool } from './db';
import { api } from './routes';

const app = express();
app.use(
  cors({
    origin: process.env.APP_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());

// Session store
const PgStore = connectPgSimple(session);
app.use(
  session({
    store: new PgStore({ pool, tableName: 'session', createTableIfMissing: true } as any),
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  }),
);

// Passport config
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: number, done) => {
  try {
    const { rows } = await pool.query('select * from users where id=$1', [id]);
    done(null, rows[0] || null);
  } catch (e) {
    done(e);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const providerId = profile.id;
          const name = profile.displayName;
          const avatar = profile.photos?.[0]?.value;
          const result = await pool.query(
            `insert into users (email, name, avatar_url, provider, provider_id)
             values ($1,$2,$3,'google',$4)
             on conflict (email) do update set name=excluded.name, avatar_url=excluded.avatar_url, provider_id=excluded.provider_id
             returning *`,
            [email, name, avatar, providerId],
          );
          return done(null, result.rows[0]);
        } catch (e) {
          return done(e as any);
        }
      },
    ),
  );
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Hello there!', time: new Date().toISOString() });
});

app.use('/api', api);
app.use('/uploads', express.static('uploads'));

// Auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (_req, res) => res.redirect(process.env.APP_URL || 'http://localhost:5173/dashboard'),
);
app.get('/auth/me', (req, res) => {
  const user = (req as any).user || null;
  res.json({ user });
});
app.post('/auth/logout', (req, res) => {
  req.logout?.(() => res.json({ ok: true }));
});

const port = Number(process.env.PORT) || 4000;
initSchema()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('DB init failed', e);
    process.exit(1);
  });

export default app;

