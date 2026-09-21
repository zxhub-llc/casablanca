"use client";

import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    MailAtSign01Icon,
    Calling02Icon,
    PinLocation03Icon,
} from "@hugeicons/core-free-icons";
import ContactItem from "./contact-item";

interface ContactLinksSectionProps {
    email?: string;
    phone?: string;
    address?: string;
}

export function ContactLinksSection({
    email,
    phone,
    address,
}: ContactLinksSectionProps) {
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    const handleAddressClick = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();

        if (!address) return;

        const encodedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        const appleMapsUrl = `maps://maps.apple.com/?q=${encodedAddress}`;

        const isIOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" &&
                navigator.maxTouchPoints > 1);

        if (isIOS) {
            const openMap = window.confirm(
                "¿Deseas abrir la dirección en una app de mapas?"
            );

            if (openMap) {
                const useApple = window.confirm(
                    "¿Apple Maps? Aceptar = Apple / Cancelar = Google Maps"
                );

                window.location.href = useApple
                    ? appleMapsUrl
                    : googleMapsUrl;
            }
        } else {
            window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
        flex flex-col
        gap-2
        w-full
        max-w-4xl
    "
        >
            <div className="flex flex-col lg:flex-row gap-2 w-full max-w-4xl">
                {email && (
                    <ContactItem
                        href={`mailto:${email}`}
                        icon={MailAtSign01Icon}
                        label="Email"
                        value={email}
                    />
                )}

                {phone && (
                    <ContactItem
                        href={`https://wa.me/${cleanPhone}`}
                        icon={Calling02Icon}
                        label="Teléfono"
                        value={phone}
                    />
                )}
            </div>

            {address && (
                <ContactItem
                    href="#"
                    onClick={handleAddressClick}
                    icon={PinLocation03Icon}
                    label="Ubicación"
                    value={address}
                />
            )}
        </motion.div>
    );
}