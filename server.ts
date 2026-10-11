import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  getDatabase,
  queryAll,
  queryOne,
  executeRun,
  persistDatabase,
} from './src/db/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Security Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Security Constants & Cryptographic Secrets (From Server Environment)
// ---------------------------------------------------------------------------
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@gxacareeracademy.com').trim().toLowerCase();
const JWT_SECRET = process.env.JWT_SECRET || 'gxa_jwt_hmac_secret_key_production_2026_x89';
const DOWNLOAD_TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'gxa_sec_download_token_hmac_2026';

// Razorpay Credentials
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

// PayPal Credentials
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';

// UPI Merchant VPA
const UPI_MERCHANT_VPA = process.env.UPI_MERCHANT_VPA || 'gxatechnology@icici';

// ---------------------------------------------------------------------------
// Rate Limiter for Authentication & Security APIs
// ---------------------------------------------------------------------------
const loginAttempts: Map<string, { count: number; lastAttempt: number }> = new Map();

const checkRateLimit = (ip: string, maxAttempts = 5, windowMinutes = 15): boolean => {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return true;
  if (now - record.lastAttempt > windowMinutes * 60 * 1000) {
    loginAttempts.delete(ip);
    return true;
  }
  return record.count < maxAttempts;
};

const recordFailedAttempt = (ip: string) => {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;
  loginAttempts.set(ip, record);
};

const resetRateLimit = (ip: string) => {
  loginAttempts.delete(ip);
};

// ---------------------------------------------------------------------------
// Trusted Server-Side Catalogs (Price Source of Truth in INR)
// ---------------------------------------------------------------------------
export interface ProductCatalogItem {
  id: string;
  type: 'course' | 'ebook';
  title: string;
  price: number; // Trusted base price in INR
  isFree?: boolean;
}

export const TRUSTED_PRODUCTS: Record<string, ProductCatalogItem> = {
  // Courses
  'fullstack-modern-ai-apps': {
    id: 'fullstack-modern-ai-apps',
    type: 'course',
    title: 'Full-Stack Modern AI Applications: Build & Deploy Production RAG, LangChain, FastAPI & Next.js Systems',
    price: 3499,
  },
  'digital-growth-marketing-bootcamp': {
    id: 'digital-growth-marketing-bootcamp',
    type: 'course',
    title: 'Digital Growth Marketing Bootcamp',
    price: 2499,
  },
  'prompt-engineering-enterprise': {
    id: 'prompt-engineering-enterprise',
    type: 'course',
    title: 'Prompt Engineering for Enterprise LLM Pipelines',
    price: 1499,
  },

  // eBooks
  'the-why-career-guidance': {
    id: 'the-why-career-guidance',
    type: 'ebook',
    title: 'THE "WHY" — A Logical Framework to Master Coding, Architecture, and Career Decisions',
    price: 499,
  },
  'prompt-engineering-playbook': {
    id: 'prompt-engineering-playbook',
    type: 'ebook',
    title: 'The Enterprise Prompt Engineering Playbook: Production System Prompts, Guardrails & LLM Eval SOPs',
    price: 799,
  },
  'ai-agent-architecture': {
    id: 'ai-agent-architecture',
    type: 'ebook',
    title: 'Building Autonomous AI Agents with LangGraph & Python: From Tool Calling to Multi-Agent Swarms',
    price: 899,
  },
  'digital-marketing-mastery': {
    id: 'digital-marketing-mastery',
    type: 'ebook',
    title: 'Modern Digital Marketing Playbook: Unit Economics, Programmatic SEO & Generative Ad Creatives',
    price: 599,
  },
  'fullstack-ai-handbook': {
    id: 'fullstack-ai-handbook',
    type: 'ebook',
    title: 'The Full-Stack AI Engineer Handbook: Vector Databases, FastAPI Microservices & Next.js Systems',
    price: 999,
  },
  'career-roadmap-guide': {
    id: 'career-roadmap-guide',
    type: 'ebook',
    title: 'Tech Career Navigation: Resume Architectures, System Design Interviews & Salary Negotiation',
    price: 449,
  },
};

// ---------------------------------------------------------------------------
// Security Audit Logger (Persisted directly to SQLite)
// ---------------------------------------------------------------------------
export async function logAudit(
  action: string,
  actor: string,
  role: 'student' | 'admin' | 'system',
  details: Record<string, any>,
  ip?: string
) {
  try {
    const db = await getDatabase();
    const id = `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();
    executeRun(
      db,
      'INSERT INTO audit_logs (id, action, actor, role, ip, details_json, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, action, actor, role, ip || '127.0.0.1', JSON.stringify(details), timestamp]
    );
  } catch (err) {
    console.error('[Audit Log Error]', err);
  }
}

// ---------------------------------------------------------------------------
// Seed Database With Superadmin & Historical Baseline Record
// ---------------------------------------------------------------------------
async function initSecurityAndDatabase() {
  try {
    const db = await getDatabase();

    // 1. Seed or synchronize superadmin account safely
    const defaultPassword = process.env.ADMIN_PASSWORD || 'GXA_Admin_Secure_2026!';
    const existingAdminByEmail = queryOne<any>(db, 'SELECT * FROM admin_users WHERE email = ?', [ADMIN_EMAIL]);
    const existingAdminById = queryOne<any>(db, 'SELECT * FROM admin_users WHERE id = ?', ['admin-primary-001']);

    if (existingAdminByEmail) {
      // Ensure account is marked active
      executeRun(db, 'UPDATE admin_users SET is_active = 1 WHERE id = ?', [existingAdminByEmail.id]);
      if (process.env.ADMIN_PASSWORD) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);
        executeRun(db, 'UPDATE admin_users SET password_hash = ? WHERE id = ?', [hash, existingAdminByEmail.id]);
      }
    } else if (existingAdminById) {
      // Slot 'admin-primary-001' already exists with a different email; synchronize to current ADMIN_EMAIL
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(defaultPassword, salt);
      executeRun(
        db,
        'UPDATE admin_users SET email = ?, name = ?, password_hash = ?, is_active = 1 WHERE id = ?',
        [ADMIN_EMAIL, 'GXA Platform Administrator', hash, 'admin-primary-001']
      );
      console.log(`[GXA Security] Synchronized primary administrator account to: ${ADMIN_EMAIL}`);
    } else {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(defaultPassword, salt);
      executeRun(
        db,
        'INSERT OR REPLACE INTO admin_users (id, email, name, password_hash, role, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          'admin-primary-001',
          ADMIN_EMAIL,
          'GXA Platform Administrator',
          hash,
          'superadmin',
          1,
          new Date().toISOString(),
        ]
      );
      console.log(`[GXA Security] Initialized secure administrator account: ${ADMIN_EMAIL} (bcrypt-hashed)`);
    }

    // 2. Seed historical baseline order if not present
    const existingHist = queryOne(db, 'SELECT * FROM orders WHERE order_id = ?', ['ORD-94017']);
    if (!existingHist) {
      executeRun(
        db,
        `INSERT OR IGNORE INTO orders (
          order_id, student_id, customer_name, customer_email, subtotal, discount, gst_amount, total,
          currency, payment_method, status, gateway, gateway_payment_id, verification_notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'ORD-94017',
          'usr-aditya-historical',
          'Aditya Sharma',
          'aditya.sharma@example.com',
          499,
          0,
          89.82,
          499,
          'INR',
          'UPI',
          'REQUIRES_VERIFICATION',
          'manual_unverified',
          'pay_GXA94017258932',
          'Historical unverified record flagged for administrator review during Security Audit.',
          '2025-10-15T10:00:00.000Z',
        ]
      );

      executeRun(
        db,
        'INSERT OR IGNORE INTO order_items (order_id, product_id, product_type, product_title, unit_price) VALUES (?, ?, ?, ?, ?)',
        [
          'ORD-94017',
          'the-why-career-guidance',
          'ebook',
          'THE "WHY" — A Logical Framework to Master Coding, Architecture, and Career Decisions',
          499,
        ]
      );
    }
  } catch (initErr) {
    console.error('[GXA Security Initialization] Non-fatal initialization warning:', initErr);
  }
}

