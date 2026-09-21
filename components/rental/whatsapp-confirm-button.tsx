"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Botón "Confirmar por WhatsApp" — 100% gratis, sin API de pago.
 * Abre WhatsApp con un mensaje prellenado que el CLIENTE envía él mismo al
 * número de la empresa. No permite adjuntar archivos (limitación de wa.me),
 * pero el contrato + documentos ya se enviaron completos por correo desde
 * /api/rental/send-contract.
 *
 * Uso en la página de éxito del checkout:
 *   const whatsappUrl = sessionStorage.getItem("rental_whatsapp_url");
 *   <WhatsAppConfirmButton whatsappUrl={whatsappUrl} />
 */
export function WhatsAppConfirmButton({
    whatsappUrl,
}: {
    whatsappUrl: string | null | undefined;
}) {
    if (!whatsappUrl) return null;

    return (
        <Button asChild variant="outline" className="w-full">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Confirmar por WhatsApp
            </a>
        </Button>
    );
}