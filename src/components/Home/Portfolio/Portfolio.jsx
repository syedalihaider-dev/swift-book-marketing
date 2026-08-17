"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Portfolio.module.css";

const ITEMS = [
    {
        id: "jennifer-hartman",
        author: {
            name: "Jennifer Hartman",
            role: "Author & Strategist",
            photo: "/images/port-avatar-women-01.png",
            bio: "Full-service marketing and launch strategy that drives results.",
        },
        video: {
            eyebrow: "Behind the story",
            heading: "Purposeful work that drives impact.",
            description: "Watch how strategy and story come together to create powerful results.",
            thumbnail: "/images/port-women-01.png",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        book: {
            eyebrow: "Featured book",
            title: "Thoughtful",
            titleItalic: "Stories. Lasting impact.",
            cover: "/images/port-assets-01.png",
            coverWidth: 197,
            coverHeight: 341,
            caption: "Top 3 in Leadership on Amazon within the first week of launch.",
        },
    },
    {
        id: "sarah-mitchell",
        author: {
            name: "Sarah Mitchell",
            role: "Author & Speaker",
            photo: "/images/port-avatar-women-01.png",
            bio: "Transforming personal stories into bestselling narratives.",
        },
        video: {
            eyebrow: "The author journey",
            heading: "From manuscript to movement.",
            description: "A deep dive into the launch strategy that took her book to #1.",
            thumbnail: "/images/port-women-01.png",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        book: {
            eyebrow: "Featured book",
            title: "Beyond Words",
            titleItalic: "A voice that resonates.",
            cover: "/images/port-assets-01.png",
            coverWidth: 197,
            coverHeight: 341,
            caption: "Over 10,000 copies sold in the first month of release.",
        },
    },
    {
        id: "amanda-chen",
        author: {
            name: "Amanda Chen",
            role: "Business Author",
            photo: "/images/port-avatar-women-01.png",
            bio: "Helping entrepreneurs tell their stories with clarity and purpose.",
        },
        video: {
            eyebrow: "Brand storytelling",
            heading: "Building a brand through a book.",
            description: "Discover how a single book became the foundation of a thriving brand.",
            thumbnail: "/images/port-women-01.png",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        book: {
            eyebrow: "Featured book",
            title: "Lead With Story",
            titleItalic: "Purpose-driven growth.",
            cover: "/images/port-assets-01.png",
            coverWidth: 197,
            coverHeight: 341,
            caption: "Featured in Forbes and named a must-read for entrepreneurs.",
        },
    },
];

let fancyboxPromise = null;
function loadFancybox() {
    if (!fancyboxPromise) {
        fancyboxPromise = Promise.all([
            import("@fancyapps/ui/dist/fancybox/fancybox.js"),
            import("@fancyapps/ui/dist/fancybox/fancybox.css"),
        ]).then(([mod]) => mod.Fancybox);
    }
    return fancyboxPromise;
}

// Each extra slide adds this many viewport-heights of scroll distance.
const SCROLL_DISTANCE_PER_ITEM = 0.8;

export default function Portfolio() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [loadingVideo, setLoadingVideo] = useState(false);

    const total = ITEMS.length;
    const item = ITEMS[index];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || total <= 1) return undefined;

        const ctx = gsap.context(() => {
            const el = cardsRef.current;
            let current = 0;
            let transitioning = false;

            const goTo = (nextIndex) => {
                if (!el || nextIndex === current || transitioning) return;
                transitioning = true;
                const direction = nextIndex > current ? "next" : "prev";
                current = nextIndex;
                setIndex(nextIndex);

                gsap.to(el, {
                    opacity: 0,
                    x: direction === "next" ? -40 : 40,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.fromTo(
                            el,
                            { opacity: 0, x: direction === "next" ? 40 : -40 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.45,
                                ease: "power2.out",
                                onComplete: () => { transitioning = false; },
                            }
                        );
                    },
                });
            };

            // Pin the section while scrolling through all slides.
            // pinSpacing: false keeps surrounding sections flush — no blank
            // gap is inserted; the extra scroll distance lives in the pin itself.
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${(total - 1) * window.innerHeight * SCROLL_DISTANCE_PER_ITEM}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Map progress -> slide index
                    const next = Math.min(
                        total - 1,
                        Math.floor(self.progress * total)
                    );
                    goTo(next);
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [total]);

    const handlePlay = async () => {
        setLoadingVideo(true);
        try {
            const Fancybox = await loadFancybox();
            Fancybox.show(
                [{ src: item.video.videoSrc, thumb: item.video.thumbnail }],
                {
                    theme: "dark",
                    backdropClick: "close",
                    closeButton: "auto",
                    Carousel: { Video: { autoplay: true } },
                }
            );
        } finally {
            setLoadingVideo(false);
        }
    };

    return (
        <section className={styles.section} aria-labelledby="portfolio-title" ref={sectionRef}>
            <div className="container">
                <div className={styles.intro}>
                    <div className={styles.eyebrow}>
                        <div className={styles.eyebrowLine} data-side="left" />
                        <span>Portfolio</span>
                        <div className={styles.eyebrowLine} data-side="right" />
                    </div>

                    <h2 id="portfolio-title" className={styles.heading}>
                        Books we&apos;ve helped bring to life.
                        <br />
                        <em>Stories that continue to grow.</em>
                    </h2>
                </div>

                <div className={styles.sliderWrap}>
                    <div className={styles.cards} ref={cardsRef}>
                        {/* Author */}
                        <div className={styles.authorCard}>
                            <div className={styles.authorPhotoFrame}>
                                <span className={styles.archMark} data-side="left" aria-hidden="true">
                                    ✦
                                </span>
                                <span className={styles.archMark} data-side="right" aria-hidden="true">
                                    ✦
                                </span>
                                <div className={styles.authorPhoto}>
                                    <Image
                                        src={item.author.photo}
                                        alt={item.author.name}
                                        fill
                                        sizes="(max-width: 767px) 60vw, 220px"
                                    />
                                </div>
                            </div>
                            <div className={styles.authorBase}>
                                <p className={styles.authorName}>{item.author.name}</p>
                                <p className={styles.authorRole}>{item.author.role}</p>
                                <div className={styles.authorDivider} aria-hidden="true" />
                                <p className={styles.authorBio}>{item.author.bio}</p>
                                <p className={styles.authorSignature} aria-hidden="true">
                                    {item.author.name}
                                </p>
                            </div>
                        </div>

                        {/* Video */}
                        <div className={styles.videoCard}>
                            <div className={styles.videoThumb}>
                                <Image
                                    src={item.video.thumbnail}
                                    alt={item.video.heading}
                                    fill
                                    sizes="(max-width: 767px) 100vw, 32vw"
                                    className={styles.videoImg}
                                />
                                <div className={styles.videoOverlay} aria-hidden="true" />

                                <div className={styles.videoInfo}>
                                    <div className={styles.videoEyebrow}>
                                        <span>{item.video.eyebrow}</span>
                                    </div>
                                    <h3 className={styles.videoHeading}>{item.video.heading}</h3>
                                    <div className={styles.videoDivider} aria-hidden="true" />
                                    <p className={styles.videoDescription}>{item.video.description}</p>
                                </div>

                                <button
                                    type="button"
                                    className={styles.playButton}
                                    aria-label={`Play video: ${item.video.heading}`}
                                    aria-busy={loadingVideo}
                                    disabled={loadingVideo}
                                    onClick={handlePlay}
                                >
                                    <span className={styles.playRing} aria-hidden="true" />
                                    <svg viewBox="0 0 24 24" className={styles.playIcon} aria-hidden="true" focusable="false">
                                        <path d="M8 5v14l11-7z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Book */}
                        <div className={styles.bookCard}>
                            <div className={styles.bookCoverWrap} puzzle-image="#efe8d6">
                                <Image
                                    src={item.book.cover}
                                    alt={item.book.title}
                                    width={item.book.coverWidth}
                                    height={item.book.coverHeight}
                                    className={styles.bookCover}
                                />
                            </div>
                            <div className={styles.bookContent}>
                                <div className={styles.bookEyebrow}>
                                    <span>{item.book.eyebrow}</span>
                                </div>
                                <h3 className={styles.bookHeading}>
                                    {item.book.title}
                                    <br />
                                    <em>{item.book.titleItalic}</em>
                                </h3>
                                <div className={styles.bookDivider} aria-hidden="true" />
                                <p className={styles.bookCaption}>{item.book.caption}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide indicators */}
                <div className={styles.indicators} aria-label="Portfolio slides" role="tablist">
                    {ITEMS.map((it, i) => (
                        <button
                            key={it.id}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`Slide ${i + 1}: ${it.author.name}`}
                            className={`${styles.indicator} ${i === index ? styles.indicatorActive : ""}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
