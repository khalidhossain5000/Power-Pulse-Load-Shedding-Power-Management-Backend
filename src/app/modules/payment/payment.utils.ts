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
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
            bufferPages: true,
        });

        const chunks: Buffer[] = [];

        const primary = "#2563EB";
        const dark = "#111827";
        const muted = "#6B7280";
        const border = "#E5E7EB";
        const light = "#F8FAFC";
        const green = "#15803D";

        doc.on("data", (chunk: Buffer) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        const pageWidth = doc.page.width;
        const contentWidth = pageWidth - 100;
        const left = 50;
        const right = pageWidth - 50;

        // Header background
        doc.save();
        doc.rect(0, 0, pageWidth, 155).fill("#EFF6FF");
        doc.restore();

        // Brand
        doc
            .fillColor(primary)
            .font("Helvetica-Bold")
            .fontSize(27)
            .text("PowerPulse", left, 38, {
                continued: true,
            });

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(9)
            .text("  |  POWER MANAGEMENT SYSTEM");

        doc
            .fillColor(dark)
            .font("Helvetica-Bold")
            .fontSize(24)
            .text("PAYMENT INVOICE", left, 88);

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Official payment receipt", left, 121);

        // Invoice label
        doc
            .roundedRect(right - 105, 35, 105, 27, 7)
            .fill("#DCFCE7");

        doc
            .fillColor(green)
            .font("Helvetica-Bold")
            .fontSize(9)
            .text("✓  PAID", right - 105, 44, {
                width: 105,
                align: "center",
            });

        // Payment summary
        let y = 180;

        doc
            .fillColor(muted)
            .font("Helvetica-Bold")
            .fontSize(9)
            .text("PAYMENT SUMMARY", left, y);

        y += 22;

        doc
            .roundedRect(left, y, contentWidth, 100, 12)
            .fill(light);

        doc
            .roundedRect(left, y, 5, 100, 2)
            .fill(primary);

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("TOTAL AMOUNT PAID", left + 20, y + 19);

        doc
            .fillColor(dark)
            .font("Helvetica-Bold")
            .fontSize(25)
            .text(`BDT ${payment.amount.toFixed(2)}`, left + 20, y + 39);

        doc
            .fillColor(green)
            .font("Helvetica-Bold")
            .fontSize(9)
            .text("COMPLETED", right - 115, y + 47, {
                width: 95,
                align: "right",
            });

        y += 128;

        // Section heading helper
        const drawSectionHeading = (title: string, top: number) => {
            doc
                .fillColor(dark)
                .font("Helvetica-Bold")
                .fontSize(12)
                .text(title, left, top);

            doc
                .moveTo(left, top + 22)
                .lineTo(right, top + 22)
                .strokeColor(border)
                .lineWidth(1)
                .stroke();
        };

        // Customer information
        drawSectionHeading("Customer Information", y);
        y += 38;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(9)
            .text("CUSTOMER NAME", left, y);

        doc
            .fillColor(dark)
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(payment.customer.name, left, y + 15, {
                width: contentWidth / 2 - 15,
            });

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(9)
            .text("EMAIL ADDRESS", left + contentWidth / 2, y);

        doc
            .fillColor(dark)
            .font("Helvetica")
            .fontSize(10)
            .text(payment.customer.email, left + contentWidth / 2, y + 15, {
                width: contentWidth / 2,
            });

        y += 60;

        // Transaction details
        drawSectionHeading("Transaction Details", y);
        y += 35;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Transaction ID", left, y);

        doc
            .fillColor(dark)
            .font("Helvetica-Bold")
            .fontSize(10)
            .text(payment.transactionId, left + 125, y, {
                width: contentWidth - 125,
            });

        y += 30;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Payment Status", left, y);

        doc
            .fillColor(green)
            .font("Helvetica-Bold")
            .fontSize(10)
            .text("COMPLETED", left + 125, y);

        y += 45;

        // Outage report details
        drawSectionHeading("Outage Report Details", y);
        y += 35;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Outage Report ID", left, y);

        doc
            .fillColor(dark)
            .font("Helvetica")
            .fontSize(10)
            .text(payment.outage.id, left + 125, y, {
                width: contentWidth - 125,
            });

        y += 27;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Cause", left, y);

        doc
            .fillColor(dark)
            .font("Helvetica")
            .fontSize(10)
            .text(payment.outage.cause, left + 125, y, {
                width: contentWidth - 125,
            });

        y += 27;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Priority", left, y);

        const priorityColor =
            payment.outage.priority.toUpperCase() === "HIGH"
                ? "#B91C1C"
                : payment.outage.priority.toUpperCase() === "MEDIUM"
                  ? "#B45309"
                  : "#15803D";

        doc
            .fillColor(priorityColor)
            .font("Helvetica-Bold")
            .fontSize(10)
            .text(payment.outage.priority, left + 125, y);

        y += 27;

        doc
            .fillColor(muted)
            .font("Helvetica")
            .fontSize(10)
            .text("Description", left, y);

        y += 17;

        doc
            .fillColor(dark)
            .font("Helvetica")
            .fontSize(10)
            .text(payment.outage.description, left, y, {
                width: contentWidth,
                lineGap: 4,
            });

        // Footer on every page
        const range = doc.bufferedPageRange();

        for (let i = range.start; i < range.start + range.count; i++) {
            doc.switchToPage(i);

            const footerY = doc.page.height - 55;

            doc
                .moveTo(left, footerY - 10)
                .lineTo(right, footerY - 10)
                .strokeColor(border)
                .lineWidth(1)
                .stroke();

            doc
                .fillColor(muted)
                .font("Helvetica")
                .fontSize(8)
                .text("PowerPulse | Power Management System", left, footerY, {
                    lineBreak: false,
                });

            doc
                .fillColor(muted)
                .font("Helvetica")
                .fontSize(8)
                .text(`Page ${i + 1} of ${range.count}`, right - 70, footerY, {
                    width: 70,
                    align: "right",
                    lineBreak: false,
                });
        }

        doc.end();
    });
};