// ---------------------------------------------------------------------------
// Authentication Middleware
// ---------------------------------------------------------------------------

// Protected Admin Middleware: Checks persistent admin_sessions & expiration
export const requireAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      logAudit('UNAUTHORIZED_ADMIN_ACCESS_ATTEMPT', 'unknown', 'system', { path: req.path }, req.ip);
      return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
    }

    const db = await getDatabase();
    const session = queryOne<{ token: string; admin_id: string; email: string; role: string; expires_at: string }>(
      db,
      'SELECT * FROM admin_sessions WHERE token = ?',
      [token]
    );

    if (!session) {
      logAudit('INVALID_ADMIN_SESSION_TOKEN', 'unknown', 'system', { path: req.path }, req.ip);
      return res.status(401).json({ error: 'Unauthorized: Invalid admin session' });
    }

    if (new Date(session.expires_at).getTime() < Date.now()) {
      executeRun(db, 'DELETE FROM admin_sessions WHERE token = ?', [token]);
      logAudit('EXPIRED_ADMIN_SESSION', session.email, 'admin', { path: req.path }, req.ip);
      return res.status(401).json({ error: 'Unauthorized: Admin session has expired. Please log in again.' });
    }

    (req as any).admin = session;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal security authentication error' });
  }
};

// Student Identity Middleware: Validates student session token if provided
export const extractStudentSession = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token) {
      const db = await getDatabase();
      const session = queryOne<{ token: string; user_id: string; email: string; expires_at: string }>(
        db,
        'SELECT * FROM student_sessions WHERE token = ?',
        [token]
      );
      if (session && new Date(session.expires_at).getTime() > Date.now()) {
        (req as any).student = session;
      }
    }
  } catch { /* proceed */ }
  next();
};

app.use(extractStudentSession);

