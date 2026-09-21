"use server";

import { resend } from "@/lib/resend";
import { NewsletterAdminEmail } from "@/components/sections/components/email/admin/newsletter-admin-email";
import { NewsletterWelcomeEmail } from "@/components/sections/components/email/customer/newsletter-welcome-email";


export async function subscribeNewsletter(
    email: string
) {
    const valid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    if (!valid) {
        throw new Error(
            "Correo electrónico inválido"
        );
    }

    const [customerResult, adminResult] =
        await Promise.all([
            resend.emails.send({
                from: process.env.EMAIL_FROM!,
                to: [email],
                subject:
                    "Bienvenido a Iscarsa",
                react:
                    NewsletterWelcomeEmail({
                        email,
                    }),
            }),

            resend.emails.send({
                from: process.env.EMAIL_FROM!,
                to: [
                    process.env.ADMIN_EMAIL!,
                ],
                subject:
                    "Nuevo suscriptor al newsletter",
                react:
                    NewsletterAdminEmail({
                        email,
                    }),
            }),
        ]);

    if (
        customerResult.error ||
        adminResult.error
    ) {
        throw new Error(
            customerResult.error?.message ||
            adminResult.error?.message ||
            "No se pudo enviar el correo"
        );
    }

    return {
        success: true,
        customerId:
            customerResult.data?.id,
        adminId:
            adminResult.data?.id,
    };
}