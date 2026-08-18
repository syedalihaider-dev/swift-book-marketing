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

export default function Portfolio() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [loadingId, setLoadingId] = useState(null);

    const total = ITEMS.length;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
                () => {
                    // Slide the track left: each slide is 1/total of track width.
                    // Moving xPercent by -(total-1)/total*100 advances exactly
                    // (total-1) full slide widths — right-to-left.
                    gsap.to(trackRef.current, {
                        xPercent: -((total - 1) / total) * 100,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: () =>
                                `+=${(total - 1) * window.innerHeight * 0.9}`,
                            pin: true,
                            pinSpacing: true,
                            scrub: 0.8,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    return () => {};
                }
            );

            return () => mm.revert();
        }, sectionRef);

        return () => ctx.revert();
    }, [total]);

    const handlePlay = async (item) => {
        setLoadingId(item.id);
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
            setLoadingId(null);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-labelledby="portfolio-title"
        >
            {/* Centered heading — stays inside container */}
            <div className="container">
                <div className={styles.intro}>
                    <div className={styles.eyebrow}>
                        <div className={styles.eyebrowLine} />
                        <span>Portfolio</span>
                        <div className={styles.eyebrowLine} />
                    </div>
                    <h2 id="portfolio-title" className={styles.heading}>
                        Books we&apos;ve helped bring to life.
                        <br />
                        <em>Stories that continue to grow.</em>
                    </h2>
                </div>
            </div>

            {/* Full-width slider — outside container */}
            <div className={styles.sliderViewport}>
                <div
                    ref={trackRef}
                    className={styles.sliderTrack}
                    style={{ width: `${total * 100}%` }}
                >
                    {ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className={styles.slide}
                            style={{ width: `${100 / total}%` }}
                        >
                            <div className={styles.slideCards}>
                                {/* ── Author card ── */}
                                <div className={styles.authorCard}>
                                    <div className={styles.authorPhotoFrame}>
                                        <div className={styles.archFrame}>
                                            <div className={styles.authorPhoto}>
                                                <Image
                                                    src={item.author.photo}
                                                    alt={item.author.name}
                                                    fill
                                                    sizes="220px"
                                                />
                                            </div>
                                        </div>
                                        <span
                                            className={styles.archMark}
                                            data-side="left"
                                            aria-hidden="true"
                                        >
                                            ✦
                                        </span>
                                        <span
                                            className={styles.archMark}
                                            data-side="right"
                                            aria-hidden="true"
                                        >
                                            ✦
                                        </span>
                                    </div>
                                    <div className={styles.authorBase}>
                                        <p className={styles.authorName}>
                                            {item.author.name}
                                        </p>
                                        <p className={styles.authorRole}>
                                            {item.author.role}
                                        </p>
                                        <div
                                            className={styles.authorDivider}
                                            aria-hidden="true"
                                        >
                                            <span>✦</span>
                                        </div>
                                        <p className={styles.authorBio}>
                                            {item.author.bio}
                                        </p>
                                        <p
                                            className={styles.authorSignature}
                                            aria-hidden="true"
                                        >
                                            {item.author.name}
                                        </p>
                                    </div>
                                </div>

                                {/* ── Video card ── */}
                                <div className={styles.videoCard}>
                                    <div className={styles.videoThumb}>
                                        <Image
                                            src={item.video.thumbnail}
                                            alt={item.video.heading}
                                            fill
                                            sizes="45vw"
                                            className={styles.videoImg}
                                        />
                                        <div
                                            className={styles.videoOverlay}
                                            aria-hidden="true"
                                        />
                                        <div className={styles.videoInfo}>
                                            <div className={styles.videoEyebrow}>
                                                <span>{item.video.eyebrow}</span>
                                            </div>
                                            <h3 className={styles.videoHeading}>
                                                {item.video.heading}
                                            </h3>
                                            <div
                                                className={styles.videoDivider}
                                                aria-hidden="true"
                                            />
                                            <p className={styles.videoDescription}>
                                                {item.video.description}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.playButton}
                                            aria-label={`Play video: ${item.video.heading}`}
                                            aria-busy={loadingId === item.id}
                                            disabled={loadingId === item.id}
                                            onClick={() => handlePlay(item)}
                                        >
                                            <span
                                                className={styles.playRing}
                                                aria-hidden="true"
                                            />
                                            <svg
                                                viewBox="0 0 24 24"
                                                className={styles.playIcon}
                                                aria-hidden="true"
                                                focusable="false"
                                            >
                                                <path
                                                    d="M8 5v14l11-7z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* ── Book card ── */}
                                <div className={styles.bookCard}>
                                    <div className={styles.bookCoverWrap}>
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
                                        <div
                                            className={styles.bookDivider}
                                            aria-hidden="true"
                                        />
                                        <p className={styles.bookCaption}>
                                            {item.book.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
