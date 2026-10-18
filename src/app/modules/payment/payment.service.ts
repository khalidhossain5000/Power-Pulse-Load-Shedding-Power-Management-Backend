//intiate payment and create payment

import axios from "axios";

import path from "path"
import ejs from "ejs"
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import { OutagePriority, PaymentStatus, Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { generateInvoicePdf } from "./payment.utils";
import { transporter } from "../../lib/nodemailer";

const createPaymentInDb = async (
    outageReportId: string,
    customerId: string
) => {
    // console.log(tenantId,'tenatn id from paymetn service')
    const transId = `TRX_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    //fetch customer who requested to pay
    const customer = await prisma.user.findUniqueOrThrow({
        where:
        {
            id: customerId,
            role: Role.CUSTOMER
        },
    });
    //find outage if it is exist or not
    const outageReport = await prisma.outage.findUniqueOrThrow({
        where: {
            id: outageReportId,
        },
        include: {
            user: true
        }
    });
    // checking ownership if this outage is added and  by current logged in user
    if (outageReport.userId !== customer.id)
        throw {
            statusCode: httpStatus.FORBIDDEN,
            name: "Forbidden",
            message:
                "You are not allowed to pay for this Outage since this is not you added.Pay for your own",
        };

    //checking if same current user already paid for this outage or not

    const existingPayment = await prisma.payment.findFirst({
        where: {
            outageReportId,
            customerId,
            status: PaymentStatus.COMPLETED,
        },
    });
    if (existingPayment)
        throw {
            statusCode: httpStatus.CONFLICT,
            name: "Conflict error",
            message: "You already paid for this outage report Wait for admin tech further step.",
        };

    // initiating payment here
    const paymentData = {
        store_id: config.ssl_commerz_store_id,
        store_passwd: config.ssl_commerz_store_pass,
        total_amount: config.outage_priority_payment_fee,
        currency: "BDT",
        tran_id: transId,
        success_url: `${config.app_url}/api/v1/payment/confirm?outageReportId=${outageReportId}&tranId=${transId}&status=success`,
        fail_url: `${config.app_url}/api/v1/payment/confirm?outageReportId=${outageReportId}&tranId=${transId}&status=fail`,
        cancel_url: `${config.app_url}/api/v1/payment/confirm?outageReportId=${outageReportId}&tranId=${transId}&status=cancel`,
        cus_name: `${customer.name}`,
        cus_email: customer.email,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        // cus_phone: "01711111111",
        cus_fax: "01711111111",
    };
    //axios hittign the sslxomerz url
    const res = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
    );
    const data = res.data;

    await prisma.payment.create({
        data: {
            transactionId: transId,
            provider: "SSL_Commerz",
            amount: config.outage_priority_payment_fee as string,
            customerId,
            outageReportId
        },
    });
    return { paymentGatewayUrl: data.GatewayPageURL };
};










//payment confirm and verify payment that the payment is successfully done

const verifySslCommerzPayment = async (
    transId: string,
    status: string,
    val_id: string,

) => {
    const response = await axios.post(
        `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${config.ssl_commerz_store_id}&store_passwd=${config.ssl_commerz_store_pass}&format=json
`,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
    );

    const paymentData = response.data;








//mai n update done here
    if (paymentData.status === "VALID") {
      const verifiedPayment =  await prisma.$transaction(async (tx) => {
            const payment = await tx.payment.findUniqueOrThrow({
                where: {
                    transactionId: transId,
                },
                include: {
                    customer: true,
                    outage: true
                },
            });

            await tx.payment.update({
                where: {
                    transactionId: transId,
                },
                data: {
                    status: PaymentStatus.COMPLETED,
                    paidAt:new Date()
                },
            });

            await tx.outage.update({
                where: {
                    id: payment.outageReportId,
                },
                data: {
                    priority: OutagePriority.HIGH
                },
            });
        
            return {
                ...payment,
                outage:{
                    ...payment.outage,
                    priority: OutagePriority.HIGH,
                }
            }

        });
        const invoicePdf = await generateInvoicePdf({
    transactionId: verifiedPayment.transactionId,
    amount: Number(verifiedPayment.amount),
    customer: verifiedPayment.customer,
    outage: verifiedPayment.outage,
});
const templatePath = path.join(
    process.cwd(),
    "src/app/templates/payment-invoice.ejs",
);

const html = await ejs.renderFile(templatePath, {
    name: verifiedPayment.customer.name,
    transactionId: verifiedPayment.transactionId,
    amount: Number(verifiedPayment.amount).toFixed(2),
    paidAt: new Date().toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
    }),
    outageId: verifiedPayment.outage.id,
    outageCause: verifiedPayment.outage.cause,
});

await transporter.sendMail({
    from: config.smtp_user,
    to: verifiedPayment.customer.email,
    subject: "PowerPulse Payment Invoice",
    html,
    attachments: [
        {
            filename: `invoice-${verifiedPayment.transactionId}.pdf`,
            content: invoicePdf,
            contentType: "application/pdf",
        },
    ],
});
    } else if (
        paymentData.status === "FAILED" ||
        paymentData.status === "INVALID_TRANSACTION"
    ) {
        await prisma.payment.update({
            where: {
                transactionId: transId,
            },
            data: {
                status: PaymentStatus.FAILED,
            },
        });
    }

    return status;
};

//get downloa d link of pdf invoice 
const getInvoicePdf = async (
    transId: string,
    customerId: string,
) => {
    const payment = await prisma.payment.findFirstOrThrow({
        where: {
            transactionId: transId,
            customerId,
            status: PaymentStatus.COMPLETED,
        },
        include: {
            customer: true,
            outage: true,
        },
    });

    const invoicePdf = await generateInvoicePdf({
        transactionId: payment.transactionId,
        amount: Number(payment.amount),
        customer: payment.customer,
        outage: payment.outage,
    });

    return invoicePdf;
};


//get  users payment history
const paymentHistoryFromDb = async (customerId: string) => {
    const result = await prisma.payment.findMany({
        where: {
            customerId
        },
        include: {
            customer: {
                omit: {
                    password: true
                }
            },
            outage: true
        },
    });
    console.log(result, "this is result paymentHistoryFromDb");
    return result;
};

//get payment details
const paymentDetailsFromDb = async (paymentId: string, customerId: string) => {
    const result = await prisma.payment.findUniqueOrThrow({
        where: {
            id: paymentId,
            customerId
        },
        include: {
            customer: {
                omit: {
                    password: true
                }
            },
            outage: true
        },
    });
    return result;
};

export const paymentServices = {
    createPaymentInDb,
    verifySslCommerzPayment,
    paymentHistoryFromDb,
    paymentDetailsFromDb,
    getInvoicePdf
};
