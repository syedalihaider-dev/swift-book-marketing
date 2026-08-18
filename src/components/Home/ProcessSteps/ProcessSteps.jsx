"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProcessSteps.module.css";

const STEPS = [
    {
        number: "01",
        eyebrow: "Prepare",
        heading: "Make the manuscript",
        headingItalic: "ready for readers.",
        description:
            "Developmental reading, line editing, proofreading, cover direction and interior design—shaped around the book's intended reader, not only its author.",
        tags: ["Editorial judgement", "Design", "Production"],
        image: "/images/process-step-01.png",
        alt: "Manuscript preparation — editing and design materials laid out on a desk",
    },
    {
        number: "02",
        eyebrow: "Publish",
        heading: "Build foundations",
        headingItalic: "that hold up.",
        description:
            "Print specifications, metadata, ISBN, production files and distribution are prepared as one system, ready for technical review and real-world retail.",
        tags: ["Print", "Files", "Metadata", "Distribution"],
        image: "/images/process-step-02.png",
        alt: "Publishing production — print specifications and ISBN materials",
    },
    {
        number: "03",
        eyebrow: "Launch",
        heading: "Make a considered",
        headingItalic: "entrance.",
        description:
            "Positioning, pre-order planning, campaign creative, ARC outreach and paid amplification are sequenced to reinforce one clear story.",
        tags: ["Positioning", "Campaign creative", "Launch"],
        image: "/images/process-step-03.png",
        alt: "Book launch planning — pre-order and campaign materials",
    },
    {
        number: "04",
        eyebrow: "Grow",
        heading: "Keep finding the",
        headingItalic: "right readers.",
        description:
            "Content, advertising, email and social are reviewed against useful signals—readers reached, books sold and what should happen next.",
        tags: ["Content", "Advertising", "Performance"],
        image: "/images/process-step-04.png",
        alt: "Growth review — marketing performance dashboard",
    },
];

const TILE_COLS = 6;
const TILE_ROWS = 4;
const TILES = Array.from({ length: TILE_COLS * TILE_ROWS });

