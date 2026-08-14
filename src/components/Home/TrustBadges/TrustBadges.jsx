"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./TrustBadges.module.css";

const BADGES = [
    { name: "AppFutura", src: "/images/trust-badge-01.png", width: 121, height: 109 },
    { name: "GoodFirms", src: "/images/trust-badge-02.png", width: 126, height: 109 },
    { name: "Best Digital Agencies", src: "/images/trust-badge-03.png", width: 83, height: 109 },
    { name: "Clutch", src: "/images/trust-badge-04.png", width: 129, height: 117 },
    { name: "TopDevelopers", src: "/images/trust-badge-05.png", width: 127, height: 117 },
];

// Tripled so the track can wrap seamlessly around the middle set in either scroll direction.
const TRACK = [...BADGES, ...BADGES, ...BADGES];

const AUTOPLAY_PX_PER_FRAME = 0.5;
const RESUME_DELAY_MS = 800;

export default function TrustBadges() {
    const viewportRef = useRef(null);
    const pausedRef = useRef(false);
    const resumeTimeoutRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return undefined;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const singleSetWidth = () => viewport.scrollWidth / 3;

        viewport.scrollLeft = singleSetWidth();

        if (prefersReducedMotion) {
            return undefined;
        }

        const step = () => {
            if (!pausedRef.current) {
                viewport.scrollLeft += AUTOPLAY_PX_PER_FRAME;
                if (viewport.scrollLeft >= singleSetWidth() * 2) {
                    viewport.scrollLeft -= singleSetWidth();
                } else if (viewport.scrollLeft <= 0) {
                    viewport.scrollLeft += singleSetWidth();
                }
            }
            frameRef.current = requestAnimationFrame(step);
        };

        frameRef.current = requestAnimationFrame(step);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    const pause = () => {
        pausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const scheduleResume = (delay = 0) => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
            pausedRef.current = false;
        }, delay);
    };

    return (
        <section className={styles.section} aria-label="Recognitions and awards" fade-up="">
            <div
                ref={viewportRef}
                className={styles.viewport}
                tabIndex={0}
                role="region"
                aria-label="Awards and recognitions, scrollable"
                onMouseEnter={pause}
                onMouseLeave={() => scheduleResume(0)}
                onTouchStart={pause}
                onTouchEnd={() => scheduleResume(RESUME_DELAY_MS)}
                onPointerDown={pause}
                onPointerUp={() => scheduleResume(RESUME_DELAY_MS)}
                onFocus={pause}
                onBlur={() => scheduleResume(0)}
            >
                <ul className={styles.track}>
                    {TRACK.map((badge, index) => (
                        <li key={`${badge.name}-${index}`} className={styles.card}>
                            <Image
                                src={badge.src}
                                alt={badge.name}
                                width={badge.width}
                                height={badge.height}
                                className={styles.badgeImage}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
