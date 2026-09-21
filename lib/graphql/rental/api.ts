import {
    CACHE_TTL,
    graphqlFetchGraceful,
} from "../fetch";

import * as Q from "./queries";

import type {
    GetRentalBookingResponse,
    GetRentalContractResponse,
    ZXRentalBooking,
    ZXRentalContract,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSFORMS
// ─────────────────────────────────────────────────────────────────────────────
// (inline por ahora — muévelas a ./transforms.ts si crecen, igual que
// woocommerce/transforms.ts)

function normalizeRentalContract(raw: ZXRentalContract): ZXRentalContract {
    return {
        ...raw,
        securityDepositAmount: Number(raw.securityDepositAmount ?? 0),
    };
}

function normalizeRentalBooking(raw: ZXRentalBooking): ZXRentalBooking {
    return {
        ...raw,
        totalDays: Number(raw.totalDays ?? 0),
        totalPrice: Number(raw.totalPrice ?? 0),
        depositAmount: Number(raw.depositAmount ?? 0),
        pendingAmount: Number(raw.pendingAmount ?? 0),
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// VEHICLE AVAILABILITY
// ─────────────────────────────────────────────────────────────────────────────
//
// Rangos de fechas ya reservadas para un vehículo. Úsalo para deshabilitar
// esos días en el calendario del checkout (ver RentalReservationFields.tsx).

export interface ZXVehicleBookedRange {
    pickupDate: string; // "Y-m-d H:i:s"
    returnDate: string;
}

export async function getVehicleAvailability(
    vehicleId: number
): Promise<ZXVehicleBookedRange[]> {
    const data = await graphqlFetchGraceful<{
        zxVehicleAvailability: ZXVehicleBookedRange[];
    }>(
        Q.GET_VEHICLE_AVAILABILITY,
        { zxVehicleAvailability: [] },
        { vehicleId },
        ["rental", `vehicle-availability-${vehicleId}`],
        CACHE_TTL.products
    );
    return data.zxVehicleAvailability ?? [];
}

// ─────────────────────────────────────────────────────────────────────────────
// RENTAL CONTRACT
// ─────────────────────────────────────────────────────────────────────────────

export async function getRentalContract(
    lang?: string
): Promise<ZXRentalContract | null> {
    const data = await graphqlFetchGraceful<GetRentalContractResponse>(
        Q.GET_RENTAL_CONTRACT,
        { zxRentalContract: null },
        { lang },
        ["rental", "rental-contract"],
        CACHE_TTL.products
    );
    return data.zxRentalContract ? normalizeRentalContract(data.zxRentalContract) : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENTAL BOOKING
// ─────────────────────────────────────────────────────────────────────────────
//
// Contiene PII del cliente — NUNCA se cachea (TTL 0) y siempre requiere
// orderId + email (o sesión admin), igual que getOrder()/getOrders().

export async function getRentalBookingByOrder(
    orderId: number,
    email: string,
    headers?: Record<string, string>
): Promise<ZXRentalBooking | null> {
    const data = await graphqlFetchGraceful<GetRentalBookingResponse>(
        Q.GET_RENTAL_BOOKING,
        { zxRentalBooking: null },
        { orderId, email },
        [],
        0, // nunca cachear — PII + cambia con el estado de la reserva
        headers
    );
    return data.zxRentalBooking ? normalizeRentalBooking(data.zxRentalBooking) : null;
}

export async function getRentalBookingById(
    id: number,
    headers?: Record<string, string>
): Promise<ZXRentalBooking | null> {
    const data = await graphqlFetchGraceful<GetRentalBookingResponse>(
        Q.GET_RENTAL_BOOKING,
        { zxRentalBooking: null },
        { id },
        [],
        0,
        headers
    );
    return data.zxRentalBooking ? normalizeRentalBooking(data.zxRentalBooking) : null;
}