export default function ProcessSteps() {
    const sectionRef = useRef(null);
    const rowRefs = useRef([]);
    const headerRefs = useRef([]);
    const bodyRefs = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);

    // STEPS has a fixed length/order, so each ref can be written straight to
    // its index — no reset-then-push during render needed.
    const setRowRef = (index) => (el) => {
        rowRefs.current[index] = el;
    };
    const setHeaderRef = (index) => (el) => {
        headerRefs.current[index] = el;
    };
    const setBodyRef = (index) => (el) => {
        bodyRefs.current[index] = el;
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Snapshot only the populated refs — under React StrictMode's dev-only
        // double-mount, a row can transiently be null between passes, and
        // these arrays get read again later (in closures) after that point.
        const rows = rowRefs.current.filter(Boolean);
        const headers = headerRefs.current.filter(Boolean);
        const bodies = bodyRefs.current.filter(Boolean);
        if (!rows.length || rows.length !== bodies.length) return undefined;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
                () => {
                    let active = 0;

                    // ── Accordion body collapse/expand ──
                    gsap.set(bodies, { height: 0, opacity: 0 });
                    gsap.set(bodies[0], { height: "auto", opacity: 1 });
                    rows[0].classList.add(styles.rowActive);

                    const playTiles = (row) => {
                        const tiles = row.querySelectorAll(`.${styles.tile}`);
                        if (!tiles.length) return;
                        gsap.set(tiles, { opacity: 1, scale: 1 });
                        gsap.to(tiles, {
                            opacity: 0,
                            scale: 0.35,
                            ease: "power2.inOut",
                            stagger: { each: 0.015, from: "random" },
                            duration: 0.5,
                            delay: 0.15,
                        });
                    };
                    playTiles(rows[0]);

                    let animating = false;

                    const activate = (index) => {
                        if (index === active || animating) return;
                        const prev = active;
                        active = index;
                        animating = true;
                        setActiveIndex(index);

                        rows[prev].classList.remove(styles.rowActive);
                        rows[index].classList.add(styles.rowActive);

                        gsap.to(bodies[prev], {
                            height: 0,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.inOut",
                        });
                        gsap.to(bodies[index], {
                            height: bodies[index].scrollHeight,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power3.inOut",
                            onComplete: () => {
                                gsap.set(bodies[index], { height: "auto" });
                                animating = false;
                            },
                        });
                        playTiles(rows[index]);
                    };

                    // ── Pin the section & drive steps by scroll progress ──
                    // The section sticks in place while the user scrolls
                    // through (steps × 100vh) of virtual distance. Progress
                    // is divided into equal slices — one per step.
                    const stepCount = rows.length; // 4

                    ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: "top top",
                        // Total scroll distance = (stepCount - 1) * viewport height
                        // so each step gets one full viewport of scroll
                        end: () => `+=${(stepCount - 1) * window.innerHeight}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: false,
                        onUpdate: (self) => {
                            if (animating) return;
                            // Map 0-1 progress to step index 0..(stepCount-1)
                            const target = Math.min(
                                Math.floor(self.progress * stepCount),
                                stepCount - 1
                            );
                            activate(target);
                        },
                    });

                    return () => {
                        rows.forEach((row) => row.classList.remove(styles.rowActive));
                    };
                }
            );

            mm.add("(max-width: 991.98px), (prefers-reduced-motion: reduce)", () => {
                // Small screens and reduced-motion: every step fully open,
                // plain readable stack — no scroll-linked accordion, no pin.
                gsap.set(bodies, { clearProps: "all" });
                gsap.set(rows, { clearProps: "opacity,y" });
                gsap.set(
                    rows.flatMap((row) => Array.from(row.querySelectorAll(`.${styles.tile}`))),
                    { display: "none" }
                );
                rows.forEach((row) => row.classList.add(styles.rowActive));

                // Mobile: simpler fade-in on scroll for each row
                rows.forEach((row, i) => {
                    gsap.set(row, { opacity: 0, y: 40 });
                    ScrollTrigger.create({
                        trigger: row,
                        start: "top 90%",
                        once: true,
                        onEnter: () => {
                            gsap.to(row, {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                ease: "power2.out",
                                delay: i * 0.1,
                            });
                        },
                    });
                });

                return undefined;
            });

            return () => mm.revert();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef} aria-label="Our publishing process">
            <div className="container">
                <div className={styles.list}>
                    {STEPS.map((step, index) => {
                        const panelId = `process-step-panel-${step.number}`;
                        return (
                            <div key={step.number} className={styles.row} ref={setRowRef(index)}>
                                <button
                                    type="button"
                                    className={styles.rowHeader}
                                    ref={setHeaderRef(index)}
                                    aria-expanded={activeIndex === index}
                                    aria-controls={panelId}
                                    onClick={(event) =>
                                        event.currentTarget.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    }
                                >
                                    <span className={styles.stepNumber}>{step.number}</span>
                                </button>

                                <div
                                    id={panelId}
                                    className={styles.rowBody}
                                    ref={setBodyRef(index)}
                                    aria-hidden={activeIndex !== index}
                                >
                                    <div className={styles.rowBodyInner}>
                                        <div className="row align-items-center">
                                            <div className="col-12 col-lg-5">
                                                <div className={styles.imageFrame}>
                                                    <Image
                                                        src={step.image}
                                                        alt={step.alt}
                                                        fill
                                                        sizes="(max-width: 991px) 100vw, 45vw"
                                                        className={styles.image}
                                                    />
                                                    <div className={styles.tileGrid} aria-hidden="true">
                                                        {TILES.map((_, tileIndex) => (
                                                            <div key={tileIndex} className={styles.tile} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-6 offset-lg-1">
                                                <div className={styles.content}>
                                                    <div className={styles.eyebrow}>
                                                        <span>{step.eyebrow}</span>
                                                        <div className={styles.eyebrowLine}>
                                                            <span className={styles.star} aria-hidden="true">
                                                                ✦
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h2 className={styles.heading}>
                                                        {step.heading}
                                                        <br />
                                                        <em>{step.headingItalic}</em>
                                                    </h2>

                                                    <p className={styles.description}>{step.description}</p>

                                                    <div className={styles.tagsRow}>
                                                        <div className={styles.tagsLine} aria-hidden="true" />
                                                        <p className={styles.tags}>{step.tags.join(" · ")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
