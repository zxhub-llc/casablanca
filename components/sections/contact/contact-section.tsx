"use client";

import { Container, Section } from "@/components/craft";
import { ZXContactForm, ZXSocial } from "@/lib/graphql";
import ContactContent from "./components/contact-content";
import ContactWithoutBanner from "./components/contact-without-banner";
import { Banner } from "../components/banner";
import Image from "next/image";

interface ContactSectionProps {
    id: string;
    contact?: ZXContactForm | null;
    social?: ZXSocial | null;
    title?: string;
    description?: string;
    highlight?: string;
    heroImage?: string;
    heroMobile?: string;
    email?: string;
    phone?: string;
    address?: string;
    map?: string;
    lang?: string;
    showBanner?: boolean;
    buttonText?: string;
    buttonUrl?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
}

export default function ContactSection({
    id,
    contact,
    social,
    title,
    description,
    email,
    phone,
    address,
    map,
    highlight,
    heroImage,
    heroMobile,
    lang,
    showBanner,
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
}: ContactSectionProps) {
    return (
        <>
            {showBanner && (
                <Banner
                    image={heroImage}
                    mobile={heroMobile}
                    title={highlight}
                />
            )}
            <Section id={id ?? "contact"} className="relative w-full max-w-screen min-h-screen px-4 sm:px-4 md:px-4 lg:px-8 py-0 md:py-0">
                {!showBanner && (
                    <>
                        <Image
                            src={heroMobile || ""}
                            alt={title || "Hero image"}
                            fill
                            priority
                            sizes="(min-width: 768px) 100vw, 33vw"
                            className="object-cover sm:hidden block"
                        />

                        <Image
                            src={heroImage || ""}
                            alt={title || "Hero image"}
                            fill
                            priority
                            sizes="(min-width: 768px) 100vw, 33vw"
                            className="hidden object-cover sm:block"
                        />

                        <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-[#001125] via-[#001125]/70 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#001125] to-transparent" />
                    </>
                )}
                <Container className="relative w-full max-w-screen min-h-screen text-black px-4 sm:px-4 md:px-4 lg:px-8 py-0 sm:py-0 rounded-3xl">
                    {showBanner ? (
                        <ContactContent
                            title={title}
                            description={description}
                            highlight={highlight}
                            contact={contact}
                            social={social}
                            email={email}
                            phone={phone}
                            address={address}
                            map={map}
                        />
                    ) : (
                        <ContactWithoutBanner
                            title={title}
                            description={description}
                            highlight={highlight}
                            contact={contact}
                            social={social}
                            email={email}
                            phone={phone}
                            address={address}
                            buttonText={buttonText}
                            buttonUrl={buttonUrl}
                            secondaryButtonText={secondaryButtonText}
                            secondaryButtonUrl={secondaryButtonUrl}
                        />
                    )}
                </Container>
            </Section>
        </>
    );
}