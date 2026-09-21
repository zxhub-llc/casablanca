export function PalmShadowOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/assets/palm-shadow.svg"
                alt=""
                aria-hidden="true"
                className="
                    absolute left-0 top-0
                    h-full w-auto max-w-none
                    origin-top-left animate-sway
                    brightness-0 opacity-25 blur-[2px]
                    mix-blend-multiply
                "
            />
        </div>
    );
}