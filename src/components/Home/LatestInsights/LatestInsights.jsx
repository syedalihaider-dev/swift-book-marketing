"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./LatestInsights.module.css";

// TODO: wire up to the real blog feed — add more entries here and the
// carousel (arrows + dots) picks them up automatically.
const ARTICLES = [
{
id: "book-truly-last",
category: "Publishing",
title: "What Makes a Book Truly Last",
excerpt: "Explore the essential elements that turn a manuscript into a meaningful, impactful book.",
date: "May 24, 2026",
readTime: "6 min read",
image: "/images/latest-01.png",
icon: "/images/expert-guidance.png",
href: "/blog/what-makes-a-book-truly-last",
},
{
id: "building-stories",
category: "Marketing",
title: "Building Stories That Connect",
excerpt: "How strategic storytelling and clear messaging help authors reach the right readers.",
date: "May 20, 2026",
readTime: "5 min read",
image: "/images/latest-02.png",
icon: "/images/strategic-growth.png",
href: "/blog/building-stories-that-connect",
},
{
id: "book-truly-last-2",
category: "Strategy",
title: "What Makes a Book Truly Last",
excerpt: "Explore the essential elements that turn a manuscript into a meaningful, impactful book.",
date: "May 24, 2026",
readTime: "6 min read",
image: "/images/latest-03.png",
icon: "/images/lasting-impact.png",
href: "/blog/what-makes-a-book-truly-last-2",
},
];

const VISIBLE = 3;

export default function LatestInsights() {
const [start, setStart] = useState(0);
const trackRef = useRef(null);
const total = ARTICLES.length;

const visible = Array.from({ length: Math.min(VISIBLE, total) }, (_, i) => ARTICLES[(start + i) % total]);

const goTo = (nextStart, direction) => {
const el = trackRef.current;
if (!el || nextStart === start) return;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
setStart(nextStart);
return;
}

gsap.to(el, {
opacity: 0,
x: direction === "next" ? -24 : 24,
duration: 0.22,
ease: "power2.in",
onComplete: () => {
setStart(nextStart);
gsap.fromTo(
el,
{ opacity: 0, x: direction === "next" ? 24 : -24 },
{ opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
);
},
});
};

const handlePrev = () => goTo((start - 1 + total) % total, "prev");
const handleNext = () => goTo((start + 1) % total, "next");

return (
<section className={styles.section} aria-labelledby="insights-title">
    <div className="container">
        <div className={styles.row}>
            <div className={styles.left} scroll-reveal="insights-reveal">
                <div className={styles.eyebrow}>
                    <span>Latest insights</span>
                    <div className={styles.eyebrowLine}>
                        <span className={styles.star} aria-hidden="true">
                            ✦
                        </span>
                    </div>
                </div>

                <h2 id="insights-title" className={styles.heading}>
                    Ideas that inform.
                    <br />
                    <em>Stories that inspire.</em>
                </h2>

                <div className={styles.decorativeLine} aria-hidden="true">
                    <span>✦</span>
                </div>

                <p className={styles.description}>
                    Thoughtful perspectives on publishing, marketing, and storytelling to
                    help authors and brands make an impact that lasts.
                </p>

                <Link href="/blog" className={styles.viewAllButton} magnetic-btn="">
                <span>View all articles</span>
                <span className={styles.buttonArrow} aria-hidden="true">
                    →
                </span>
                </Link>
            </div>

            <div className={styles.right} scroll-reveal="insights-reveal">
                <div className={styles.track} ref={trackRef}>
                    {visible.map((article) => (
                    <article key={article.id} className={styles.card}>
                        <div className={styles.cardImage}>
                            <div className={styles.cardImageInner} puzzle-image="">
                                <Image src={article.image} alt={article.title} fill sizes="(max-width: 991px) 90vw, 27vw"
                                    className={styles.cardImg} />
                            </div>
                            <div className={styles.cardIcon}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={article.icon} alt="" width={40} height={40} />
                            </div>
                        </div>

                        <div className={styles.cardBody}>
                            <p className={styles.cardCategory}>{article.category}</p>
                            <h3 className={styles.cardTitle}>{article.title}</h3>
                            <p className={styles.cardExcerpt}>{article.excerpt}</p>

                            <div className={styles.cardDivider} aria-hidden="true" />

                            <p className={styles.cardMeta}>
                                {article.date}
                                <span className={styles.metaDot} aria-hidden="true">
                                    •
                                </span>
                                {article.readTime}
                            </p>

                            <Link href={article.href} className={styles.readMore}>
                            <span>Read more</span>
                            <span className={styles.readMoreArrow} aria-hidden="true">
                                →
                            </span>
                            </Link>
                        </div>
                    </article>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <button type="button" className={styles.arrow} onClick={handlePrev} aria-label="Previous articles">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className={styles.dots}>
                        {ARTICLES.map((article, i) => (
                        <button key={article.id} type="button" className={`${styles.dot} ${i===start ? styles.dotActive
                            : "" }`} onClick={()=> goTo(i, i > start ? "next" : "prev")}
                            aria-label={`Show article ${i + 1}: ${article.title}`}
                            aria-current={i === start}
                            />
                            ))}
                    </div>

                    <button type="button" className={styles.arrow} onClick={handleNext} aria-label="Next articles">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
);
}
