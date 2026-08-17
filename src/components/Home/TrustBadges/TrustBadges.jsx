"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TrustBadges.module.css";

const BADGES = [
    { name: "AppFutura", src: "/images/trust-badge-01.png", width: 121, height: 109 },
    { name: "GoodFirms", src: "/images/trust-badge-02.png", width: 126, height: 109 },
    { name: "Best Digital Agencies", src: "/images/trust-badge-03.png", width: 83, height: 109 },
    { name: "Clutch", src: "/images/trust-badge-04.png", width: 129, height: 117 },
    { name: "TopDevelopers", src: "/images/trust-badge-05.png", width: 127, height: 117 },
];

// Tripled so the track has buffer on both sides for the scroll-driven shift below.
const TRACK = [...BADGES, ...BADGES, ...BADGES];

const REST_XPERCENT = -33.333;
const SHIFT_PERCENT = 10;

export default function TrustBadges() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.set(trackRef.current, { xPercent: REST_XPERCENT });

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
            if (prefersReducedMotion) return;

            gsap.to(trackRef.current, {
                xPercent: REST_XPERCENT - SHIFT_PERCENT,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className={styles.section}
            aria-label="Recognitions and awards"
            fade-up=""
            ref={sectionRef}
        >
            <div className={styles.viewport}>
                <ul className={styles.track} ref={trackRef}>
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
