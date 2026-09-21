import Link from "next/link";

interface AboutCTAProps {
    text?: string | null;
    url?: string | null;
}

export function AboutCTA({
    text,
    url,
}: AboutCTAProps) {
    if (!text?.trim() || !url?.trim()) {
        return null;
    }

    return (
        <Link
            href={url}
            className="inline-flex items-center rounded-full px-6 py-3 font-medium border"
        >
            {text}
        </Link>
    );
}