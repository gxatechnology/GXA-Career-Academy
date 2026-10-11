import { jsPDF } from 'jspdf';

export interface CertificateSignatory {
  name: string;
  printedName: string;
  title: string;
  organization: string;
}

export interface CertificateData {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  courseCategory?: string;
  issueDate?: string;
  duration?: string;
  grade?: string;
  verificationUrl?: string;
  isVerified?: boolean;
  leftSignatory?: CertificateSignatory;
  rightSignatory?: CertificateSignatory;
  instructorName?: string;
}

export const DEFAULT_LEFT_SIGNATORY: CertificateSignatory = {
  name: 'Tauqeer Ashraf',
  printedName: 'Tauqeer Ashraf (MCA)',
  title: 'Founder & Lead Technical Architect',
  organization: 'GXA Technology',
};

export const DEFAULT_RIGHT_SIGNATORY: CertificateSignatory = {
  name: 'Dr. Revant Gautam',
  printedName: 'Dr. Revant Gautam',
  title: 'Author & Technical Advisory Lead',
  organization: 'GXA Career Academy',
};

/**
 * Generates an authoritative, premium vector PDF Certificate of Completion
 * adhering strictly to GXA Career Academy academic publishing standards.
 */
export const generateCertificatePDF = (data: CertificateData): jsPDF => {
  // A4 Landscape: 297mm x 210mm
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = 297;
  const height = 210;

  const leftSigner = data.leftSignatory || DEFAULT_LEFT_SIGNATORY;
  const rightSigner = data.rightSignatory || DEFAULT_RIGHT_SIGNATORY;
  const isVerified = data.isVerified !== false;

  // 1. Background Fill: Crisp Archival White
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, 'F');

  // 2. Outer Ornamental Forest Pine Frame (#072118)
  doc.setDrawColor(7, 33, 24);
  doc.setLineWidth(2.5);
  doc.rect(10, 10, width - 20, height - 20);

  // 3. Inner Terracotta Accent Border (#EA580C)
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.8);
  doc.rect(13, 13, width - 26, height - 26);

  // Fine Inner Emerald Line (#10B981)
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.rect(15, 15, width - 30, height - 30);

  // 4. Corner Ornaments (Symmetrical Terracotta & Forest Accents)
  const drawCorner = (x: number, y: number, dirX: number, dirY: number) => {
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(1.2);
    doc.line(x, y, x + dirX * 12, y);
    doc.line(x, y, x, y + dirY * 12);

    doc.setFillColor(7, 33, 24);
    doc.circle(x + dirX * 3, y + dirY * 3, 1.2, 'F');
  };

  drawCorner(17, 17, 1, 1);
  drawCorner(width - 17, 17, -1, 1);
  drawCorner(17, height - 17, 1, -1);
  drawCorner(width - 17, height - 17, -1, -1);

  // 5. Header: Parent Company & Platform
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(234, 88, 12); // Terracotta Orange
  doc.text('GXA TECHNOLOGY  •  ACADEMIC & PROFESSIONAL PRESS', width / 2, 25, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(7, 33, 24); // Deep Forest Pine
  doc.text('GXA Career Academy', width / 2, 33.5, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139); // Slate
  doc.text('Learn Today. Lead Tomorrow.', width / 2, 38.5, { align: 'center' });

  // Decorative divider line under brand
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.6);
  doc.line(width / 2 - 35, 41.5, width / 2 + 35, 41.5);
  doc.circle(width / 2, 41.5, 0.7, 'F');

  // 6. Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(7, 33, 24);
  doc.text('CERTIFICATE OF ACCOMPLISHMENT', width / 2, 50, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('THIS IS PROUDLY CONFERRED UPON', width / 2, 56.5, { align: 'center' });

  // 7. Student Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(7, 33, 24);
  const studentDisplayName = data.studentName?.trim() || 'Enrolled Student';
  doc.text(studentDisplayName, width / 2, 68, { align: 'center' });

  // Underline beneath name in Terracotta
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.8);
  const nameWidth = doc.getTextWidth(studentDisplayName);
  const halfUnderlineWidth = Math.max(45, nameWidth / 2 + 6);
  doc.line(width / 2 - halfUnderlineWidth, 71.5, width / 2 + halfUnderlineWidth, 71.5);

  // 8. Purpose & Criteria Statement
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'for successfully fulfilling all completion requirements, capstone project reviews,',
    width / 2,
    79,
    { align: 'center' }
  );
  doc.text(
    'and practical code implementation milestones with verified distinction in:',
    width / 2,
    84,
    { align: 'center' }
  );

  // 9. Course Title (Naturally Wrapped)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(4, 120, 87); // Rich Emerald
  const splitCourse = doc.splitTextToSize(data.courseTitle || 'Curriculum Masterclass', 220);
  doc.text(splitCourse, width / 2, 92.5, { align: 'center' });

  const numLines = Array.isArray(splitCourse) ? splitCourse.length : 1;
  const metaY = 92.5 + numLines * 5.2;

  // Additional syllabus metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const metaLine = `Curriculum Track: ${data.courseCategory || 'Applied AI Systems'}  •  Duration: ${data.duration || '8 Weeks Cohort'}  •  Grade: ${data.grade || '100% Distinction'}`;
  doc.text(metaLine, width / 2, metaY, { align: 'center' });

  // 10. Center Symmetrical Academic Verification Seal
  const sealX = width / 2;
  const sealY = 146;
  const outerR = 16.5;
  const innerR = 14.8;

  // Outer terracotta circular border
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(1.2);
  doc.circle(sealX, sealY, outerR, 'S');

  // Fine inner amber accent ring
  doc.setDrawColor(251, 146, 60);
  doc.setLineWidth(0.4);
  doc.circle(sealX, sealY, outerR - 0.8, 'S');

  // Deep Forest Pine Centre Fill
  doc.setFillColor(7, 33, 24);
  doc.circle(sealX, sealY, innerR, 'F');

  // Subtle Laurel Leaves on Left and Right Sides
  doc.setDrawColor(234, 88, 12);
  doc.setFillColor(234, 88, 12);
  doc.setLineWidth(0.4);

  // Left laurel branch arc
  doc.line(sealX - 11.8, sealY - 6.5, sealX - 12.8, sealY);
  doc.line(sealX - 12.8, sealY, sealX - 11.8, sealY + 6.5);
  doc.circle(sealX - 11, sealY - 4.5, 0.5, 'F');
  doc.circle(sealX - 12.2, sealY - 1.5, 0.5, 'F');
  doc.circle(sealX - 12.2, sealY + 1.5, 0.5, 'F');
  doc.circle(sealX - 11, sealY + 4.5, 0.5, 'F');

  // Right laurel branch arc
  doc.line(sealX + 11.8, sealY - 6.5, sealX + 12.8, sealY);
  doc.line(sealX + 12.8, sealY, sealX + 11.8, sealY + 6.5);
  doc.circle(sealX + 11, sealY - 4.5, 0.5, 'F');
  doc.circle(sealX + 12.2, sealY - 1.5, 0.5, 'F');
  doc.circle(sealX + 12.2, sealY + 1.5, 0.5, 'F');
  doc.circle(sealX + 11, sealY + 4.5, 0.5, 'F');

  // Small Graduation Cap Vector Icon in Center-Top of Seal
  const capY = sealY - 1;
  doc.setFillColor(251, 146, 60);
  doc.triangle(sealX, capY - 2.2, sealX - 4.2, capY - 0.7, sealX, capY + 0.8, 'F');
  doc.triangle(sealX, capY - 2.2, sealX + 4.2, capY - 0.7, sealX, capY + 0.8, 'F');
  doc.setDrawColor(234, 88, 12);
  doc.setLineWidth(0.4);
  doc.line(sealX - 2.4, capY + 0.5, sealX, capY + 1.6);
  doc.line(sealX, capY + 1.6, sealX + 2.4, capY + 0.5);
  // Cap Tassel
  doc.line(sealX + 3.2, capY - 0.5, sealX + 4.2, capY + 1.5);

  // Seal Text (All text strictly non-overlapping and inside circular boundary)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.8);
  doc.setTextColor(251, 146, 60); // Warm Amber
  doc.text('GXA TECHNOLOGY', sealX, sealY - 6.2, { align: 'center' });

  if (isVerified) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(255, 255, 255); // Pure White
    doc.text('VERIFIED', sealX, sealY + 4.2, { align: 'center' });
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(203, 213, 225); // Slate
    doc.text('PENDING', sealX, sealY + 4.2, { align: 'center' });
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.2);
  doc.setTextColor(251, 146, 60);
  doc.text('ACADEMIC STANDARDS', sealX, sealY + 9.2, { align: 'center' });

  // 11. Signatures Blocks (Completely Independent Data Fields)
  const sigY = 153;

  // LEFT SIGNATURE: Tauqeer Ashraf
  const sigLeftX = 65;
  doc.setFont('times', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(7, 33, 24);
  doc.text(leftSigner.name, sigLeftX, sigY - 3.5, { align: 'center' });

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(sigLeftX - 32, sigY, sigLeftX + 32, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(7, 33, 24);
  doc.text(leftSigner.printedName, sigLeftX, sigY + 4.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text(leftSigner.title, sigLeftX, sigY + 8.5, { align: 'center' });
  doc.text(leftSigner.organization, sigLeftX, sigY + 12.5, { align: 'center' });

  // RIGHT SIGNATURE: Dr. Revant Gautam
  const sigRightX = width - 65;
  doc.setFont('times', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(7, 33, 24);
  doc.text(rightSigner.name, sigRightX, sigY - 3.5, { align: 'center' });

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(sigRightX - 32, sigY, sigRightX + 32, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(7, 33, 24);
  doc.text(rightSigner.printedName, sigRightX, sigY + 4.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text(rightSigner.title, sigRightX, sigY + 8.5, { align: 'center' });
  doc.text(rightSigner.organization, sigRightX, sigY + 12.5, { align: 'center' });

  // 12. Bottom Security & Verification Footer
  const footerY = 188;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(20, footerY - 4, width - 20, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);

  const certIdText = `Certificate Credential ID: ${data.certificateId}`;
  doc.text(certIdText, 25, footerY);

  const issueDateText = `Issued on: ${data.issueDate || new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`;
  doc.text(issueDateText, width / 2, footerY, { align: 'center' });

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com';
  const resolvedVerifyUrl = data.verificationUrl || `${currentOrigin}/verify/${data.certificateId}`;
  const verifyText = `Online Verification: ${resolvedVerifyUrl}`;
  doc.text(verifyText, width - 25, footerY, { align: 'right' });

  return doc;
};

/**
 * Downloads the PDF directly to the student's browser in A4 landscape format
 */
export const downloadCertificatePDF = (data: CertificateData): void => {
  const doc = generateCertificatePDF(data);
  const sanitizedStudent = (data.studentName || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
  const sanitizedCourse = (data.courseTitle || 'Course').slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `GXA_Certificate_${sanitizedCourse}_${sanitizedStudent}.pdf`;
  doc.save(fileName);
};
