"use client";

import { useState } from "react";

import { Container, Section } from "@/components/craft";

import { ZXNewsletter } from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { subscribeNewsletter } from "@/app/api/send/newsletter";

interface NewsletterSectionProps {
    id: string;
    newsletter?: ZXNewsletter | null;
}

export default function NewsletterSection({
    id,
    newsletter,
}: NewsletterSectionProps) {
    const [email, setEmail] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    if (!newsletter) {
        return null;
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            await subscribeNewsletter(
                email
            );

            setSuccess(true);

            setEmail("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Section id={id ?? "newsletter"} className="bg-background">
            <Container>

                <div className="relative overflow-hidden rounded-3xl bg-slate-950">

                    {newsletter.image && (
                        <>
                            <img
                                src={newsletter.image}
                                alt={newsletter.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/60" />
                        </>
                    )}

                    <div className="relative z-10 px-6 py-20 sm:px-10 lg:px-20 lg:py-28">

                        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

                            {newsletter.highlights && (
                                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                                    {newsletter.highlights}
                                </p>
                            )}

                            <h2 className="text-4xl font-normal tracking-tight text-white lg:text-6xl">
                                {newsletter.title}
                            </h2>

                            {newsletter.description && (
                                <p className="mt-6 max-w-2xl text-base text-white/80 lg:text-lg">
                                    {newsletter.description}
                                </p>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
                            >

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        newsletter.placeholder ||
                                        "Enter your email"
                                    }
                                    className={cn(
                                        "h-14 flex-1 rounded-full border border-white/20",
                                        "bg-white/10 px-6 text-white",
                                        "placeholder:text-white/50",
                                        "outline-none backdrop-blur-sm"
                                    )}
                                />

                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !email.trim()
                                    }
                                    className={cn(
                                        "h-14 rounded-full px-8",
                                        "bg-primary text-primary-foreground",
                                        "transition-opacity",
                                        "hover:opacity-90",
                                        "disabled:pointer-events-none",
                                        "disabled:opacity-50"
                                    )}
                                >
                                    {loading
                                        ? "Sending..."
                                        : newsletter.buttonText ||
                                        "Subscribe"}
                                </button>

                            </form>

                            {success && (
                                <p className="mt-4 text-sm text-green-400">
                                    Subscription completed successfully.
                                </p>
                            )}

                            <p className="mt-5 text-xs text-white/60">
                                By subscribing, you agree to receive updates and
                                marketing communications.
                            </p>

                        </div>

                    </div>

                </div>

            </Container>
        </Section>
    );
}