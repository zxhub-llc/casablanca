import type { ZXRentalContract, ZXRentalBooking } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// FORMATTERS
// ─────────────────────────────────────────────────────────────────────────────

function formatMoney(amount: number): string {
    return (amount ?? 0).toLocaleString("es-EC", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/** ACF date_time_picker returns "Y-m-d H:i:s" */
function formatDate(value: string): string {
    if (!value) return "";
    const date = new Date(value.replace(" ", "T"));
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("es-EC", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reemplaza las variables {{...}} del `contractTemplate` (rental_contract)
 * con los datos reales de una reserva (rental_booking).
 *
 * Uso:
 *   const contract = await gqlFetch(GET_RENTAL_CONTRACT, { lang: "es" });
 *   const booking = await gqlFetch(GET_RENTAL_BOOKING, { orderId, email });
 *   const html = replaceContractVariables(contract.zxRentalContract, booking.zxRentalBooking);
 */
export function replaceContractVariables(
    contract: ZXRentalContract,
    booking: ZXRentalBooking
): string {
    const vehicle = booking.vehicle;
    const rentalData = booking.rentalData;

    const values: Record<string, string> = {
        // Empresa (fijo, viene del contrato)
        company_name: contract.companyName ?? "",
        company_legal_name: contract.companyLegalName ?? "",
        company_tax_id: contract.companyTaxId ?? "",
        company_address: contract.companyAddress ?? "",
        security_deposit_amount: formatMoney(contract.securityDepositAmount),

        // Cliente
        customer_name: booking.customerName ?? "",
        customer_document: booking.customerDocument ?? "",
        customer_license: booking.customerLicense ?? "",
        customer_email: booking.customerEmail ?? "",
        customer_phone: booking.customerPhone ?? "",
        customer_address: booking.customerAddress ?? "",

        // Vehículo — público (ZXProduct)
        vehicle_name: vehicle?.name ?? "",
        vehicle_category: vehicle?.categories?.[0]?.name ?? "",

        // Vehículo — legal/privado (ZXRentalVehicleData, solo vía zxRentalBooking)
        vehicle_plate: rentalData?.plate ?? "",
        vehicle_vin: rentalData?.vin ?? "",
        vehicle_year: rentalData?.year ? String(rentalData.year) : "",
        vehicle_color: rentalData?.color ?? "",
        vehicle_transmission: rentalData?.transmission ?? "",
        vehicle_fuel: rentalData?.fuel ?? "",

        // Logística
        pickup_date: formatDate(booking.pickupDate),
        pickup_location: booking.pickupLocation ?? "",
        return_date: formatDate(booking.returnDate),
        return_location: booking.returnLocation ?? "",
        total_days: String(booking.totalDays ?? ""),

        // Precios
        total_price: formatMoney(booking.totalPrice),
        deposit_amount: formatMoney(booking.depositAmount),
        pending_amount: formatMoney(booking.pendingAmount),
        payment_method: booking.paymentMethod ?? "",

        // Referencias
        booking_id: String(booking.id ?? ""),
        order_id: String(booking.orderId ?? ""),

        // Bloques legales (ya vienen en HTML/texto desde el contrato)
        cancellation_policy: contract.cancellationPolicy ?? "",
        terms_conditions: contract.termsConditions ?? "",
    };

    return Object.entries(values).reduce(
        (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
        contract.contractTemplate
    );
}