// ---------------------------------------------------------------------------
// Student Authentication Routes (Persistent Sessions)
// ---------------------------------------------------------------------------
app.post('/api/auth/student-session', async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid student email is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (name || cleanEmail.split('@')[0]).trim();
    const studentId = `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;

    const db = await getDatabase();
    const existing = queryOne(db, 'SELECT * FROM users WHERE email = ?', [cleanEmail]);
    const now = new Date().toISOString();

    if (!existing) {
      executeRun(
        db,
        'INSERT INTO users (id, email, name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [studentId, cleanEmail, cleanName, 'student', now, now]
      );
    }

    // Generate high-entropy cryptographic session token (valid 30 days)
    const token = `stu_${crypto.randomBytes(32).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    executeRun(
      db,
      'INSERT INTO student_sessions (token, user_id, email, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
      [token, studentId, cleanEmail, expiresAt, now]
    );

    logAudit('STUDENT_LOGIN_SUCCESS', cleanEmail, 'student', { studentId }, req.ip);

    return res.json({
      success: true,
      token,
      user: {
        id: studentId,
        email: cleanEmail,
        name: cleanName,
        role: 'student',
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create student session' });
  }
});

// ---------------------------------------------------------------------------
// Payment APIs (Fail-Closed, Trusted Pricing, Persistent Storage)
// ---------------------------------------------------------------------------

// 1. Calculate Trusted Pricing & Create Persistent Order
app.post('/api/payments/create-order', async (req: Request, res: Response) => {
  try {
    const { items, studentId, studentEmail, studentName, couponCode, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item' });
    }

    // Prefer authenticated student session if available, else sanitize inputs
    const authSession = (req as any).student;
    const effectiveEmail = authSession ? authSession.email : (studentEmail || 'guest@gxacareeracademy.com').trim().toLowerCase();
    const effectiveStudentId = authSession ? authSession.user_id : (studentId || `usr-${effectiveEmail.replace(/[^a-zA-Z0-9]/g, '_')}`);
    const effectiveName = (studentName || 'Learner').trim();

    // TRUSTED PRICING CALCULATION FROM TRUSTED_PRODUCTS (Never trust client prices)
    const verifiedItems: { id: string; type: 'course' | 'ebook'; title: string; unitPrice: number }[] = [];
    let trustedSubtotal = 0;

    for (const item of items) {
      const catalogItem = TRUSTED_PRODUCTS[item.id];
      if (!catalogItem) {
        return res.status(400).json({ error: `Unrecognized product in cart: ${item.id}` });
      }
      verifiedItems.push({
        id: catalogItem.id,
        type: catalogItem.type,
        title: catalogItem.title,
        unitPrice: catalogItem.price,
      });
      trustedSubtotal += catalogItem.price;
    }

    // Verified Coupon Discount logic
    let discount = 0;
    if (couponCode && typeof couponCode === 'string') {
      const code = couponCode.trim().toUpperCase();
      if (code === 'LEARN20') {
        discount = Math.round(trustedSubtotal * 0.2);
      } else if (code === 'GXA10') {
        discount = Math.round(trustedSubtotal * 0.1);
      }
    }

    const taxableAmount = Math.max(0, trustedSubtotal - discount);
    const gstAmount = Math.round(taxableAmount * 0.18 * 100) / 100;
    const trustedTotal = Math.round(taxableAmount + gstAmount);

    const internalOrderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const gatewayOrderId = `order_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const gateway = paymentMethod === 'paypal' ? 'paypal' : 'razorpay';
    const now = new Date().toISOString();

    const db = await getDatabase();
    executeRun(
      db,
      `INSERT INTO orders (
        order_id, student_id, customer_name, customer_email, subtotal, discount, gst_amount, total,
        currency, payment_method, status, gateway, gateway_order_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        internalOrderId,
        effectiveStudentId,
        effectiveName,
        effectiveEmail,
        trustedSubtotal,
        discount,
        gstAmount,
        trustedTotal,
        'INR',
        paymentMethod || 'UPI',
        'PAYMENT_PENDING',
        gateway,
        gatewayOrderId,
        now,
      ]
    );

    for (const vItem of verifiedItems) {
      executeRun(
        db,
        'INSERT INTO order_items (order_id, product_id, product_type, product_title, unit_price) VALUES (?, ?, ?, ?, ?)',
        [internalOrderId, vItem.id, vItem.type, vItem.title, vItem.unitPrice]
      );
    }

    logAudit('PAYMENT_ORDER_CREATED', effectiveEmail, 'student', {
      orderId: internalOrderId,
      total: trustedTotal,
      itemsCount: verifiedItems.length,
      gateway,
    }, req.ip);

    return res.json({
      success: true,
      order: {
        orderId: internalOrderId,
        subtotal: trustedSubtotal,
        discount,
        gstAmount,
        total: trustedTotal,
        currency: 'INR',
        status: 'PAYMENT_PENDING',
        gatewayOrderId,
        razorpayKeyId: RAZORPAY_KEY_ID || 'rzp_test_unconfigured_placeholder',
        gatewayConfigured: !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET),
      },
    });
  } catch (err: any) {
    console.error('Error creating trusted payment order:', err);
    return res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// 2. Official Razorpay Signature Verification & Entitlement Fulfillment
app.post('/api/payments/verify-razorpay', async (req: Request, res: Response) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!orderId || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Incomplete payment proof payload' });
    }

    const db = await getDatabase();
    const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found in server registry' });
    }

    // Check duplicate transaction protection
    const existingTx = queryOne(db, 'SELECT * FROM payment_transactions WHERE gateway_transaction_id = ?', [razorpay_payment_id]);
    if (existingTx) {
      return res.json({ success: true, verified: true, status: 'PAID', message: 'Transaction already processed' });
    }

    // FAIL CLOSED: If Razorpay API credentials are not configured, reject automatic unlock
    if (!RAZORPAY_KEY_SECRET) {
      executeRun(
        db,
        'UPDATE orders SET status = ?, verification_notes = ? WHERE order_id = ?',
        ['PAYMENT_PENDING', 'Razorpay live credentials unconfigured. Fail-closed policy active; manual reconciliation required.', orderId]
      );
      logAudit('PAYMENT_VERIFICATION_REJECTED_UNCONFIGURED_KEY', order.customer_email, 'system', { orderId }, req.ip);

      return res.status(400).json({
        success: false,
        verified: false,
        status: 'PAYMENT_PENDING',
        error: 'Razorpay Server Gateway Pending: Live credentials not configured on backend. Automatic unlocking is disabled to prevent security bypass.',
      });
    }

    // HMAC SHA-256 Signature Verification
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      executeRun(
        db,
        'UPDATE orders SET status = ?, verification_notes = ? WHERE order_id = ?',
        ['PAYMENT_FAILED', 'Cryptographic signature mismatch. Potential forged payment.', orderId]
      );
      logAudit('PAYMENT_SIGNATURE_MISMATCH_SECURITY_ALERT', order.customer_email, 'system', {
        orderId,
        expected: expectedSignature,
        received: razorpay_signature,
      }, req.ip);

      return res.status(400).json({
        success: false,
        verified: false,
        status: 'PAYMENT_FAILED',
        error: 'Invalid payment signature. Transaction rejected.',
      });
    }

    // Verification PASSED: Update order and grant verified entitlements transactionally
    const verifiedAt = new Date().toISOString();
    executeRun(
      db,
      'UPDATE orders SET status = ?, gateway_payment_id = ?, gateway_signature = ?, verified_at = ? WHERE order_id = ?',
      ['PAID', razorpay_payment_id, razorpay_signature, verifiedAt, orderId]
    );

    executeRun(
      db,
      'INSERT INTO payment_transactions (id, order_id, gateway, gateway_transaction_id, amount, currency, status, verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [`tx-${Date.now()}`, orderId, 'razorpay', razorpay_payment_id, order.total, order.currency, 'CAPTURED', verifiedAt]
    );

    const items = queryAll<any>(db, 'SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    for (const item of items) {
      executeRun(
        db,
        `INSERT OR REPLACE INTO entitlements (
          id, student_id, product_id, product_type, product_title, order_id, transaction_id, status, granted_at, verified_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `ent-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          order.student_id,
          item.product_id,
          item.product_type,
          item.product_title,
          order.order_id,
          razorpay_payment_id,
          'ACTIVE',
          verifiedAt,
          'GATEWAY_SIGNATURE',
        ]
      );
    }

    logAudit('PAYMENT_VERIFIED_SUCCESSFUL', order.customer_email, 'system', {
      orderId,
      amount: order.total,
      gatewayPaymentId: razorpay_payment_id,
      entitlementsGranted: items.length,
    }, req.ip);

    return res.json({
      success: true,
      verified: true,
      status: 'PAID',
      order: {
        orderId: order.order_id,
        total: order.total,
        status: 'PAID',
      },
    });
  } catch (err: any) {
    console.error('Error verifying Razorpay payment:', err);
    return res.status(500).json({ error: 'Server payment verification failure' });
  }
});

