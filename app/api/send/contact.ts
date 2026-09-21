"use server";

import { resend } from "@/lib/resend";
import { ContactAdminEmail } from "@/components/sections/components/email/admin/contact-admin-email";
import { ContactConfirmationEmail } from "@/components/sections/components/email/customer/contact-confirmation-email";

export async function submitContactForm(
    values: Record<string, string>
) {
    const email =
        values.email;

    const name =
        values.name || "Cliente";

    if (!email) {
        throw new Error(
            "Email requerido"
        );
    }

    const [customerResult, adminResult] =
        await Promise.all([
            resend.emails.send({
                from: process.env.EMAIL_FROM!,
                to: [email],

                subject:
                    "Hemos recibido tu mensaje",

                react:
                    ContactConfirmationEmail({
                        name,
                    }),
            }),

            resend.emails.send({
                from: process.env.EMAIL_FROM!,
                to: [
                    process.env.ADMIN_EMAIL!,
                ],

                subject:
                    "Nuevo mensaje de contacto",

                react:
                    ContactAdminEmail({
                        values,
                    }),
            }),
        ]);

    if (
        customerResult.error ||
        adminResult.error
    ) {
        throw new Error(
            customerResult.error
                ?.message ||
            adminResult.error
                ?.message ||
            "Error enviando email"
        );
    }

    return {
        success: true,
    };
}