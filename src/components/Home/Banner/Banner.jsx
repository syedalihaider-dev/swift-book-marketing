"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { unwrapStalePinSpacer } from "@/lib/unwrapStalePinSpacer";
import styles from "./Banner.module.css";

/**
 * Pinned "book opening" hero timeline, mapped to ScrollTrigger progress
 * (0 -> 1 across the pinned scroll distance below). Tweak freely.
 */
const TIMELINE = {
    contentExit: { start: 0.05, end: 0.3 },
    bookMove: { start: 0.05, end: 0.3 },
    coverOpen: { start: 0.2, end: 0.55 },
    bookTilt: { start: 0.2, end: 0.55 },
    // The left leaf only "exists" once the cover has actually finished
    // swinging open — the right leaf needs no timing of its own, it's
    // simply revealed by the cover's own rotation as it uncovers it.
    pageLeftReveal: { start: 0.55, end: 0.63 },
    pageReveal: { start: 0.63, end: 0.85 },
    exit: { start: 0.92, end: 1.0 },
};

const BOOK_IDLE_SCALE = 0.76;
const BOOK_OPEN_SCALE = 1.18;
const BOOK_CENTER_XPERCENT = -34;
const BOOK_IDLE_TILT = 12;

export default function Banner() {
    const bannerRef = useRef(null);
    const contentRef = useRef(null);
    const heroVignetteRef = useRef(null);
    const bookStageRef = useRef(null);
    const bookRef = useRef(null);
    const bookSpineRef = useRef(null);
    const coverRef = useRef(null);
    const coverGlareRef = useRef(null);
    const pageLeftRef = useRef(null);
    const pageRightRef = useRef(null);
    const pageHeadingRef = useRef(null);
    const pageParagraphRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
                () => {
                    // Dev-mode StrictMode mounts effects twice; if the first
                    // pass's cleanup didn't finish unwrapping its pin-spacer
                    // before this second pass pins again, the new spacer
                    // nests inside the stale one and the outer (undersized)
                    // one is what the rest of the page actually measures
                    // against. Unwrap any leftover spacer before pinning.
                    unwrapStalePinSpacer(bannerRef.current);
                    ScrollTrigger.getAll()
                        .filter((st) => st.trigger === bannerRef.current)
                        .forEach((st) => st.kill());

                    const split = new SplitText(
                        [pageHeadingRef.current, pageParagraphRef.current],
                        { type: "words", wordsClass: styles.word }
                    );

                    gsap.set(pageLeftRef.current, { visibility: "visible", opacity: 0 });
                    gsap.set(split.words, { opacity: 0, y: 16 });
                    gsap.set(bookRef.current, {
                        scale: BOOK_IDLE_SCALE,
                        rotateY: BOOK_IDLE_TILT,
                    });
                    gsap.set(coverRef.current, { rotateY: 0 });

                    const tl = gsap.timeline({
                        defaults: { ease: "power2.inOut" },
                        scrollTrigger: {
                            trigger: bannerRef.current,
                            start: "top top",
                            end: "+=250%",
                            pin: true,
                            pinSpacing: true,
                            scrub: 0.3,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    tl.to(
                        contentRef.current,
                        {
                            xPercent: -100,
                            opacity: 0,
                            duration: TIMELINE.contentExit.end - TIMELINE.contentExit.start,
                        },
                        TIMELINE.contentExit.start
                    )
                        .to(
                            heroVignetteRef.current,
                            {
                                opacity: 1,
                                duration: TIMELINE.bookMove.end - TIMELINE.bookMove.start,
                            },
                            TIMELINE.bookMove.start
                        )
                        .to(
                            bookRef.current,
                            {
                                xPercent: BOOK_CENTER_XPERCENT,
                                scale: BOOK_OPEN_SCALE,
                                duration: TIMELINE.bookMove.end - TIMELINE.bookMove.start,
                            },
                            TIMELINE.bookMove.start
                        )
                        .to(
                            coverRef.current,
                            {
                                rotateY: -180,
                                ease: "power3.inOut",
                                duration: TIMELINE.coverOpen.end - TIMELINE.coverOpen.start,
                            },
                            TIMELINE.coverOpen.start
                        )
                        .to(
                            coverGlareRef.current,
                            {
                                xPercent: 260,
                                ease: "power1.inOut",
                                duration: TIMELINE.coverOpen.end - TIMELINE.coverOpen.start,
                            },
                            TIMELINE.coverOpen.start
                        )
                        .to(
                            bookRef.current,
                            {
                                rotateY: 0,
                                duration: TIMELINE.bookTilt.end - TIMELINE.bookTilt.start,
                            },
                            TIMELINE.bookTilt.start
                        )
                        .to(
                            [pageLeftRef.current, bookSpineRef.current],
                            {
                                opacity: 1,
                                duration: TIMELINE.pageLeftReveal.end - TIMELINE.pageLeftReveal.start,
                            },
                            TIMELINE.pageLeftReveal.start
                        )
                        .to(
                            split.words,
                            {
                                opacity: 1,
                                y: 0,
                                ease: "power2.out",
                                duration: 0.12,
                                stagger: { amount: TIMELINE.pageReveal.end - TIMELINE.pageReveal.start - 0.12 },
                            },
                            TIMELINE.pageReveal.start
                        )
                        .to(
                            [bookStageRef.current, heroVignetteRef.current],
                            {
                                opacity: 0,
                                scale: 0.94,
                                ease: "power1.in",
                                duration: TIMELINE.exit.end - TIMELINE.exit.start,
                            },
                            TIMELINE.exit.start
                        );

                    return () => split.revert();
                }
            );

            return () => mm.revert();
        }, bannerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className={styles.banner}
            data-node-id="634:66"
            aria-labelledby="hero-title"
            ref={bannerRef}
        >
            <div className={styles.heroVignette} ref={heroVignetteRef} aria-hidden="true" />

            <div className="container">
                <div className="row align-items-center">
                    {/* Content */}
                    <div className="col-12 col-lg-6">
                        <div className={styles.content} ref={contentRef}>
                            <div className={styles.eyebrow}>
                                <span>We don&apos;t just publish books</span>
                                <div className={styles.eyebrowLine}>
                                    <span className={styles.star} aria-hidden="true">
                                        ✦
                                    </span>
                                </div>
                            </div>

                            <h1 id="hero-title" className={styles.title}>
                                We Craft
                                <br />
                                <em>Legacies.</em>
                            </h1>

                            <div className={styles.decorativeLine} aria-hidden="true">
                                <span>✦</span>
                            </div>

                            <p className={styles.description}>
                                Swift Book Marketing is a global publishing house helping
                                authors turn their ideas into timeless books and powerful
                                brands.
                            </p>

                            <div className={styles.actions}>
                                <Link href="/contact-us" className={styles.primaryButton} magnetic-btn="">
                                    <span>Start your journey</span>
                                    <span className={styles.arrow} aria-hidden="true">
                                        →
                                    </span>
                                </Link>

                                <Link href="/portfolio" className={styles.secondaryButton}>
                                    Explore our work
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Book */}
                    <div className="col-12 col-lg-6">
                        <div className={styles.bookStage} ref={bookStageRef}>
                            <div className={styles.book} ref={bookRef}>
                                <div className={styles.bookPageLeft} ref={pageLeftRef}>
                                    <div className={styles.bookPageLeftInner} aria-hidden="true">
                                        <div className={styles.pageEyebrow}>
                                            <span>Our promise</span>
                                        </div>

                                        <p ref={pageHeadingRef} className={styles.pageHeading}>
                                            We Craft <em>Legacies.</em>
                                        </p>

                                        <p ref={pageParagraphRef} className={styles.pageParagraph}>
                                            <span className={styles.dropCap}>S</span>wift Book
                                            Marketing is a global publishing house helping authors
                                            turn their ideas into timeless books and powerful
                                            brands.
                                        </p>

                                        <div className={styles.pageFooter}>
                                            <span className={styles.pageFooterNumber}>01</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.bookPageRight} ref={pageRightRef}>
                                    <div className={styles.bookPageRightFrame}>
                                        <Image
                                            src="/images/port-assets-01.png"
                                            alt="Beyond Words — a book cover designed and marketed by Swift Book Marketing"
                                            fill
                                            sizes="(max-width: 991px) 70vw, 28vw"
                                        />
                                    </div>
                                    <p className={styles.imageCaption}>
                                        Beyond Words — a legacy we helped bring to life.
                                    </p>
                                </div>

                                <div className={styles.bookSpine} ref={bookSpineRef} aria-hidden="true" />

                                <div className={styles.bookCover} ref={coverRef}>
                                    <div className={styles.bookCoverFront}>
                                        <Image
                                            src="/banner-book.png"
                                            alt="Swift Book Marketing book"
                                            fill
                                            sizes="(max-width: 991px) 90vw, 35vw"
                                            priority
                                        />
                                        <div className={styles.bookCoverGlare} ref={coverGlareRef} />
                                    </div>
                                    <div className={styles.bookCoverBack} aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
