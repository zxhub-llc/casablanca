"use client";

import { useEffect, useState, useId } from "react";

interface TextGradientEffectProps {
    text: string;
    color?: string;
    fontWeight?: string | number;
    fontSize?: string | number;
    yOffset?: string | number;
}

export const TextGradientEffect = ({
    text,
    color = "#001125",
    fontWeight = "900",
    fontSize = "122",
    yOffset = "70%"
}: TextGradientEffectProps) => {

    const reactGradientId = useId();
    const reactFadeId = useId();
    const reactMaskId = useId();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const gradientId = reactGradientId.replace(/:/g, "");
    const fadeId = reactFadeId.replace(/:/g, "");
    const maskId = reactMaskId.replace(/:/g, "");

    if (!isMounted) {
        return (
            <div
                style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: fontWeight,
                    fontSize: "2rem",
                    color: "transparent"
                }}
            >
                {text}
            </div>
        );
    }

    return (
        <svg
            viewBox="0 0 900 220"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", width: "100%", height: "auto", padding: 0, margin: 0 }}
            className="select-none"
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0" y1="1"
                    x2="0" y2="0"
                >
                    <stop offset="0%" stopColor={color} stopOpacity="1" />
                    <stop offset="50%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>

                <linearGradient
                    id={fadeId}
                    x1="0" y1="1"
                    x2="0" y2="0"
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    x="0" y="0"
                    width="900" height="220"
                >
                    <rect x="0" y="0" width="900" height="220" fill={`url(#${fadeId})`} />
                </mask>
            </defs>

            <text
                x="50%"
                y={yOffset}
                textAnchor="middle"
                dominantBaseline="auto"
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight={fontWeight}
                fontSize={fontSize}
                fill={`url(#${gradientId})`}
                mask={`url(#${maskId})`}
            >
                {text}
            </text>
        </svg>
    );
};