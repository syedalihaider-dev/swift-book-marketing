"use client";

import { useEffect, useRef } from "react";
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

// Card N slides up from the bottom, rests fully covering card N-1, then the
// next card repeats the same slide+rest before finally releasing the pin.
const SLOT = 1;
const SLIDE_PORTION = 0.6;

export default function ProcessSteps() {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const cardRefs = useRef([]);
    cardRefs.current = [];

    const registerCard = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const pinTarget = pinRef.current;
        const cards = cardRefs.current;
        if (!section || !pinTarget || cards.length === 0) return undefined;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isPinned: "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
                isFlow: "(max-width: 991.98px), (prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { isPinned } = context.conditions;

                if (!isPinned) {
                    // Small screens and reduced-motion: plain stacked flow,
                    // no pin/slide — every card fully visible and reachable.
                    // The puzzle tiles only ever get revealed by the pinned
                    // timeline below, so without it they'd sit permanently
                    // opaque, hiding every image — hide them outright instead.
                    gsap.set(cards, { clearProps: "transform" });
                    gsap.set(
                        cards.flatMap((card) => Array.from(card.querySelectorAll(`.${styles.tile}`))),
                        { display: "none" }
                    );
                    return undefined;
                }

                pinTarget.classList.add(styles.pinTargetActive);
                gsap.set(cards[0], { yPercent: 0 });
                gsap.set(cards.slice(1), { yPercent: 100 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinTarget,
                        start: "top top",
                        end: () => `+=${(cards.length - 1) * SLOT * window.innerHeight}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card, i) => {
                    if (i === 0) return;
                    const pos = (i - 1) * SLOT;
                    const tiles = card.querySelectorAll(`.${styles.tile}`);
                    const textBlock = card.querySelector(`.${styles.content}`);

                    tl.to(card, { yPercent: 0, ease: "power1.inOut", duration: SLIDE_PORTION }, pos);
                    if (tiles.length) {
                        tl.to(
                            tiles,
                            {
                                opacity: 0,
                                scale: 0.35,
                                ease: "none",
                                stagger: { each: 0.015, from: "random" },
                                duration: SLIDE_PORTION * 0.7,
                            },
                            pos + SLIDE_PORTION * 0.3
                        );
                    }
                    if (textBlock) {
                        tl.from(textBlock, { opacity: 0, y: 24, duration: SLIDE_PORTION * 0.6 }, pos + SLIDE_PORTION * 0.25);
                    }
                });

                // First card's image still gets a puzzle reveal, tied to the
                // section simply scrolling into view (no pin involved yet).
                const firstTiles = cards[0].querySelectorAll(`.${styles.tile}`);
                if (firstTiles.length) {
                    gsap.to(firstTiles, {
                        opacity: 0,
                        scale: 0.35,
                        ease: "power2.inOut",
                        stagger: { each: 0.015, from: "random" },
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    });
                }

                return () => {
                    pinTarget.classList.remove(styles.pinTargetActive);
                };
            }
        );

        return () => mm.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef} aria-label="Our publishing process">
            <div className="container">
                <div className={styles.pinTarget} ref={pinRef}>
                    {STEPS.map((step, index) => (
                        <div
                            key={step.number}
                            className={styles.card}
                            ref={registerCard}
                            style={{ zIndex: index + 1 }}
                        >
                            {index === 0 && <div className={styles.divider} aria-hidden="true" />}

                            <span className={styles.stepNumber}>{step.number}</span>

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

                            <div className={styles.divider} aria-hidden="true" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
