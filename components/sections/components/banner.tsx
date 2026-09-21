import Image from "next/image";

interface BannerProps {
    image?: string;
    mobile?: string;
    title?: string;
    overlay?: boolean;
    height?: string;
    className?: string;
    contentClassName?: string;
    imageClassName?: string;
    children?: React.ReactNode;
}

export function Banner({
    image,
    mobile,
    title,
    overlay = true,
    height = "h-[320px] sm:h-[420px] lg:h-[520px]",
    className = "",
    contentClassName = "",
    imageClassName = "",
    children,
}: BannerProps) {
    if (!image && !mobile && !title && !children) {
        return null;
    }

    return (
        <div
            className={`relative overflow-hidden bg-brand-soft ${className}`}
        >
            <div className={`relative w-full ${height}`}>
                {/* IMAGE */}
                {image && mobile && (
                    <>
                        <Image
                            src={mobile}
                            alt={title || "Hero image"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className={`absolute inset-0 h-full w-full object-cover object-center md:object-right md:hidden ${imageClassName}`}
                        />

                        <Image
                            src={image}
                            alt={title || "Hero image"}
                            fill
                            priority
                            sizes="(min-width: 768px) 100vw, 33vw"
                            className={`absolute inset-0 h-full w-full object-cover object-center md:object-right hidden md:block ${imageClassName}`}
                        />

                        {overlay && (
                            <div className="absolute inset-0 bg-black/30" />
                        )}
                    </>
                )}

                {/* CONTENT */}
                {(title || children) && (
                    <div
                        className={`absolute inset-0 z-10 flex items-center justify-center px-6 text-center md:justify-start md:px-16 md:text-left ${contentClassName}`}
                    >
                        {children ? (
                            children
                        ) : (
                            <h2 className="text-4xl font-bold text-white md:text-6xl">
                                {title}
                            </h2>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}