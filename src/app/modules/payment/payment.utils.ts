import PDFDocument from "pdfkit";


export const generateInvoicePdf = (
    payment: {
        transactionId: string;
        amount: number;
        customer: {
            name: string;
            email: string;
        };
        outage: {
            id: string;
            cause: string;
            description: string;
            priority: string;
        };
    },
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

        doc.fontSize(12);
        doc.text(`Transaction ID: ${payment.transactionId}`);
        doc.text(`Customer: ${payment.customer.name}`);
        doc.text(`Email: ${payment.customer.email}`);
        doc.moveDown();

        doc.text(`Outage Report ID: ${payment.outage.id}`);
        doc.text(`Cause: ${payment.outage.cause}`);
        doc.text(`Description: ${payment.outage.description}`);
        doc.text(`Priority: ${payment.outage.priority}`);
        doc.moveDown();

        doc.text(`Amount Paid: BDT ${payment.amount.toFixed(2)}`);
        doc.text("Payment Status: COMPLETED");

        doc.end();
    });
};