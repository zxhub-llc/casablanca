"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { getPaymentGateways } from "@/lib/graphql";
import type { ZXPaymentGateway } from "@/lib/graphql";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PaymentInstructions } from "@/components/rental/payment-instructions";

// Requiere shadcn dialog + radio-group si no los tienes:
//   npx shadcn@latest add dialog radio-group

interface PaymentMethodDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId: number | null;
}

/**
 * Modal de pago — vive DENTRO del checkout, nunca navega a otra página ni a
 * una vista de WordPress.
 *
 * - Al elegir un gateway MANUAL (transferencia/cheque/COD), se muestran sus
 *   instrucciones (y datos de cuenta si aplica) ahí mismo, antes de pagar.
 * - Al confirmar: si el resultado es una página propia de WooCommerce
 *   (order-received/order-pay/wp-json/wp-admin) o no hay redirect externo,
 *   se cierra el modal y se navega a /checkout/success?order=X&method=Y —
 *   esa página vuelve a mostrar las mismas instrucciones.
 * - Si el gateway sí devuelve un procesador externo real (Stripe, PayPal,
 *   Payphone, PlacetoPay, Kushki...), se abre en una ventana emergente — el
 *   tab principal nunca navega ni pierde el checkout.
 */
export function PaymentMethodDialog({
    open,
    onOpenChange,
    orderId,
}: PaymentMethodDialogProps) {
    const router = useRouter();
    const [gateways, setGateways] = useState<ZXPaymentGateway[]>([]);
    const [selected, setSelected] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        setLoading(true);
        setError(null);

        getPaymentGateways()
            .then((list) => {
                const enabled = list.filter((g) => g.enabled);
                setGateways(enabled);
                if (enabled[0]) setSelected(enabled[0].id);
            })
            .catch(() => setError("No se pudieron cargar los métodos de pago."))
            .finally(() => setLoading(false));
    }, [open]);

    const selectedGateway = gateways.find((g) => g.id === selected) ?? null;

    async function handlePay() {
        if (!selected || !orderId) return;
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/rental/process-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, paymentMethod: selected }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "No se pudo procesar el pago.");
                setSubmitting(false);
                return;
            }

            // Gateways manuales (transferencia/cheque/COD): WooCommerce no manda a
            // ningún procesador externo, solo redirige a SU PROPIA página de
            // "gracias por tu compra" (/checkout/order-received/... o
            // /checkout/order-pay/...). Eso vive en el dominio de WordPress y
            // NUNCA debe mostrarse — ni en popup ni de ninguna forma. Cerramos el
            // modal y vamos directo a nuestra página de éxito, pasando el gateway
            // usado para volver a mostrar sus instrucciones ahí.
            const isWooCommerceOwnPage =
                !data.redirectUrl ||
                data.redirectUrl.includes(window.location.host) ||
                data.redirectUrl.includes("/checkout/order-received/") ||
                data.redirectUrl.includes("/checkout/order-pay/") ||
                data.redirectUrl.includes("/wp-json/") ||
                data.redirectUrl.includes("/wp-admin/");

            if (isWooCommerceOwnPage) {
                onOpenChange(false);
                router.push(`/checkout/success?order=${orderId}&method=${selected}`);
                return;
            }

            // Gateway de redirect: ese destino es el PROCESADOR real
            // (Stripe/PayPal/Payphone/PlacetoPay/Datafast/Kushki...), nunca
            // WordPress — se abre en ventana emergente, el tab principal se queda
            // en el checkout.
            const popup = window.open(
                data.redirectUrl,
                "zx-payment",
                "width=520,height=720,noopener,noreferrer"
            );

            if (!popup) {
                setError(
                    "Tu navegador bloqueó la ventana de pago. Habilita popups para este sitio e inténtalo de nuevo."
                );
                setSubmitting(false);
                return;
            }

            setSubmitting(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error de conexión");
            setSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Método de pago</DialogTitle>
                    <DialogDescription>
                        {orderId
                            ? `Orden #${orderId} — elige cómo quieres pagar el anticipo de tu reserva.`
                            : "Elige cómo quieres pagar el anticipo de tu reserva."}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {gateways.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No hay métodos de pago habilitados. Contacta a la empresa para coordinar el pago.
                            </p>
                        ) : (
                            <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
                                {gateways.map((g) => (
                                    <div key={g.id} className="space-y-2">
                                        <div className="flex items-start gap-3 rounded-md border p-3">
                                            <RadioGroupItem value={g.id} id={g.id} className="mt-1" />
                                            <Label htmlFor={g.id} className="flex-1 cursor-pointer">
                                                <span className="block font-medium">{g.title}</span>
                                            </Label>
                                        </div>

                                        {/* Instrucciones del gateway seleccionado (transferencia,
                        cheque, contra reembolso, etc.) — se ven ANTES de pagar. */}
                                        {selected === g.id && <PaymentInstructions gateway={g} />}
                                    </div>
                                ))}
                            </RadioGroup>
                        )}

                        <Button
                            className="w-full"
                            size="lg"
                            disabled={!selected || submitting}
                            onClick={handlePay}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                "Pagar"
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}