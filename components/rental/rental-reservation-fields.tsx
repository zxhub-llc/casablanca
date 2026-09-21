"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarDays, FileText, IdCard, MapPin, Upload, X } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
    getVehicleAvailability,
    type ZXVehicleBookedRange,
} from "@/lib/graphql/rental/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface UploadedFile {
    name: string;
    type: string;
    /** base64 SIN el prefijo "data:...;base64," */
    base64: string;
}

export interface RentalReservationData {
    pickupDate: string; // ISO 8601
    returnDate: string; // ISO 8601
    pickupLocation: string;
    returnLocation: string;
    customerDocument: string;
    customerLicense: string;
    customerAddress: string;
    licenseFile: UploadedFile | null;
    documentFile: UploadedFile | null;
}

export const EMPTY_RESERVATION_DATA: RentalReservationData = {
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    returnLocation: "",
    customerDocument: "",
    customerLicense: "",
    customerAddress: "",
    licenseFile: null,
    documentFile: null,
};

interface RentalReservationFieldsProps {
    /** WooCommerce product ID del vehículo (item del carrito). */
    vehicleId: number;
    value: RentalReservationData;
    onChange: (data: RentalReservationData) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** ACF date_time_picker guarda "Y-m-d H:i:s". */
function parseAcfDate(value: string): Date {
    return parseISO(value.replace(" ", "T"));
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const MAX_FILE_MB = 8;

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOAD SUB-COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function DocumentUpload({
    label,
    file,
    onSelect,
    onRemove,
}: {
    label: string;
    file: UploadedFile | null;
    onSelect: (file: UploadedFile) => void;
    onRemove: () => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleFile(f: File) {
        setError(null);
        if (f.size > MAX_FILE_MB * 1024 * 1024) {
            setError(`El archivo supera ${MAX_FILE_MB}MB.`);
            return;
        }
        const base64 = await fileToBase64(f);
        onSelect({ name: f.name, type: f.type, base64 });
    }

    return (
        <div className="space-y-1.5">
            <Label>{label} *</Label>

            {file ? (
                <div className="flex items-center justify-between rounded-full border bg-muted/40 px-3 py-2 text-sm">
                    <span className="truncate">{file.name}</span>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`Quitar ${label}`}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                    <Upload className="h-4 w-4" />
                    Subir foto o PDF
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    e.target.value = "";
                }}
            />

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RentalReservationFields({
    vehicleId,
    value,
    onChange,
}: RentalReservationFieldsProps) {
    const [bookedRanges, setBookedRanges] = useState<ZXVehicleBookedRange[]>([]);
    const [loadingAvailability, setLoadingAvailability] = useState(true);

    useEffect(() => {
        let active = true;
        setLoadingAvailability(true);

        getVehicleAvailability(vehicleId)
            .then((ranges) => {
                if (active) setBookedRanges(ranges);
            })
            .finally(() => {
                if (active) setLoadingAvailability(false);
            });

        return () => {
            active = false;
        };
    }, [vehicleId]);

    const range: DateRange | undefined = useMemo(
        () => ({
            from: value.pickupDate ? new Date(value.pickupDate) : undefined,
            to: value.returnDate ? new Date(value.returnDate) : undefined,
        }),
        [value.pickupDate, value.returnDate]
    );

    const disabledDays = useMemo(() => {
        const past = { before: new Date() };
        const booked = bookedRanges
            .filter((r) => r.pickupDate && r.returnDate)
            .map((r) => ({ from: parseAcfDate(r.pickupDate), to: parseAcfDate(r.returnDate) }));
        return [past, ...booked];
    }, [bookedRanges]);

    function overlapsBooked(from: Date, to: Date): boolean {
        return bookedRanges.some((r) => {
            if (!r.pickupDate || !r.returnDate) return false;
            const bStart = parseAcfDate(r.pickupDate);
            const bEnd = parseAcfDate(r.returnDate);
            return from <= bEnd && to >= bStart;
        });
    }

    function handleRangeSelect(selected: DateRange | undefined) {
        if (!selected?.from) {
            onChange({ ...value, pickupDate: "", returnDate: "" });
            return;
        }
        const from = selected.from;
        const to = selected.to ?? selected.from;
        if (overlapsBooked(from, to)) return;
        onChange({ ...value, pickupDate: from.toISOString(), returnDate: to.toISOString() });
    }

    const totalDays =
        range?.from && range?.to ? Math.max(1, differenceInCalendarDays(range.to, range.from)) : 0;

    const handleField =
        (field: keyof RentalReservationData) => (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...value, [field]: e.target.value });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon icon={Calendar03Icon} className="h-5 w-5" />
                    Datos de la Reserva
                </CardTitle>
                <CardDescription>
                    Fechas, lugar de entrega, documentos del conductor y contrato.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Columna izquierda: calendario */}
                    <div className="space-y-2 lg:col-span-1">
                        <div className="flex justify-center lg:justify-start">
                            <Calendar
                                mode="range"
                                selected={range}
                                onSelect={handleRangeSelect}
                                disabled={disabledDays}
                                numberOfMonths={1}
                                className="rounded-md border"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {loadingAvailability
                                    ? "Cargando disponibilidad…"
                                    : "Días ocupados no seleccionables"}
                            </span>
                            {totalDays > 0 && (
                                <span className="font-medium">
                                    {totalDays} día{totalDays !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Columna derecha: todos los campos */}
                    <div className="space-y-4 lg:border-l lg:pl-6 lg:col-span-2">
                        {/* Ubicaciones */}
                        <div className="space-y-3">
                            <Label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" /> Entrega y devolución
                            </Label>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Lugar de entrega *"
                                    value={value.pickupLocation}
                                    onChange={handleField("pickupLocation")}
                                    required
                                />
                                <Input
                                    placeholder="Lugar de devolución *"
                                    value={value.returnLocation}
                                    onChange={handleField("returnLocation")}
                                    required
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Documentos del conductor (texto) */}
                        <div className="space-y-3">
                            <Label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <IdCard className="h-4 w-4" /> Datos del conductor
                            </Label>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Cédula / Pasaporte *"
                                    value={value.customerDocument}
                                    onChange={handleField("customerDocument")}
                                    required
                                />
                                <Input
                                    placeholder="N.º de Licencia *"
                                    value={value.customerLicense}
                                    onChange={handleField("customerLicense")}
                                    required
                                />
                            </div>
                            <Input
                                placeholder="Dirección *"
                                value={value.customerAddress}
                                onChange={handleField("customerAddress")}
                                required
                            />
                        </div>

                        <Separator />

                        {/* Carga de documentos */}
                        <div className="space-y-3">
                            <Label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" /> Documentos (foto o PDF)
                            </Label>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <DocumentUpload
                                    label="Licencia de conducir"
                                    file={value.licenseFile}
                                    onSelect={(f) => onChange({ ...value, licenseFile: f })}
                                    onRemove={() => onChange({ ...value, licenseFile: null })}
                                />
                                <DocumentUpload
                                    label="Cédula / Pasaporte"
                                    file={value.documentFile}
                                    onSelect={(f) => onChange({ ...value, documentFile: f })}
                                    onRemove={() => onChange({ ...value, documentFile: null })}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Tus documentos y el contrato se envían de forma segura junto con tu reserva.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// META DATA HELPER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convierte la reserva a metaData de WooCommerce para incluir en la orden
 * (zxCreateOrder). El backend (createRentalBookingFromOrder en graphql.php)
 * lee estas mismas keys cuando el pago se confirma.
 *
 * Nota: los documentos (licenseFile/documentFile) NO van acá — esos se
 * envían aparte a /api/rental/send-contract, no como order meta.
 */
export function reservationToMetaData(
    reservation: RentalReservationData,
    extra: { totalDays: number; depositAmount: number; pendingAmount: number }
) {
    return [
        { key: "_rental_pickup_date", value: reservation.pickupDate },
        { key: "_rental_pickup_location", value: reservation.pickupLocation },
        { key: "_rental_return_date", value: reservation.returnDate },
        { key: "_rental_return_location", value: reservation.returnLocation },
        { key: "_rental_customer_document", value: reservation.customerDocument },
        { key: "_rental_customer_license", value: reservation.customerLicense },
        { key: "_rental_total_days", value: String(extra.totalDays) },
        { key: "_rental_deposit_amount", value: String(extra.depositAmount) },
        { key: "_rental_pending_amount", value: String(extra.pendingAmount) },
    ];
}