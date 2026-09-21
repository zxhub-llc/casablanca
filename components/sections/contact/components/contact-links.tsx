"use client";

import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    MailAtSign01Icon,
    Calling02Icon,
    PinLocation03Icon,
} from "@hugeicons/core-free-icons";

interface ContactLinksProps {
    email?: string;
    phone?: string;
    address?: string;
}

export function ContactLinks({
    email,
    phone,
    address,
}: ContactLinksProps) {
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
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                staggerChildren: 0.12,
                delayChildren: 0.15,
            }}
            className="mt-2 md:mt-0 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm text-muted-foreground"
        >
            {email && (
                <motion.a
                    href={`mailto:${email}`}
                    initial={{
                        opacity: 0,
                        y: 16,
                        filter: "blur(6px)",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                    <HugeiconsIcon
                        icon={MailAtSign01Icon}
                        className="w-4 h-4"
                    />
                    <span>{email}</span>
                </motion.a>
            )}

            {phone && (
                <motion.a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                        opacity: 0,
                        y: 16,
                        filter: "blur(6px)",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                    <HugeiconsIcon
                        icon={Calling02Icon}
                        className="w-4 h-4"
                    />
                    <span>{phone}</span>
                </motion.a>
            )}

            {address && (
                <motion.a
                    href="#"
                    onClick={handleAddressClick}
                    initial={{
                        opacity: 0,
                        y: 16,
                        filter: "blur(6px)",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                    <HugeiconsIcon
                        icon={PinLocation03Icon}
                        className="w-4 h-4"
                    />
                    <span>{address}</span>
                </motion.a>
            )}
        </motion.div>
    );
}