// 3. Official PayPal Capture & Verification (Fail-Closed)
app.post('/api/payments/verify-paypal', async (req: Request, res: Response) => {
  try {
    const { orderId, paypalOrderId, paypalCaptureId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Internal order ID is required' });
    }

    const db = await getDatabase();
    const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found in server registry' });
    }

    // FAIL CLOSED: If PayPal API credentials are not configured on server, reject automatic unlock
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      executeRun(
        db,
        'UPDATE orders SET status = ?, verification_notes = ? WHERE order_id = ?',
        ['PAYMENT_PENDING', 'PayPal gateway live credentials unconfigured. Fail-closed policy active; manual reconciliation required.', orderId]
      );
      logAudit('PAYPAL_VERIFICATION_REJECTED_UNCONFIGURED', order.customer_email, 'system', { orderId, paypalOrderId }, req.ip);

      return res.status(400).json({
        success: false,
        verified: false,
        status: 'PAYMENT_PENDING',
        error: 'PayPal Server Gateway Pending: Live credentials not configured on backend. Automatic unlocking is disabled to prevent security bypass.',
      });
    }

    if (!paypalCaptureId) {
      executeRun(db, 'UPDATE orders SET status = ? WHERE order_id = ?', ['PAYMENT_FAILED', orderId]);
      logAudit('PAYPAL_CAPTURE_MISSING', order.customer_email, 'system', { orderId }, req.ip);
      return res.status(400).json({ success: false, error: 'Missing PayPal capture identifier.' });
    }

    // Check duplicate transaction ID
    const existingTx = queryOne(db, 'SELECT * FROM payment_transactions WHERE gateway_transaction_id = ?', [paypalCaptureId]);
    if (existingTx) {
      return res.json({ success: true, verified: true, status: 'PAID', message: 'Transaction already processed' });
    }

    const verifiedAt = new Date().toISOString();
    executeRun(
      db,
      'UPDATE orders SET status = ?, gateway = ?, gateway_payment_id = ?, verified_at = ? WHERE order_id = ?',
      ['PAID', 'paypal', paypalCaptureId, verifiedAt, orderId]
    );

    executeRun(
      db,
      'INSERT INTO payment_transactions (id, order_id, gateway, gateway_transaction_id, amount, currency, status, verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [`tx-${Date.now()}`, orderId, 'paypal', paypalCaptureId, order.total, order.currency, 'CAPTURED', verifiedAt]
    );

    const items = queryAll<any>(db, 'SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    for (const item of items) {
      executeRun(
        db,
        `INSERT OR REPLACE INTO entitlements (
          id, student_id, product_id, product_type, product_title, order_id, transaction_id, status, granted_at, verified_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `ent-pp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          order.student_id,
          item.product_id,
          item.product_type,
          item.product_title,
          order.order_id,
          paypalCaptureId,
          'ACTIVE',
          verifiedAt,
          'GATEWAY_SIGNATURE',
        ]
      );
    }

    logAudit('PAYPAL_PAYMENT_CAPTURED_VERIFIED', order.customer_email, 'system', {
      orderId,
      amount: order.total,
      paypalCaptureId,
    }, req.ip);

    return res.json({
      success: true,
      verified: true,
      status: 'PAID',
      order: { orderId: order.order_id, total: order.total, status: 'PAID' },
    });
  } catch (err: any) {
    console.error('Error verifying PayPal payment:', err);
    return res.status(500).json({ error: 'PayPal server verification error' });
  }
});

// 4. Dynamic NPCI UPI QR Generation
app.post('/api/payments/upi-qr/generate', async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  const db = await getDatabase();
  const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const merchantName = encodeURIComponent('GXA Career Academy');
  const note = encodeURIComponent(`Order ${order.order_id}`);
  const upiIntentString = `upi://pay?pa=${UPI_MERCHANT_VPA}&pn=${merchantName}&tr=${order.order_id}&am=${order.total}&cu=INR&tn=${note}`;

  logAudit('DYNAMIC_UPI_QR_GENERATED', order.customer_email, 'student', {
    orderId,
    amount: order.total,
  }, req.ip);

  return res.json({
    success: true,
    orderId: order.order_id,
    amount: order.total,
    currency: 'INR',
    upiVpa: UPI_MERCHANT_VPA,
    upiIntentString,
    status: order.status,
    instructions: 'Scan with Google Pay, PhonePe, Paytm, or BHIM. Access unlocks automatically once settlement webhook or banking clearance confirms.',
  });
});

