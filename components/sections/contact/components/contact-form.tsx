"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-shadow-effect";
import { Textarea } from "@/components/ui/textarea-shadow-effect";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label-shadow-effect";
import { cn } from "@/lib/utils";
import type { ZXContactForm } from "@/lib/graphql";
import { submitContactForm } from "@/app/api/send/contact";

interface ContactFormProps {
    form?: ZXContactForm | null;
}

const widthMap: Record<string, string> = {
    "100": "md:col-span-12",
    "66": "md:col-span-8",
    "50": "md:col-span-6",
    "33": "md:col-span-4",
};

export function ContactForm({
    form,
}: ContactFormProps) {
    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [values, setValues] =
        useState<Record<string, string>>({});

    const fields =
        form?.fields ?? [];

    function updateValue(
        name: string,
        value: string
    ) {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            await submitContactForm(
                values
            );

            setSuccess(true);

            setValues({});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                {fields.map((field, index) => {
                    const type = (field.type as string).toLowerCase();
                    const colSpan = widthMap[field.width || "100"] || "md:col-span-12";

                    return (
                        <div key={index} className={cn("col-span-1", colSpan)}>
                            {type !== "checkbox" && type !== "hidden" && (
                                <LabelInputContainer>
                                    <Label>
                                        {field.label}
                                    </Label>

                                    {(type === "text" || type === "email" || type === "tel") && (
                                        <Input
                                            type={type}
                                            value={values[field.name] || ""}
                                            onChange={(e) => updateValue(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="bg-white dark:bg-gray-700/40 rounded-full"
                                        />
                                    )}

                                    {type === "textarea" && (
                                        <Textarea
                                            rows={6}
                                            value={values[field.name] || ""}
                                            onChange={(e) => updateValue(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="bg-white dark:bg-gray-700/40"
                                        />
                                    )}

                                    {type === "select" && (
                                        <Select onValueChange={(value) => updateValue(field.name, value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {field.options?.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                </LabelInputContainer>
                            )}
                        </div>
                    );
                }
                )}
            </div>

            <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="rounded-full"
            >
                {loading ? "Enviando..." : form?.submitLabel || "Enviar"}
            </Button>

            {success && (
                <p className="text-sm text-green-500">
                    Mensaje enviado correctamente.
                </p>
            )}
        </form>
    );
}

function LabelInputContainer({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col gap-2">
            {children}
        </div>
    );
}