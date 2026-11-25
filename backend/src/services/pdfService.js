import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Translates digit count to formal Malay word formatting
 */
const getNumberWord = (num) => {
  const words = ['kosong', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan', 'sepuluh'];
  return words[num] || String(num);
};

export const generateWarningPDF = async (student, records, warningIndex) => {
  const pdfDoc = await PDFDocument.create();
  // Standard A4 Size: 595.275 x 841.890 points
  const page = pdfDoc.addPage([595.275, 841.890]);
  const { width, height } = page.getSize();

  // Embed standard Helvetica fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Layout bounds
  const margin = 50;
  let currentY = height - 50; // Start with top padding

  // Helper to draw text centered horizontally
  const drawCenteredText = (text, size = 10, font = fontRegular, color = rgb(0, 0, 0), leading = 15) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (width - textWidth) / 2;
    page.drawText(text, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
    currentY -= leading;
  };

  // Helper to draw left-aligned paragraph text with font-width based wrapping
  const drawParagraph = (text, size = 10, font = fontRegular, leading = 14, indent = 0) => {
    const maxWidth = width - (margin * 2) - indent;
    const words = text.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth) {
        page.drawText(currentLine, {
          x: margin + indent,
          y: currentY,
          size,
          font,
          color: rgb(0, 0, 0),
        });
        currentY -= leading;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      page.drawText(currentLine, {
        x: margin + indent,
        y: currentY,
        size,
        font,
        color: rgb(0, 0, 0),
      });
      currentY -= leading;
    }
  };

  // 1. Centered Institution Header
  drawCenteredText('KOLEJ VOKASIONAL ARAU', 13, fontBold, rgb(0, 0, 0), 16);
  drawCenteredText('Jalan Tengku Budriah, 02600 Arau, Perlis', 9, fontRegular, rgb(0.1, 0.1, 0.1), 13);
  drawCenteredText('Tel: 04-986 1234 | Faks: 04-986 5678 | E-mel: kvaarau@moe.edu.my', 9, fontRegular, rgb(0.1, 0.1, 0.1), 18);

  // Thick solid black line below header
  page.drawLine({
    start: { x: margin, y: currentY },
    end: { x: width - margin, y: currentY },
    thickness: 2,
    color: rgb(0, 0, 0),
  });
  currentY -= 20;

  // 2. Reference & Date Metadata
  const dateStr = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD format
  const refNo = `Ruj. Kami: KVA/DISP/2026/WL${warningIndex}/${student.studentNumber}`;

  page.drawText(refNo, { x: margin, y: currentY, size: 9.5, font: fontRegular });
  
  const dateLabel = `Tarikh: ${dateStr}`;
  const dateWidth = fontRegular.widthOfTextAtSize(dateLabel, 9.5);
  page.drawText(dateLabel, { x: width - margin - dateWidth, y: currentY, size: 9.5, font: fontRegular });
  currentY -= 25;

  // 3. Recipient Info block (No headers, labels or phone numbers)
  page.drawText(student.parentName, { x: margin, y: currentY, size: 10.5, font: fontBold });
  currentY -= 14;
  page.drawText('Ibu Bapa/Penjaga kepada', { x: margin, y: currentY, size: 9.5, font: fontRegular });
  currentY -= 14;
  page.drawText(student.name, { x: margin, y: currentY, size: 10.5, font: fontBold });
  currentY -= 14;
  page.drawText(student.className || '', { x: margin, y: currentY, size: 9.5, font: fontRegular });
  currentY -= 35;

  // 4. Letter Title (Centered, bold, and underlined)
  let titleText = '';
  if (warningIndex === 1) {
    titleText = 'SURAT AMARAN DISIPLIN PERTAMA';
  } else if (warningIndex === 2) {
    titleText = 'SURAT AMARAN DISIPLIN KEDUA';
  } else {
    titleText = 'SURAT AMARAN DISIPLIN KETIGA (TERAKHIR)';
  }

  const titleWidth = fontBold.widthOfTextAtSize(titleText, 11);
  const titleX = (width - titleWidth) / 2;
  
  page.drawText(titleText, {
    x: titleX,
    y: currentY,
    size: 11,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // Draw the underline matching title length exactly
  page.drawLine({
    start: { x: titleX, y: currentY - 2 },
    end: { x: titleX + titleWidth, y: currentY - 2 },
    thickness: 1.5,
    color: rgb(0, 0, 0),
  });
  currentY -= 30;

  // 5. Letter Intro
  page.drawText('Dengan hormatnya perkara di atas dirujuk.', { x: margin, y: currentY, size: 10, font: fontRegular });
  currentY -= 20;

  const totalKes = records.length;
  const kesWord = getNumberWord(totalKes);
  const introBody = `2. Sukacita dimaklumkan bahawa pihak sekolah telah merekodkan sejumlah ${totalKes} (${kesWord}) kes kesalahan disiplin melibatkan anak anda, ${student.name}, seperti berikut:`;
  drawParagraph(introBody, 10, fontRegular, 14, 0);
  currentY -= 15;

  // 6. Minimalist Table of Offences
  const colX = [margin, margin + 30, margin + 110, margin + 395];
  const colW = [30, 80, 285, 100]; // Sums up to 495 (Width is 595 - 2*margin)
  const rowHeight = 20;

  // Helper to draw a single cell with borders and text
  const drawCell = (x, y, w, h, text, font, size, align = 'left') => {
    // Cell border
    page.drawRectangle({
      x,
      y,
      width: w,
      height: h,
      borderColor: rgb(0.75, 0.75, 0.75),
      borderWidth: 0.5,
    });
    
    // Cell text padding/alignment
    let textX = x + 6;
    if (align === 'center') {
      const tw = font.widthOfTextAtSize(text, size);
      textX = x + (w - tw) / 2;
    }
    
    page.drawText(text, {
      x: textX,
      y: y + (h - size) / 2 - 1,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  // Draw Headers
  drawCell(colX[0], currentY - rowHeight, colW[0], rowHeight, 'Bil.', fontBold, 9.5, 'center');
  drawCell(colX[1], currentY - rowHeight, colW[1], rowHeight, 'Tarikh', fontBold, 9.5, 'left');
  drawCell(colX[2], currentY - rowHeight, colW[2], rowHeight, 'Salah Laku', fontBold, 9.5, 'left');
  drawCell(colX[3], currentY - rowHeight, colW[3], rowHeight, 'Kategori', fontBold, 9.5, 'left');
  currentY -= rowHeight;

  // Render Rows
  let count = 1;
  for (const rec of records) {
    const recDate = new Date(rec.date).toLocaleDateString('sv-SE'); // YYYY-MM-DD format
    const category = rec.offenceType.category === 'Major' ? 'Serius' : rec.offenceType.category === 'Medium' ? 'Sederhana' : 'Ringan';
    const offenceName = rec.offenceType.name.substring(0, 52); // Ensure it fits comfortably

    drawCell(colX[0], currentY - rowHeight, colW[0], rowHeight, String(count), fontRegular, 9, 'center');
    drawCell(colX[1], currentY - rowHeight, colW[1], rowHeight, recDate, fontRegular, 9, 'left');
    drawCell(colX[2], currentY - rowHeight, colW[2], rowHeight, offenceName, fontRegular, 9, 'left');
    drawCell(colX[3], currentY - rowHeight, colW[3], rowHeight, category, fontRegular, 9, 'left');
    
    currentY -= rowHeight;
    count++;
  }
  currentY -= 20;

  // 7. Follow-up Paragraphs
  const paragraph3 = '3. Pihak sekolah amat berharap agar tuan/puan dapat mengambil perhatian yang serius terhadap perkara ini dan mengambil tindakan yang sewajarnya bagi memastikan anak tuan/puan tidak mengulangi kesalahan yang sama.';
  drawParagraph(paragraph3, 10, fontRegular, 14, 0);
  currentY -= 10;

  const paragraph4 = '4. Sekiranya anak tuan/puan terus melakukan pelanggaran disiplin, pihak sekolah terpaksa mengambil tindakan yang lebih tegas mengikut Peraturan-Peraturan Pendidikan (Disiplin Sekolah) 1959.';
  drawParagraph(paragraph4, 10, fontRegular, 14, 0);
  currentY -= 25;

  // 8. Sign-off block
  page.drawText('Yang menjalankan amanah,', { x: margin, y: currentY, size: 10, font: fontRegular });
  currentY -= 50;

  // Signature line
  page.drawLine({
    start: { x: margin, y: currentY },
    end: { x: margin + 150, y: currentY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  currentY -= 12;

  page.drawText('( KETUA JAWATANKUASA DISIPLIN )', { x: margin, y: currentY, size: 9.5, font: fontBold });
  currentY -= 12;
  page.drawText('b/p Pengarah', { x: margin, y: currentY, size: 9, font: fontRegular });
  currentY -= 12;
  page.drawText('Kolej Vokasional Arau, Perlis', { x: margin, y: currentY, size: 9, font: fontRegular });

  // Save and serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
