"use client";

import { ChevronDown } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { IdCardLanyardIcon } from "@hugeicons/core-free-icons";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface BillingDetailsData {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
}

export const EMPTY_BILLING_DETAILS: BillingDetailsData = {
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "US",
    phone: "",
};

interface BillingDetailsFieldsProps {
    value: BillingDetailsData;
    onChange: (data: BillingDetailsData) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function BillingDetailsFields({
    value,
    onChange,
    open,
    onOpenChange,
}: BillingDetailsFieldsProps) {
    const handleField =
        (field: keyof BillingDetailsData) => (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...value, [field]: e.target.value });

    return (
        <Card>
            <Collapsible open={open} onOpenChange={onOpenChange}>
                <CardHeader>
                    <CollapsibleTrigger className="group flex w-full items-center justify-between text-left">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon icon={IdCardLanyardIcon} className="h-5 w-5" />
                                Tus datos
                            </CardTitle>

                            <CardDescription>
                                Ingresa la información del titular de la reserva.
                            </CardDescription>
                        </div>

                        <ChevronDown
                            className={cn(
                                "h-5 w-5 transition-transform duration-200",
                                open && "rotate-180"
                            )}
                        />
                    </CollapsibleTrigger>
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="space-y-6 mt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nombre *</Label>
                                <Input
                                    id="firstName"
                                    value={value.firstName}
                                    onChange={handleField("firstName")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Apellido *</Label>
                                <Input
                                    id="lastName"
                                    value={value.lastName}
                                    onChange={handleField("lastName")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input
                                id="company"
                                value={value.company}
                                onChange={handleField("company")}
                                placeholder="Opcional"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo electrónico *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={value.email}
                                    onChange={handleField("email")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={value.phone}
                                    onChange={handleField("phone")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address1">Dirección *</Label>
                            <Input
                                id="address1"
                                placeholder="Calle y número"
                                value={value.address1}
                                onChange={handleField("address1")}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address2">Apartamento/Oficina *</Label>
                            <Input
                                id="address2"
                                placeholder="Apartamento, oficina, referencia (opcional)"
                                value={value.address2}
                                onChange={handleField("address2")}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ciudad *</Label>
                                <Input
                                    id="city"
                                    value={value.city}
                                    onChange={handleField("city")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">Provincia / Estado *</Label>
                                <Input
                                    id="state"
                                    value={value.state}
                                    onChange={handleField("state")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="postcode">Código Postal *</Label>
                                <Input
                                    id="postcode"
                                    value={value.postcode}
                                    onChange={handleField("postcode")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">País *</Label>
                                <Input
                                    id="country"
                                    value={value.country}
                                    onChange={handleField("country")}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}