"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Portfolio.module.css";

// TODO: add more entries as more author case studies become available — the
// scroll-driven slider already cycles through however many items are here.
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
            // TODO: swap for the real video — direct .mp4 or a YouTube/Vimeo URL both work.
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

const SCROLL_DISTANCE_PER_ITEM = 0.7; // fraction of a viewport height, per extra item

export default function Portfolio() {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [loadingVideo, setLoadingVideo] = useState(false);

    const total = ITEMS.length;
    const item = ITEMS[index];

    useEffect(() => {
        if (total <= 1) return undefined;

        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return undefined;

        const ctx = gsap.context(() => {
            const el = cardsRef.current;
            let current = 0;

            const goTo = (nextIndex) => {
                if (!el || nextIndex === current) return;
                const direction = nextIndex > current ? "next" : "prev";
                current = nextIndex;
                setIndex(nextIndex);

                gsap.to(el, {
                    opacity: 0,
                    x: direction === "next" ? -30 : 30,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.fromTo(
                            el,
                            { opacity: 0, x: direction === "next" ? 30 : -30 },
                            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                        );
                    },
                });
            };

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top center",
                end: () => `+=${(total - 1) * window.innerHeight * SCROLL_DISTANCE_PER_ITEM}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const next = Math.min(total - 1, Math.max(0, Math.floor(self.progress * total)));
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
                        <div className={styles.authorCard} fade-up="portfolio-cards">
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
                        <div className={styles.videoCard} fade-up="portfolio-cards">
                            <div className={styles.videoThumb} puzzle-image="">
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
                        <div className={styles.bookCard} fade-up="portfolio-cards">
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
            </div>
        </section>
    );
}
