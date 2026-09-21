import type { ZXProduct } from "../woo/types"; // ajusta si tu carpeta se llama distinto

// ─────────────────────────────────────────────────────────────────────────────
// RENTAL CONTRACT
// ─────────────────────────────────────────────────────────────────────────────

export interface ZXRentalContract {
    id: number;
    title: string;
    lang?: string;
    contractTemplate: string;
    documentsEmailTemplate: string;
    cancellationPolicy: string;
    termsConditions: string;
    companyName: string;
    companyLegalName: string;
    companyTaxId: string;
    companyAddress: string;
    securityDepositAmount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENTAL BOOKING
// ─────────────────────────────────────────────────────────────────────────────

export type RentalBookingStatus =
    | "pending"
    | "documents_pending"
    | "approved"
    | "completed"
    | "cancelled";

/**
 * Datos LEGALES del vehículo, privados: solo llegan dentro de
 * zxRentalBooking (ya protegido por admin u orderId+email), nunca a través
 * de zxProduct / zxProducts. Vienen del grupo ACF rental-vehicle-data.php.
 */
export interface ZXRentalVehicleData {
    plate: string;
    vin: string;
    year: number;
    color: string;
    transmission: string;
    fuel: string;
}

export interface ZXRentalBooking {
    id: number;
    status: RentalBookingStatus;
    orderId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerDocument: string;
    customerLicense: string;
    customerAddress: string;
    pickupDate: string;
    pickupLocation: string;
    returnDate: string;
    returnLocation: string;
    totalDays: number;
    totalPrice: number;
    depositAmount: number;
    pendingAmount: number;
    paymentMethod: string;
    documentsSent: boolean;
    documentsSentAt: string;
    contractAccepted: boolean;
    contractAcceptedAt: string;
    /** Producto público completo del vehículo (categorías, imagen, specs públicos, etc). */
    vehicle: ZXProduct | null;
    /** Datos legales privados del vehículo, solo para el contrato. */
    rentalData: ZXRentalVehicleData | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// GRAPHQL RESPONSE WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────

export interface GetRentalContractResponse {
    zxRentalContract: ZXRentalContract | null;
}

export interface GetRentalBookingResponse {
    zxRentalBooking: ZXRentalBooking | null;
}