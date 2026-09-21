import { Container, Section } from "@/components/craft";
import { ZXTestimonial } from "@/lib/graphql";

export default function TestimonialsSection({ testimonials }: { testimonials: ZXTestimonial[] }) {
    return (
        <Section>
            <Container>
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                        <blockquote key={t.id} className="p-6 border rounded-lg">
                            {t.content && <p className="italic text-muted-foreground">"{t.content}"</p>}
                            <footer className="mt-4 font-semibold">
                                {t.author ?? t.title}
                                {t.position && <span className="text-sm font-normal text-muted-foreground"> — {t.position}</span>}
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </Container>
        </Section>
    );
}