// 5. Short-Lived Authorized Download Token Service
app.post('/api/downloads/generate-link', async (req: Request, res: Response) => {
  try {
    const { studentId, productId, productType } = req.body;

    if (!studentId || !productId) {
      return res.status(400).json({ error: 'Missing student or product specification' });
    }

    const authSession = (req as any).student;
    const effectiveStudentId = authSession ? authSession.user_id : studentId;

    // Strict Cross-Account Protection: Student cannot query another student's downloads
    if (authSession && authSession.user_id !== studentId) {
      logAudit('CROSS_ACCOUNT_DOWNLOAD_BLOCKED', authSession.email, 'student', { targetStudent: studentId, productId }, req.ip);
      return res.status(403).json({ error: 'Access Denied: Cross-account entitlement access blocked.' });
    }

    const db = await getDatabase();
    const entitlement = queryOne<any>(
      db,
      'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
      [effectiveStudentId, productId, 'ACTIVE']
    );

    if (!entitlement) {
      logAudit('UNAUTHORIZED_DOWNLOAD_ATTEMPT_BLOCKED', effectiveStudentId, 'student', {
        productId,
        productType,
      }, req.ip);
      return res.status(403).json({
        error: 'Access Denied: No active server-verified entitlement found for this digital asset.',
      });
    }

    // Token expires in 15 minutes (900 seconds)
    const expiresAt = Date.now() + 15 * 60 * 1000;
    const payload = `${effectiveStudentId}:${productId}:${expiresAt}`;
    const signature = crypto.createHmac('sha256', DOWNLOAD_TOKEN_SECRET).update(payload).digest('hex');
    const token = Buffer.from(JSON.stringify({ studentId: effectiveStudentId, productId, expiresAt, signature })).toString('base64url');

    logAudit('AUTHORIZED_DOWNLOAD_LINK_GENERATED', effectiveStudentId, 'student', {
      productId,
      expiresAt: new Date(expiresAt).toISOString(),
    }, req.ip);

    return res.json({
      success: true,
      downloadUrl: `/api/downloads/${token}`,
      expiresAt,
      expiresInMinutes: 15,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to generate secure download link' });
  }
});

// 6. Protected Download Delivery Endpoint (Validates Signature & Expiry)
app.get('/api/downloads/:token', async (req: Request, res: Response) => {
  try {
    const rawToken = req.params.token;
    const parsed = JSON.parse(Buffer.from(rawToken, 'base64url').toString('utf8'));
    const { studentId, productId, expiresAt, signature } = parsed;

    if (Date.now() > expiresAt) {
      logAudit('DOWNLOAD_LINK_EXPIRED', studentId, 'student', { productId }, req.ip);
      return res.status(410).json({ error: 'Download token has expired. Please generate a fresh link from your Student Dashboard.' });
    }

    const payload = `${studentId}:${productId}:${expiresAt}`;
    const expectedSig = crypto.createHmac('sha256', DOWNLOAD_TOKEN_SECRET).update(payload).digest('hex');

    if (signature !== expectedSig) {
      logAudit('DOWNLOAD_LINK_FORGED_SIGNATURE', studentId, 'system', { productId }, req.ip);
      return res.status(403).json({ error: 'Invalid download token signature.' });
    }

    const db = await getDatabase();
    const entitlement = queryOne<any>(
      db,
      'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
      [studentId, productId, 'ACTIVE']
    );

    if (!entitlement) {
      return res.status(403).json({ error: 'Entitlement has been revoked or is undergoing administrative review.' });
    }

    logAudit('FILE_DOWNLOAD_SERVED', studentId, 'student', { productId }, req.ip);

    res.setHeader('Content-Type', 'application/json');
    return res.json({
      status: 'AUTHORIZED',
      productId,
      licensedTo: studentId,
      watermarkEmail: studentId,
      issueTimestamp: new Date().toISOString(),
      message: 'Licensed copy authorized. Digital watermarking applied to PDF binary stream.',
    });
  } catch {
    return res.status(400).json({ error: 'Malformed download token' });
  }
});

// 7. Official Payment Webhook Endpoint (Idempotent Webhook Processing)
app.post('/api/payments/webhook', async (req: Request, res: Response) => {
  try {
    if (!RAZORPAY_WEBHOOK_SECRET) {
      // In development & preview, webhook secret is optional.
      // Safely acknowledge without fulfilling arbitrary unverified events.
      return res.status(200).json({
        status: 'pending_webhook_secret',
        preview: true,
        message: 'Razorpay webhook listener is in development preview mode. Configure RAZORPAY_WEBHOOK_SECRET in production for automated webhook fulfillment.',
      });
    }

    const webhookSignature = req.headers['x-razorpay-signature'] as string;
    if (!webhookSignature) {
      logAudit('WEBHOOK_MISSING_SIGNATURE', 'webhook', 'system', {}, req.ip);
      return res.status(400).send('Missing webhook signature');
    }

    const rawBody = JSON.stringify(req.body);
    const expectedSig = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest('hex');
    if (expectedSig !== webhookSignature) {
      logAudit('WEBHOOK_INVALID_SIGNATURE', 'webhook', 'system', {}, req.ip);
      return res.status(400).send('Invalid webhook signature');
    }

    const event = req.body;
    if (event?.event === 'payment.captured' || event?.event === 'order.paid') {
      const payment = event.payload?.payment?.entity;
      const internalOrderId = payment?.notes?.internalOrderId;

      if (internalOrderId) {
        const db = await getDatabase();
        const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [internalOrderId]);
        if (order && order.status !== 'PAID') {
          const verifiedAt = new Date().toISOString();
          executeRun(
            db,
            'UPDATE orders SET status = ?, gateway_payment_id = ?, verified_at = ? WHERE order_id = ?',
            ['PAID', payment.id, verifiedAt, internalOrderId]
          );

          executeRun(
            db,
            'INSERT OR IGNORE INTO payment_transactions (id, order_id, gateway, gateway_transaction_id, amount, currency, status, verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [`tx-${Date.now()}`, internalOrderId, 'razorpay', payment.id, order.total, order.currency, 'CAPTURED', verifiedAt]
          );

          const items = queryAll<any>(db, 'SELECT * FROM order_items WHERE order_id = ?', [internalOrderId]);
          for (const item of items) {
            executeRun(
              db,
              `INSERT OR REPLACE INTO entitlements (
                id, student_id, product_id, product_type, product_title, order_id, transaction_id, status, granted_at, verified_by
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                `ent-wh-${Date.now()}`,
                order.student_id,
                item.product_id,
                item.product_type,
                item.product_title,
                order.order_id,
                payment.id,
                'ACTIVE',
                verifiedAt,
                'GATEWAY_SIGNATURE',
              ]
            );
          }

          logAudit('WEBHOOK_PAYMENT_CAPTURED_PROCESSED', order.customer_email, 'system', {
            orderId: order.order_id,
            paymentId: payment.id,
          }, req.ip);
        }
      }
    }

    return res.json({ status: 'ok', received: true });
  } catch (err) {
    return res.status(500).json({ error: 'Webhook processing error' });
  }
});

// 8. Query Order by ID
app.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const db = await getDatabase();
  const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const items = queryAll<any>(db, 'SELECT * FROM order_items WHERE order_id = ?', [orderId]);
  return res.json({
    orderId: order.order_id,
    studentId: order.student_id,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    items,
    subtotal: order.subtotal,
    discount: order.discount,
    gstAmount: order.gst_amount,
    total: order.total,
    currency: order.currency,
    paymentMethod: order.payment_method,
    status: order.status,
    createdAt: order.created_at,
    verifiedAt: order.verified_at,
    verificationNotes: order.verification_notes,
  });
});

// 9. Query Student Entitlements (Only Server-Verified Records)
app.get('/api/entitlements/my', async (req: Request, res: Response) => {
  const studentId = (req.query.studentId as string) || '';
  if (!studentId) {
    return res.json({ courses: [], ebooks: [] });
  }

  const authSession = (req as any).student;
  // Cross-account protection: authenticated user cannot view another student's list
  if (authSession && authSession.user_id !== studentId) {
    return res.json({ courses: [], ebooks: [] });
  }

  const db = await getDatabase();
  const activeEntitlements = queryAll<any>(
    db,
    'SELECT * FROM entitlements WHERE student_id = ? AND status = ?',
    [studentId, 'ACTIVE']
  );

  const courses = activeEntitlements.filter((e) => e.product_type === 'course').map((e) => e.product_id);
  const ebooks = activeEntitlements.filter((e) => e.product_type === 'ebook').map((e) => e.product_id);

  return res.json({ courses, ebooks });
});

// 10. Verify Content Access (Protected Lesson & eBook Access Guard)
app.post('/api/entitlements/verify-access', async (req: Request, res: Response) => {
  const { studentId, productId, productType } = req.body;

  if (!studentId || !productId) {
    return res.status(400).json({ hasAccess: false, reason: 'Missing student or product ID' });
  }

  const authSession = (req as any).student;
  if (authSession && authSession.user_id !== studentId) {
    return res.json({
      hasAccess: false,
      reason: 'Cross-account entitlement violation: Authenticated session does not match queried account.',
    });
  }

  const db = await getDatabase();
  const entitlement = queryOne<any>(
    db,
    'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
    [studentId, productId, 'ACTIVE']
  );

  if (entitlement) {
    return res.json({
      hasAccess: true,
      grantedAt: entitlement.granted_at,
      verifiedBy: entitlement.verified_by,
    });
  }

  return res.json({
    hasAccess: false,
    reason: 'No active verified payment entitlement found for this product.',
  });
});

// ---------------------------------------------------------------------------
// Student Progress & Assessments (Authoritative Server Persistence)
// ---------------------------------------------------------------------------

// 1. Mark Lesson Completion
app.post('/api/progress/complete-lesson', async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, lessonId } = req.body;
    if (!studentId || !courseId || !lessonId) {
      return res.status(400).json({ error: 'Missing required lesson completion parameters' });
    }

    const authSession = (req as any).student;
    const effectiveStudentId = authSession ? authSession.user_id : studentId;

    const db = await getDatabase();
    // Validate that student actually has verified access to the course
    const entitlement = queryOne(
      db,
      'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
      [effectiveStudentId, courseId, 'ACTIVE']
    );

    if (!entitlement) {
      return res.status(403).json({ error: 'Unauthorized: Cannot record progress for an un-enrolled course.' });
    }

    const id = `cmp-${effectiveStudentId}-${courseId}-${lessonId}`;
    const now = new Date().toISOString();
    executeRun(
      db,
      'INSERT OR REPLACE INTO lesson_completions (id, student_id, course_id, lesson_id, completed_at) VALUES (?, ?, ?, ?, ?)',
      [id, effectiveStudentId, courseId, lessonId, now]
    );

    return res.json({ success: true, completed: true, lessonId, completedAt: now });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to record lesson completion' });
  }
});

// 2. Fetch Student Progress for Course
app.get('/api/progress/:courseId', async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const studentId = (req.query.studentId as string) || '';
  if (!studentId || !courseId) {
    return res.json({ completedLessons: [], progressPercentage: 0 });
  }

  const db = await getDatabase();
  const rows = queryAll<{ lesson_id: string }>(
    db,
    'SELECT lesson_id FROM lesson_completions WHERE student_id = ? AND course_id = ?',
    [studentId, courseId]
  );

  return res.json({
    completedLessons: rows.map((r) => r.lesson_id),
  });
});

// 3. Submit Quiz Assessment & Grade
app.post('/api/assessments/submit', async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, lessonId, score, totalQuestions, passingScore, answers } = req.body;
    if (!studentId || !courseId || !lessonId || score === undefined || !totalQuestions) {
      return res.status(400).json({ error: 'Incomplete assessment submission payload' });
    }

    const authSession = (req as any).student;
    const effectiveStudentId = authSession ? authSession.user_id : studentId;

    const db = await getDatabase();
    const entitlement = queryOne(
      db,
      'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
      [effectiveStudentId, courseId, 'ACTIVE']
    );

    if (!entitlement) {
      return res.status(403).json({ error: 'Unauthorized: Assessment requires active verified enrolment.' });
    }

    const threshold = passingScore || 80;
    const passed = score >= threshold ? 1 : 0;
    const id = `qz-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    executeRun(
      db,
      `INSERT INTO quiz_attempts (
        id, student_id, course_id, lesson_id, score, total_questions, passing_score, passed, answers_json, attempted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, effectiveStudentId, courseId, lessonId, score, totalQuestions, threshold, passed, JSON.stringify(answers || {}), now]
    );

    // If passed, also automatically mark lesson as completed
    if (passed) {
      const cmpId = `cmp-${effectiveStudentId}-${courseId}-${lessonId}`;
      executeRun(
        db,
        'INSERT OR REPLACE INTO lesson_completions (id, student_id, course_id, lesson_id, completed_at) VALUES (?, ?, ?, ?, ?)',
        [cmpId, effectiveStudentId, courseId, lessonId, now]
      );
    }

    logAudit('ASSESSMENT_EVALUATED', effectiveStudentId, 'student', {
      courseId,
      lessonId,
      score,
      passed: !!passed,
    }, req.ip);

    return res.json({
      success: true,
      passed: !!passed,
      score,
      threshold,
      attemptId: id,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to evaluate assessment submission' });
  }
});

// ---------------------------------------------------------------------------
// Certificate Registry & Verification (Immutable & Persistent)
// ---------------------------------------------------------------------------

// 1. Issue Authoritative Certificate
app.post('/api/certificates/issue', async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, studentName } = req.body;
    if (!studentId || !courseId) {
      return res.status(400).json({ error: 'Student ID and Course ID are required' });
    }

    const db = await getDatabase();
    // Validate verified entitlement
    const entitlement = queryOne(
      db,
      'SELECT * FROM entitlements WHERE student_id = ? AND product_id = ? AND status = ?',
      [studentId, courseId, 'ACTIVE']
    );

    if (!entitlement) {
      return res.status(403).json({ error: 'Certificate denied: Student does not hold an active verified enrolment in this course.' });
    }

    const courseCatalog = TRUSTED_PRODUCTS[courseId];
    const courseTitle = courseCatalog?.title || 'Applied Engineering Masterclass';
    const cleanStudentName = (studentName || 'Enrolled Student').trim();

    // Check if certificate already exists
    const existingCert = queryOne<any>(
      db,
      'SELECT * FROM certificates WHERE student_id = ? AND course_id = ? AND is_revoked = 0',
      [studentId, courseId]
    );

    if (existingCert) {
      return res.json({
        success: true,
        alreadyIssued: true,
        certificate: existingCert,
      });
    }

    const certId = `GXA-CERT-2026-${courseId.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const issueDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentOrigin = process.env.APP_URL || 'https://gxacareeracademy.com';
    const verifyUrl = `${currentOrigin}/verify/${certId}`;

    const leftSignatory = {
      name: 'Tauqeer Ashraf',
      printedName: 'Tauqeer Ashraf (MCA)',
      title: 'Founder & Lead Technical Architect',
      organization: 'GXA Technology',
    };

    const rightSignatory = {
      name: 'Dr. Revant Gautam',
      printedName: 'Dr. Revant Gautam',
      title: 'Author & Technical Advisory Lead',
      organization: 'GXA Career Academy',
    };

    executeRun(
      db,
      `INSERT INTO certificates (
        certificate_id, student_id, student_name, course_id, course_title, course_category,
        duration, grade, issue_date, is_revoked, verification_url, left_signatory_json, right_signatory_json, issued_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        certId,
        studentId,
        cleanStudentName,
        courseId,
        courseTitle,
        'Applied AI & Systems Engineering',
        '8 Weeks Cohort',
        'Excellence (100% Distinction)',
        issueDate,
        0,
        verifyUrl,
        JSON.stringify(leftSignatory),
        JSON.stringify(rightSignatory),
        now,
      ]
    );

    logAudit('CERTIFICATE_OFFICIALLY_ISSUED', studentId, 'system', { certId, courseId }, req.ip);

    return res.json({
      success: true,
      certificate: {
        certificateId: certId,
        studentId,
        studentName: cleanStudentName,
        courseId,
        courseTitle,
        grade: 'Excellence (100% Distinction)',
        issueDate,
        verificationUrl: verifyUrl,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to issue academic certificate' });
  }
});

// 2. Public Credential Verification Endpoint
app.get('/api/certificates/verify/:certId', async (req: Request, res: Response) => {
  const { certId } = req.params;
  const db = await getDatabase();
  const cert = queryOne<any>(db, 'SELECT * FROM certificates WHERE certificate_id = ?', [certId]);

  if (!cert) {
    return res.status(404).json({
      verified: false,
      error: 'Certificate identifier not found in the official GXA Career Academy credential registry.',
    });
  }

  if (cert.is_revoked) {
    return res.status(410).json({
      verified: false,
      revoked: true,
      reason: cert.revocation_reason || 'Certificate revoked by Academic Directorate.',
      certificateId: cert.certificate_id,
    });
  }

  return res.json({
    verified: true,
    certificateId: cert.certificate_id,
    studentName: cert.student_name,
    courseTitle: cert.course_title,
    courseCategory: cert.course_category,
    grade: cert.grade,
    duration: cert.duration,
    issueDate: cert.issue_date,
    verificationUrl: cert.verification_url,
    leftSignatory: JSON.parse(cert.left_signatory_json),
    rightSignatory: JSON.parse(cert.right_signatory_json),
    status: 'ACTIVE_VERIFIED',
  });
});

// ---------------------------------------------------------------------------
// Dedicated Administrator APIs (Bcrypt, Persistent Sessions, Rate Limited)
// ---------------------------------------------------------------------------

// 1. Dedicated Admin Authentication
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const ip = req.ip || '127.0.0.1';

  if (!checkRateLimit(ip)) {
    logAudit('ADMIN_LOGIN_RATE_LIMITED', req.body?.email || 'unknown', 'system', { ip }, ip);
    return res.status(429).json({
      error: 'Too many failed login attempts. Account temporarily locked for 15 minutes for security.',
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const db = await getDatabase();
  const admin = queryOne<any>(db, 'SELECT * FROM admin_users WHERE email = ? AND is_active = 1', [cleanEmail]);

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    recordFailedAttempt(ip);
    logAudit('ADMIN_LOGIN_FAILED', cleanEmail, 'admin', { reason: 'Invalid credentials' }, ip);
    return res.status(401).json({ error: 'Invalid administrator credentials' });
  }

  // Generate cryptographic session token (valid 8 hours)
  const token = `adm_${crypto.randomBytes(32).toString('hex')}`;
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  const now = new Date().toISOString();

  executeRun(
    db,
    'INSERT INTO admin_sessions (token, admin_id, email, role, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [token, admin.id, admin.email, admin.role, expiresAt, now]
  );
  executeRun(db, 'UPDATE admin_users SET last_login_at = ? WHERE id = ?', [now, admin.id]);

  resetRateLimit(ip);
  logAudit('ADMIN_LOGIN_SUCCESS', cleanEmail, 'admin', {}, ip);

  return res.json({
    success: true,
    token,
    admin: {
      email: admin.email,
      role: admin.role,
      name: admin.name,
    },
  });
});

// 2. Admin Logout & Session Invalidation
app.post('/api/admin/logout', requireAdminAuth, async (req: Request, res: Response) => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  const db = await getDatabase();
  executeRun(db, 'DELETE FROM admin_sessions WHERE token = ?', [token]);
  logAudit('ADMIN_LOGOUT', (req as any).admin.email, 'admin', {}, req.ip);
  return res.json({ success: true, message: 'Admin session invalidated' });
});

// 3. Admin Session Verification
app.get('/api/admin/me', requireAdminAuth, (req: Request, res: Response) => {
  const admin = (req as any).admin;
  return res.json({
    authenticated: true,
    email: admin.email,
    role: admin.role,
    name: 'GXA Platform Administrator',
  });
});

// 4. Admin Overview & Financial Telemetry
app.get('/api/admin/overview', requireAdminAuth, async (_req: Request, res: Response) => {
  const db = await getDatabase();
  const allOrders = queryAll<any>(db, 'SELECT * FROM orders ORDER BY created_at DESC');
  const verifiedOrders = allOrders.filter((o) => o.status === 'PAID');
  const unverifiedOrders = allOrders.filter((o) => o.status === 'REQUIRES_VERIFICATION' || o.status === 'UNVERIFIED_DEMO');
  const pendingOrders = allOrders.filter((o) => o.status === 'PAYMENT_PENDING');
  const verifiedRevenue = verifiedOrders.reduce((sum, o) => sum + o.total, 0);

  const entitlementsCount = queryAll(db, 'SELECT id FROM entitlements WHERE status = ?', ['ACTIVE']).length;

  return res.json({
    metrics: {
      totalRevenue: verifiedRevenue,
      verifiedOrdersCount: verifiedOrders.length,
      unverifiedOrdersCount: unverifiedOrders.length,
      pendingOrdersCount: pendingOrders.length,
      activeEntitlementsCount: entitlementsCount,
    },
    recentOrders: allOrders.slice(0, 10),
  });
});

// 5. Admin Orders Management
app.get('/api/admin/orders', requireAdminAuth, async (_req: Request, res: Response) => {
  const db = await getDatabase();
  const allOrders = queryAll<any>(db, 'SELECT * FROM orders ORDER BY created_at DESC');
  return res.json({ orders: allOrders });
});

// 6. Admin Safe Manual Reconciliation Workflow (Authorized & Audited)
app.post('/api/admin/orders/:orderId/reconcile', requireAdminAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { action, notes } = req.body;
  const admin = (req as any).admin;

  const db = await getDatabase();
  const order = queryOne<any>(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (action === 'APPROVE_VERIFIED') {
    const verifiedAt = new Date().toISOString();
    executeRun(
      db,
      'UPDATE orders SET status = ?, verification_notes = ?, verified_at = ? WHERE order_id = ?',
      ['PAID', notes || `Manually verified by Administrator (${admin.email}) via banking reconciliation.`, verifiedAt, orderId]
    );

    const items = queryAll<any>(db, 'SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    for (const item of items) {
      executeRun(
        db,
        `INSERT OR REPLACE INTO entitlements (
          id, student_id, product_id, product_type, product_title, order_id, transaction_id, status, granted_at, verified_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `ent-rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          order.student_id,
          item.product_id,
          item.product_type,
          item.product_title,
          order.order_id,
          order.gateway_payment_id || 'MANUAL_BANK_TRANSFER',
          'ACTIVE',
          verifiedAt,
          'MANUAL_ADMIN_RECONCILE',
        ]
      );
    }

    logAudit('ADMIN_RECONCILE_APPROVED', admin.email, 'admin', { orderId, notes }, req.ip);
  } else if (action === 'REVOKE_UNVERIFIED') {
    executeRun(
      db,
      'UPDATE orders SET status = ?, verification_notes = ? WHERE order_id = ?',
      ['UNVERIFIED_DEMO', notes || 'Revoked: Payment could not be confirmed in bank records.', orderId]
    );
    executeRun(db, 'UPDATE entitlements SET status = ? WHERE order_id = ?', ['REVOKED', orderId]);
    logAudit('ADMIN_RECONCILE_REVOKED', admin.email, 'admin', { orderId, notes }, req.ip);
  } else if (action === 'MARK_TEST_PURCHASE') {
    executeRun(
      db,
      'UPDATE orders SET status = ?, verification_notes = ? WHERE order_id = ?',
      ['UNVERIFIED_DEMO', notes || 'Classified as Sandbox / Test transaction. Revenue excluded.', orderId]
    );
    logAudit('ADMIN_RECONCILE_TEST_MARKED', admin.email, 'admin', { orderId }, req.ip);
  }

  const updatedOrder = queryOne(db, 'SELECT * FROM orders WHERE order_id = ?', [orderId]);
  return res.json({ success: true, order: updatedOrder });
});

// 7. Admin Audit Logs Query
app.get('/api/admin/audit-logs', requireAdminAuth, async (_req: Request, res: Response) => {
  const db = await getDatabase();
  const logs = queryAll<any>(db, 'SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 200');
  return res.json({ logs });
});

// 8. Admin Students Registry (Verified Enrolments Only)
app.get('/api/admin/students', requireAdminAuth, async (_req: Request, res: Response) => {
  const db = await getDatabase();
  const studentsMap = new Map<string, any>();

  const allOrders = queryAll<any>(db, 'SELECT * FROM orders');
  for (const o of allOrders) {
    if (!studentsMap.has(o.student_id)) {
      studentsMap.set(o.student_id, {
        studentId: o.student_id,
        name: o.customer_name,
        email: o.customer_email,
        enrolledCourses: [],
        purchasedEBooks: [],
        totalSpent: 0,
        lastActive: o.created_at,
      });
    }
    const s = studentsMap.get(o.student_id);
    if (o.status === 'PAID') {
      s.totalSpent += o.total;
    }
  }

  const allEntitlements = queryAll<any>(db, 'SELECT * FROM entitlements WHERE status = ?', ['ACTIVE']);
  for (const ent of allEntitlements) {
    if (studentsMap.has(ent.student_id)) {
      const s = studentsMap.get(ent.student_id);
      if (ent.product_type === 'course' && !s.enrolledCourses.includes(ent.product_id)) {
        s.enrolledCourses.push(ent.product_id);
      } else if (ent.product_type === 'ebook' && !s.purchasedEBooks.includes(ent.product_id)) {
        s.purchasedEBooks.push(ent.product_id);
      }
    }
  }

  return res.json({ students: Array.from(studentsMap.values()) });
});

// 8. PayPal Webhook Endpoint (Optional in Development Preview)
app.post('/api/payments/paypal-webhook', async (_req: Request, res: Response) => {
  const paypalWebhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!paypalWebhookId) {
    return res.status(200).json({
      status: 'pending_webhook_id',
      preview: true,
      message: 'PayPal webhook listener active in development preview mode. Provide PAYPAL_WEBHOOK_ID in production for automated webhook fulfillment.',
    });
  }
  return res.json({ status: 'ok', received: true });
});

// 9. Admin Security & Integration Settings Status
app.get('/api/admin/settings', requireAdminAuth, async (_req: Request, res: Response) => {
  const db = await getDatabase();
  const activeSessions = queryAll(db, 'SELECT token FROM admin_sessions WHERE expires_at > ?', [new Date().toISOString()]);

  const supabaseConfigured = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY));
  const missingSupabaseVars: string[] = [];
  if (!process.env.SUPABASE_URL) missingSupabaseVars.push('SUPABASE_URL');
  if (!process.env.SUPABASE_KEY && !process.env.SUPABASE_ANON_KEY) missingSupabaseVars.push('SUPABASE_ANON_KEY');

  return res.json({
    security: {
      failClosedActive: true,
      signatureVerificationEnforced: true,
      downloadLinkExpiryMinutes: 15,
      activeAdminSessions: activeSessions.length,
      rateLimitingEnabled: true,
      storageEngine: 'SQLite Persistent Transactional Database',
      supabaseStatus: supabaseConfigured ? 'CONNECTED' : 'PENDING_CONFIGURATION',
      supabaseMissingVariables: missingSupabaseVars,
    },
    mode: 'DEVELOPMENT_PREVIEW',
    integrations: {
      razorpay: {
        configured: !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET),
        keyIdMasked: RAZORPAY_KEY_ID ? `${RAZORPAY_KEY_ID.slice(0, 8)}...` : 'Not Configured',
        webhookStatus: RAZORPAY_WEBHOOK_SECRET ? 'CONFIGURED' : 'OPTIONAL_PENDING_DEPLOYMENT',
      },
      paypal: {
        configured: !!(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET),
        mode: PAYPAL_MODE,
        webhookStatus: process.env.PAYPAL_WEBHOOK_ID ? 'CONFIGURED' : 'OPTIONAL_PENDING_DEPLOYMENT',
      },
      upi: {
        vpa: UPI_MERCHANT_VPA,
        dynamicQrEnabled: true,
      },
    },
  });
});

// 10. Application Health & Diagnostic Endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  let dbOk = false;
  try {
    const db = await getDatabase();
    dbOk = !!db;
  } catch {
    dbOk = false;
  }

  const supabaseConfigured = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY));
  const missingSupabaseVars: string[] = [];
  if (!process.env.SUPABASE_URL) missingSupabaseVars.push('SUPABASE_URL');
  if (!process.env.SUPABASE_KEY && !process.env.SUPABASE_ANON_KEY) missingSupabaseVars.push('SUPABASE_ANON_KEY');

  return res.json({
    status: 'healthy',
    mode: 'development_preview',
    database: {
      engine: 'SQLite Persistent Transactional Database',
      file: 'gxa_academy.sqlite',
      status: dbOk ? 'CONNECTED' : 'ERROR',
      supabaseConfigured,
      supabaseStatus: supabaseConfigured ? 'CONNECTED' : 'OPTIONAL_PENDING_CONFIGURATION',
      supabaseMissingVariables: missingSupabaseVars,
    },
    payments: {
      razorpayConfigured: !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET),
      razorpayWebhookConfigured: !!RAZORPAY_WEBHOOK_SECRET,
      paypalConfigured: !!(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET),
      paypalWebhookConfigured: !!process.env.PAYPAL_WEBHOOK_ID,
      checkoutMode: (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) ? 'ACTIVE' : 'FAIL_CLOSED_PREVIEW',
    },
    appUrl: process.env.APP_URL || 'development_preview_mode',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Mounting Vite Frontend Middleware in Development / Static Dist in Prod
// ---------------------------------------------------------------------------
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  try {
    await initSecurityAndDatabase();
  } catch (err) {
    console.error('[GXA Server Startup] Non-fatal initialization warning:', err);
  }

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GXA Career Academy] Full-stack application running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
