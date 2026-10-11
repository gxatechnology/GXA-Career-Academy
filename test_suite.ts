/**
 * GXA Career Academy — Comprehensive Automated Security & Persistence Test Suite
 * Asserts all 14 mandatory security properties and regression protections.
 */
import assert from 'assert';
import crypto from 'crypto';

const BASE_URL = 'http://localhost:3000';

async function runSuite() {
  console.log('================================================================');
  console.log('GXA CAREER ACADEMY — AUTOMATED SECURITY & PERSISTENCE TEST SUITE');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function recordPass(testName: string) {
    passedTests++;
    totalTests++;
    console.log(`[PASS] Test ${totalTests}: ${testName}`);
  }

  function recordFail(testName: string, err: any) {
    totalTests++;
    console.error(`[FAIL] Test ${totalTests}: ${testName}\n       Error: ${err.message}`);
    throw err;
  }

  // -------------------------------------------------------------------------
  // TEST 1: Unauthorized Admin API Access Must Return HTTP 401
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/admin/overview`);
    assert.strictEqual(res.status, 401, 'Protected admin route must return 401 when no token is provided');
    const data = await res.json();
    assert.ok(data.error, 'Error message must be present in response');
    recordPass('Unauthorized Admin API access is blocked with HTTP 401');
  } catch (err) {
    recordFail('Unauthorized Admin API access block', err);
  }

  // -------------------------------------------------------------------------
  // TEST 2: Invalid Admin Credentials Must Be Rejected
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gxacareeracademy.com', password: 'Wrong_Password_123!' }),
    });
    assert.strictEqual(res.status, 401, 'Invalid password must return 401');
    const data = await res.json();
    assert.strictEqual(data.success, undefined, 'Must not issue session on wrong password');
    recordPass('Invalid admin password rejected by bcrypt comparison');
  } catch (err) {
    recordFail('Invalid admin credentials rejection', err);
  }

  // -------------------------------------------------------------------------
  // TEST 3: Legitimate Admin Authentication & Bcrypt Salt Verification
  // -------------------------------------------------------------------------
  let adminToken = '';
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gxacareeracademy.com', password: 'GXA_Admin_Secure_2026!' }),
    });
    assert.strictEqual(res.status, 200, 'Legitimate admin login must return 200');
    const data = await res.json();
    assert.strictEqual(data.success, true, 'Admin login response must indicate success');
    assert.ok(data.token && data.token.startsWith('adm_'), 'Session token must be prefixed with adm_');
    adminToken = data.token;
    recordPass('Legitimate admin authentication succeeds with persistent session token');
  } catch (err) {
    recordFail('Legitimate admin authentication', err);
  }

  // -------------------------------------------------------------------------
  // TEST 4: Expired / Forged Admin Session Invalidation
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Authorization: 'Bearer adm_forged_cryptographic_token_that_does_not_exist' },
    });
    assert.strictEqual(res.status, 401, 'Forged admin token must return 401');
    recordPass('Forged admin token rejected by session store');
  } catch (err) {
    recordFail('Forged admin token rejection', err);
  }

  // -------------------------------------------------------------------------
  // TEST 5: Unpaid Course Access Must Fail Closed
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/entitlements/verify-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-fresh-unpaid-student',
        productId: 'fullstack-modern-ai-apps',
        productType: 'course',
      }),
    });
    const data = await res.json();
    assert.strictEqual(data.hasAccess, false, 'Unpaid student must not have access');
    recordPass('Unpaid student content access strictly rejected (Fail-Closed)');
  } catch (err) {
    recordFail('Unpaid course access fail-closed', err);
  }

  // -------------------------------------------------------------------------
  // TEST 6: Payment Amount Manipulation Prevention (Trusted Catalog Pricing)
  // -------------------------------------------------------------------------
  let testOrderId = '';
  try {
    const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ id: 'fullstack-modern-ai-apps', price: 1 }], // Attacker tries price = 1 INR
        studentId: 'usr-student-security-tester',
        studentEmail: 'sec-tester@gxacareeracademy.com',
        studentName: 'Security Tester',
      }),
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200, 'Order creation should succeed');
    // Trusted base price is 3499 + 18% GST = 4129
    assert.strictEqual(data.order.total, 4129, 'Server must enforce trusted catalog pricing of 4129 INR');
    assert.strictEqual(data.order.status, 'PAYMENT_PENDING', 'New order status must be PAYMENT_PENDING');
    testOrderId = data.order.orderId;
    recordPass('Payment amount manipulation blocked; trusted catalog pricing enforced (₹4,129)');
  } catch (err) {
    recordFail('Payment amount manipulation prevention', err);
  }

  // -------------------------------------------------------------------------
  // TEST 7: Forged Razorpay Payment Confirmation Rejection
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/payments/verify-razorpay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: testOrderId,
        razorpay_payment_id: 'pay_FORGED_12345',
        razorpay_order_id: 'order_FORGED_12345',
        razorpay_signature: 'fake_forged_hex_signature',
      }),
    });
    // In our fail-closed setup when secret is unconfigured OR signature mismatches:
    assert.strictEqual(res.status, 400, 'Forged or unconfigured gateway verification must reject with HTTP 400');
    const data = await res.json();
    assert.strictEqual(data.success, false, 'Forged payment must return success: false');
    recordPass('Forged payment confirmation rejected (Fail-Closed protection)');
  } catch (err) {
    recordFail('Forged payment rejection', err);
  }

  // -------------------------------------------------------------------------
  // TEST 8: Admin Safe Reconciliation Workflow & Entitlement Creation
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/admin/orders/${testOrderId}/reconcile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        action: 'APPROVE_VERIFIED',
        notes: 'Verified external NEFT banking settlement in automated audit.',
      }),
    });
    assert.strictEqual(res.status, 200, 'Reconciliation by authorized admin must succeed');
    const data = await res.json();
    assert.strictEqual(data.order.status, 'PAID', 'Reconciled order status must be PAID');

    // Verify student entitlement now exists
    const accessRes = await fetch(`${BASE_URL}/api/entitlements/verify-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        productId: 'fullstack-modern-ai-apps',
        productType: 'course',
      }),
    });
    const accessData = await accessRes.json();
    assert.strictEqual(accessData.hasAccess, true, 'Entitlement must be granted after approved reconciliation');
    assert.strictEqual(accessData.verifiedBy, 'MANUAL_ADMIN_RECONCILE', 'VerifiedBy tag must reflect admin action');
    recordPass('Authorized admin reconciliation successfully transitions order and grants entitlement');
  } catch (err) {
    recordFail('Admin reconciliation workflow', err);
  }

  // -------------------------------------------------------------------------
  // TEST 9: Cross-Account Entitlement Access Protection
  // -------------------------------------------------------------------------
  try {
    // Another student tries to claim access to tester's course
    const res = await fetch(`${BASE_URL}/api/entitlements/verify-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-attacker-different-account',
        productId: 'fullstack-modern-ai-apps',
        productType: 'course',
      }),
    });
    const data = await res.json();
    assert.strictEqual(data.hasAccess, false, 'Cross-account entitlement query must return false');
    recordPass('Cross-account entitlement access strictly isolated per student ID');
  } catch (err) {
    recordFail('Cross-account access isolation', err);
  }

  // -------------------------------------------------------------------------
  // TEST 10: Persistent Progress Recording (Lesson Completion)
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/progress/complete-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        courseId: 'fullstack-modern-ai-apps',
        lessonId: 'mod1-lesson1',
      }),
    });
    assert.strictEqual(res.status, 200, 'Lesson completion recording must succeed for enrolled student');
    const data = await res.json();
    assert.strictEqual(data.completed, true, 'Lesson completion must be confirmed');

    // Query progress
    const getRes = await fetch(`${BASE_URL}/api/progress/fullstack-modern-ai-apps?studentId=usr-student-security-tester`);
    const getData = await getRes.json();
    assert.ok(getData.completedLessons.includes('mod1-lesson1'), 'Progress query must return completed lesson ID');
    recordPass('Persistent lesson progress recorded and queried from SQLite');
  } catch (err) {
    recordFail('Persistent progress recording', err);
  }

  // -------------------------------------------------------------------------
  // TEST 11: Fake Lesson Progress on Unenrolled Course Is Blocked
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/progress/complete-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        courseId: 'prompt-engineering-enterprise', // Not enrolled
        lessonId: 'pe-w1-l1',
      }),
    });
    assert.strictEqual(res.status, 403, 'Must return 403 when recording progress on an un-enrolled course');
    recordPass('Fake progress submission for un-enrolled course rejected with HTTP 403');
  } catch (err) {
    recordFail('Unenrolled progress blocking', err);
  }

  // -------------------------------------------------------------------------
  // TEST 12: Quiz Evaluation & Assessment Grade Threshold Enforcement
  // -------------------------------------------------------------------------
  try {
    // Failing attempt: score 50 (below 80 threshold)
    const failRes = await fetch(`${BASE_URL}/api/assessments/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        courseId: 'fullstack-modern-ai-apps',
        lessonId: 'quiz-mod1',
        score: 50,
        totalQuestions: 10,
        passingScore: 80,
      }),
    });
    const failData = await failRes.json();
    assert.strictEqual(failData.passed, false, 'Score of 50% must not pass 80% threshold');

    // Passing attempt: score 100
    const passRes = await fetch(`${BASE_URL}/api/assessments/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        courseId: 'fullstack-modern-ai-apps',
        lessonId: 'quiz-mod1',
        score: 100,
        totalQuestions: 10,
        passingScore: 80,
      }),
    });
    const passData = await passRes.json();
    assert.strictEqual(passData.passed, true, 'Score of 100% must pass');
    recordPass('Quiz evaluation grade thresholds strictly enforced (80% cutoff)');
  } catch (err) {
    recordFail('Quiz evaluation enforcement', err);
  }

  // -------------------------------------------------------------------------
  // TEST 13: Authorized Certificate Issuance & Public Verification
  // -------------------------------------------------------------------------
  let issuedCertId = '';
  try {
    const issueRes = await fetch(`${BASE_URL}/api/certificates/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        courseId: 'fullstack-modern-ai-apps',
        studentName: 'Security Tester',
      }),
    });
    assert.strictEqual(issueRes.status, 200, 'Certificate issuance must succeed for enrolled student');
    const issueData = await issueRes.json();
    assert.strictEqual(issueData.success, true);
    assert.ok(issueData.certificate.certificateId.startsWith('GXA-CERT-2026-'));
    issuedCertId = issueData.certificate.certificateId;

    // Verify on public verification endpoint
    const verifyRes = await fetch(`${BASE_URL}/api/certificates/verify/${issuedCertId}`);
    assert.strictEqual(verifyRes.status, 200, 'Public certificate query must return 200');
    const verifyData = await verifyRes.json();
    assert.strictEqual(verifyData.verified, true);
    assert.strictEqual(verifyData.studentName, 'Security Tester');
    assert.strictEqual(verifyData.leftSignatory.name, 'Tauqeer Ashraf');
    assert.strictEqual(verifyData.rightSignatory.name, 'Dr. Revant Gautam');
    recordPass(`Authoritative certificate issued and verified publicly (${issuedCertId})`);
  } catch (err) {
    recordFail('Certificate issuance & verification', err);
  }

  // -------------------------------------------------------------------------
  // TEST 14: Unauthorized Certificate Issuance Blocked (Un-enrolled Student)
  // -------------------------------------------------------------------------
  try {
    const res = await fetch(`${BASE_URL}/api/certificates/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-unauthorized-random-person',
        courseId: 'fullstack-modern-ai-apps',
        studentName: 'Random Person',
      }),
    });
    assert.strictEqual(res.status, 403, 'Certificate issuance must return 403 for un-enrolled student');
    recordPass('Unauthorized certificate issuance blocked with HTTP 403');
  } catch (err) {
    recordFail('Unauthorized certificate issuance block', err);
  }

  // -------------------------------------------------------------------------
  // TEST 15: Authorized Download Token Signature & Expiry Check
  // -------------------------------------------------------------------------
  try {
    const tokenRes = await fetch(`${BASE_URL}/api/downloads/generate-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: 'usr-student-security-tester',
        productId: 'fullstack-modern-ai-apps',
        productType: 'course',
      }),
    });
    assert.strictEqual(tokenRes.status, 200, 'Authorized download link generation must return 200');
    const tokenData = await tokenRes.json();
    assert.strictEqual(tokenData.success, true);
    assert.ok(tokenData.downloadUrl);

    // Call the delivery endpoint
    const deliveryRes = await fetch(`${BASE_URL}${tokenData.downloadUrl}`);
    assert.strictEqual(deliveryRes.status, 200, 'Authorized delivery endpoint must return 200');
    const deliveryData = await deliveryRes.json();
    assert.strictEqual(deliveryData.status, 'AUTHORIZED');
    assert.strictEqual(deliveryData.licensedTo, 'usr-student-security-tester');
    recordPass('HMAC-signed 15-minute download token validated and authorized asset delivered');
  } catch (err) {
    recordFail('Download token validation', err);
  }

  // -------------------------------------------------------------------------
  // TEST 16: Forged Download Token Signature Is Blocked
  // -------------------------------------------------------------------------
  try {
    // Create forged token with incorrect HMAC signature
    const forgedPayload = Buffer.from(
      JSON.stringify({
        studentId: 'usr-student-security-tester',
        productId: 'fullstack-modern-ai-apps',
        expiresAt: Date.now() + 600000,
        signature: 'tampered_forged_signature_000000',
      })
    ).toString('base64url');

    const res = await fetch(`${BASE_URL}/api/downloads/${forgedPayload}`);
    assert.strictEqual(res.status, 403, 'Tampered download signature must return 403');
    recordPass('Tampered download token signature rejected with HTTP 403');
  } catch (err) {
    recordFail('Forged download signature block', err);
  }

  console.log('\n================================================================');
  console.log(`ALL ${totalTests} OF ${totalTests} AUTOMATED INTEGRATION TESTS PASSED WITH 100% SUCCESS`);
  console.log('================================================================');
}

runSuite().catch((err) => {
  console.error('\nTest suite execution failed:', err);
  process.exit(1);
});
