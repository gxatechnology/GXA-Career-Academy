import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory and SQLite storage path
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'gxa_academy.sqlite');

let dbInstance: Database | null = null;
let saveDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Persist the in-memory SQLite database state to disk synchronously or debounced.
 */
export function persistDatabase(): void {
  if (!dbInstance) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.error('[DB Persistence Error] Failed to flush SQLite to disk:', err);
  }
}

/**
 * Schedule a debounced flush to disk (within 100ms) to ensure durability without excessive IO overhead.
 */
export function schedulePersist(): void {
  if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(() => {
    persistDatabase();
    saveDebounceTimer = null;
  }, 100);
}

/**
 * Initialize persistent database and execute migrations.
 */
export async function getDatabase(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const fileBuffer = fs.readFileSync(DB_FILE);
      dbInstance = new SQL.Database(fileBuffer);
      console.log(`[GXA Database] Loaded existing database from ${DB_FILE}`);
    } catch (err) {
      console.warn('[GXA Database] Existing database corrupted or unreadable. Initializing fresh instance.', err);
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
    console.log(`[GXA Database] Initialized fresh database at ${DB_FILE}`);
  }

  runMigrations(dbInstance);
  persistDatabase();
  return dbInstance;
}

/**
 * Executes relational database schema migrations.
 */
function runMigrations(db: Database) {
  db.run(`
    -- 1. Users table (Students & Instructors)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      password_hash TEXT,
      role TEXT NOT NULL DEFAULT 'student',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- 2. Administrator Accounts & Roles
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'superadmin',
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login_at TEXT,
      created_at TEXT NOT NULL
    );

    -- 3. Administrator Sessions with Expiry
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
    );

    -- 4. Student Authenticated Sessions
    CREATE TABLE IF NOT EXISTS student_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      email TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- 5. Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      subtotal REAL NOT NULL,
      discount REAL NOT NULL DEFAULT 0,
      gst_amount REAL NOT NULL,
      total REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      payment_method TEXT NOT NULL,
      status TEXT NOT NULL,
      gateway TEXT NOT NULL,
      gateway_order_id TEXT,
      gateway_payment_id TEXT,
      gateway_signature TEXT,
      verification_notes TEXT,
      created_at TEXT NOT NULL,
      verified_at TEXT
    );

    -- 6. Order Line Items Table
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_type TEXT NOT NULL,
      product_title TEXT NOT NULL,
      unit_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    );

    -- 7. Payment Transactions (Auditable settlement records)
    CREATE TABLE IF NOT EXISTS payment_transactions (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      gateway TEXT NOT NULL,
      gateway_transaction_id TEXT NOT NULL UNIQUE,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      raw_payload TEXT,
      verified_at TEXT NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id)
    );

    -- 8. Entitlements Table (Protected content licensing)
    CREATE TABLE IF NOT EXISTS entitlements (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_type TEXT NOT NULL,
      product_title TEXT NOT NULL,
      order_id TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      granted_at TEXT NOT NULL,
      verified_by TEXT NOT NULL,
      UNIQUE(student_id, product_id)
    );

    -- 9. Lesson Completions (Real student learning progress)
    CREATE TABLE IF NOT EXISTS lesson_completions (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      UNIQUE(student_id, course_id, lesson_id)
    );

    -- 10. Quiz Attempts (Validated assessments & grades)
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      passing_score INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      answers_json TEXT,
      attempted_at TEXT NOT NULL
    );

    -- 11. Certificates Registry (Authoritative persistent credential registry)
    CREATE TABLE IF NOT EXISTS certificates (
      certificate_id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_title TEXT NOT NULL,
      course_category TEXT,
      duration TEXT,
      grade TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      is_revoked INTEGER NOT NULL DEFAULT 0,
      revocation_reason TEXT,
      verification_url TEXT NOT NULL,
      left_signatory_json TEXT NOT NULL,
      right_signatory_json TEXT NOT NULL,
      issued_at TEXT NOT NULL
    );

    -- 12. Security Audit Logs
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      actor TEXT NOT NULL,
      role TEXT NOT NULL,
      ip TEXT,
      details_json TEXT,
      timestamp TEXT NOT NULL
    );

    -- Indexes for high performance
    CREATE INDEX IF NOT EXISTS idx_orders_student ON orders(student_id);
    CREATE INDEX IF NOT EXISTS idx_entitlements_student ON entitlements(student_id);
    CREATE INDEX IF NOT EXISTS idx_progress_student_course ON lesson_completions(student_id, course_id);
    CREATE INDEX IF NOT EXISTS idx_cert_student ON certificates(student_id);
  `);
}

// ---------------------------------------------------------------------------
// Database Helper Query Functions
// ---------------------------------------------------------------------------

/**
 * Execute a query that returns multiple rows.
 */
export function queryAll<T = any>(db: Database, sql: string, params: any[] = []): T[] {
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    const rows: T[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject() as T);
    }
    return rows;
  } finally {
    stmt.free();
  }
}

/**
 * Execute a query that returns a single row.
 */
export function queryOne<T = any>(db: Database, sql: string, params: any[] = []): T | null {
  const stmt = db.prepare(sql);
  try {
    stmt.bind(params);
    let row: T | null = null;
    if (stmt.step()) {
      row = stmt.getAsObject() as T;
    }
    return row;
  } finally {
    stmt.free();
  }
}

/**
 * Execute an INSERT, UPDATE, or DELETE query and immediately schedule persistence.
 */
export function executeRun(db: Database, sql: string, params: any[] = []): void {
  try {
    db.run(sql, params);
    schedulePersist();
  } catch (err) {
    console.error(`[DB Execution Error] SQL execution error: ${sql}`, err);
    throw err;
  }
}
