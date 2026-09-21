interface AboutVideoProps {
    url?: string | null;
}

export function AboutVideo({
    url,
}: AboutVideoProps) {
    if (!url?.trim()) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-3xl">
            <video
                controls
                className="w-full"
            >
                <source src={url} />
            </video>
        </div>
    );
}