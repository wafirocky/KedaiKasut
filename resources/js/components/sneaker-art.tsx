type SneakerArtProps = {
    accent: string;
    className?: string;
};

/**
 * Placeholder sneaker illustration for the catalogue mockup — no product
 * photography yet, so each card draws a tinted silhouette instead.
 */
export function SneakerArt({ accent, className }: SneakerArtProps) {
    return (
        <svg
            viewBox="0 0 220 130"
            className={className}
            role="presentation"
            aria-hidden="true"
        >
            <path
                d="M14 97h182c10 0 16 6 14 14-1 5-6 8-12 8H24c-7 0-12-5-12-12v-2c0-5 1-8 2-8Z"
                fill={accent}
                opacity="0.35"
            />
            <path
                d="M20 97V63c0-10 7-17 17-18l21-2c8-1 15 3 20 9l18 23c5 6 12 10 20 11l52 7c14 2 24 4 28 4Z"
                fill={accent}
            />
            <path
                d="M20 63c0-10 7-17 17-18l21-2-2 10-20 3c-7 1-10 5-10 11v30h-6Z"
                fill="#ffffff"
                opacity="0.25"
            />
            <path
                d="M116 86l52 7c14 2 24 4 28 4h-46c-14 0-25-4-34-11Z"
                fill="#000000"
                opacity="0.18"
            />
            <g
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.65"
            >
                <path d="M52 57l14 6" />
                <path d="M60 65l14 6" />
                <path d="M68 73l14 6" />
            </g>
            <path
                d="M34 93c16-14 36-20 58-14"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
            />
        </svg>
    );
}
