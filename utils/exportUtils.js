const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const exportToExcel = async (bookings) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Bookings");

  worksheet.columns = [
    { header: "Name", key: "name", width: 20 },
    { header: "Email", key: "email", width: 25 },
    { header: "Book Title", key: "bookTitle", width: 25 },
    { header: "Quantity", key: "quantity", width: 10 },
    { header: "Address", key: "address", width: 30 },
    { header: "Status", key: "status", width: 15 },
  ];

  bookings.forEach((booking) => {
    worksheet.addRow({
      name: booking.user.name,
      email: booking.user.email,
      bookTitle: booking.bookTitle,
      quantity: booking.quantity,
      address: booking.address,
      status: booking.status,
    });
  });

  const filePath = path.join(__dirname, "../exports/bookings.xlsx");
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};

const exportToPDF = (bookings) => {
  const filePath = path.join(__dirname, "../exports/bookings.pdf");
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Bookings Report", { align: "center" }).moveDown();

  bookings.forEach((b, i) => {
    doc
      .fontSize(12)
      .text(`${i + 1}. Name: ${b.user.name}`)
      .text(`   Email: ${b.user.email}`)
      .text(`   Book: ${b.bookTitle}`)
      .text(`   Quantity: ${b.quantity}`)
      .text(`   Address: ${b.address}`)
      .text(`   Status: ${b.status}`)
      .moveDown();
  });

  doc.end();
  return filePath;
};

module.exports = { exportToExcel, exportToPDF };
