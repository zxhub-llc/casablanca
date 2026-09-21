import { Section, Container } from "@/components/craft";
import { ZXTeamMember } from "@/lib/graphql";
import Image from "next/image";

export default function TeamSection({ members }: { members: ZXTeamMember[] }) {
    return (
        <Section>
            <Container>
                <div className="grid md:grid-cols-3 gap-6">
                    {members.map((m) => (
                        <div key={m.id} className="text-center">
                            {m.photo?.url && (
                                <Image
                                    src={m.photo.url}
                                    alt={m.photo.alt ?? m.name}
                                    width={m.photo.width ?? 200}
                                    height={m.photo.height ?? 200}
                                    className="rounded-full mx-auto object-cover w-24 h-24"
                                />
                            )}
                            <h3 className="font-semibold mt-3">{m.name}</h3>
                            {m.position && <p className="text-sm text-muted-foreground">{m.position}</p>}
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}