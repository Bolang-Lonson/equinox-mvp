import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

export const pool = new Pool(
  databaseUrl
    ? { connectionString: databaseUrl }
    : {
        host: process.env.PGHOST || 'localhost',
        port: Number(process.env.PGPORT || 5432),
        database: process.env.PGDATABASE || 'equinox',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
      },
);

export async function initSchema(): Promise<void> {
  // Create tables if they don't exist
  await pool.query(`
    create table if not exists users (
      id serial primary key,
      email text unique not null,
      name text,
      avatar_url text,
      provider text,
      provider_id text,
      created_at timestamptz default now()
    );

    create table if not exists roles (
      id serial primary key,
      name text unique not null
    );

    create table if not exists user_roles (
      user_id integer references users(id) on delete cascade,
      role_id integer references roles(id) on delete cascade,
      primary key (user_id, role_id)
    );

    create table if not exists owners (
      id serial primary key,
      name text not null,
      contact_email text,
      created_at timestamptz default now()
    );

    create table if not exists trademarks (
      id serial primary key,
      mark_text text not null,
      owner_id integer references owners(id) on delete set null,
      status text,
      reg_num text,
      classes text,
      filing_date date,
      country text,
      created_at timestamptz default now()
    );

    create table if not exists documents (
      id serial primary key,
      trademark_id integer references trademarks(id) on delete cascade,
      filename text not null,
      original_name text,
      mime_type text,
      size integer,
      url text,
      created_at timestamptz default now()
    );

    create table if not exists docket_entries (
      id serial primary key,
      trademark_id integer references trademarks(id) on delete cascade,
      title text not null,
      due_date date,
      completed boolean default false,
      created_at timestamptz default now()
    );
  `);
}


