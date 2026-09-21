import { Prose, Section } from "@/components/craft";

interface DocumentationSectionProps {
    title?: string;
    content?: string;
    container?: "narrow" | "default" | "wide" | "full";
    anchor?: string;
}

const containerWidths: Record<string, string> = {
    narrow: "max-w-2xl mx-auto",
    default: "max-w-4xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "w-full",
};

export default function DocumentationSection({
    title,
    content,
    container = "default",
    anchor,
}: DocumentationSectionProps) {
    return (
        <Section>
            <div className={containerWidths[container] ?? containerWidths.default}>
                <Prose>
                    {anchor && <div id={anchor} />}
                    {title && <h2>{title}</h2>}
                    {content && (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                </Prose>
            </div>
        </Section>
    );
}