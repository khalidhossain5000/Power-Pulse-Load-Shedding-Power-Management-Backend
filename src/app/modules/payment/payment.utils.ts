import PDFDocument from "pdfkit";



export const generateInvoicePdf = (
  customer: {
    name: string;
    email: string;
  },
  outage: {
    id: string;
    cause: string;
    description: string;
    priority: string;
  },
  transId: string,
  amount: number,
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(22).text("PowerPulse", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text("Payment Invoice");
    doc.moveDown();

    doc.fontSize(12).text(`Transaction ID: ${transId}`);
    doc.text(`Customer: ${customer.name}`);
    doc.text(`Email: ${customer.email}`);
    doc.moveDown();

    doc.text(`Outage Report ID: ${outage.id}`);
    doc.text(`Cause: ${outage.cause}`);
    doc.text(`Description: ${outage.description}`);
    doc.text(`Priority: ${outage.priority}`);
    doc.moveDown();

    doc.text(`Amount Paid: BDT ${amount.toFixed(2)}`);
    doc.text(`Payment Date: ${new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
    })}`);
    doc.text("Payment Status: COMPLETED");

    doc.end();
  });
};

