"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./VideoShowcase.module.css";

// TODO: swap in the real testimonial videos. `videoSrc` can be a direct
// .mp4 URL, or a YouTube/Vimeo URL — Fancybox auto-detects the type and
// handles the autoplay/mute params itself.
const VIDEOS = [
    {
        id: "editorial-partnership",
        number: "01",
        title: "Editorial partnership",
        category: "Client review",
        format: "Portrait video",
        image: "/images/client-review-01.png",
        alt: "Author speaking about her editorial partnership with Swift Book Marketing",
        accent: "primary",
        videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    {
        id: "launch-partnership",
        number: "02",
        title: "Launch partnership",
        category: "Client review",
        format: "Portrait video",
        image: "/images/client-review-02.png",
        alt: "Author speaking about her book launch partnership with Swift Book Marketing",
        accent: "secondary",
        videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
];

// Fancybox is only needed once someone actually opens a video, so it's
// loaded on demand instead of shipping it in the initial page bundle.
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

export default function VideoShowcase() {
    const [loadingId, setLoadingId] = useState(null);

    const handlePlay = async (video) => {
        setLoadingId(video.id);
        try {
            const Fancybox = await loadFancybox();
            Fancybox.show(
                [
                    // No explicit `type` — Fancybox auto-detects html5video vs.
                    // YouTube/Vimeo from the URL itself, so swapping `videoSrc`
                    // above is all that's needed to point at a real video.
                    {
                        src: video.videoSrc,
                        thumb: video.image,
                    },
                ],
                {
                    theme: "dark",
                    backdropClick: "close",
                    closeButton: "auto",
                    Carousel: {
                        Video: { autoplay: true },
                    },
                }
            );
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section className={styles.section} aria-labelledby="video-showcase-title">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5">
                        <div className={styles.content} scroll-reveal="video-showcase-reveal">
                            <div className={styles.eyebrow}>
                                <span>Client reviews</span>
                                <div className={styles.eyebrowLine}>
                                    <span className={styles.star} aria-hidden="true">
                                        ✦
                                    </span>
                                </div>
                            </div>

                            <h2 id="video-showcase-title" className={styles.title}>
                                Hear the journey <em>in their own words.</em>
                            </h2>

                            <div className={styles.decorativeLine} aria-hidden="true">
                                <span>✦</span>
                            </div>

                            <p className={styles.description}>
                                Two author perspectives on what a connected publishing and
                                marketing partnership should feel like.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7">
                        <div className={styles.videoList} scroll-reveal="video-showcase-reveal">
                            {VIDEOS.map((video) => (
                                <div key={video.id} className={styles.videoCard}>
                                    <div className={styles.thumb}>
                                        <Image
                                            src={video.image}
                                            alt={video.alt}
                                            fill
                                            sizes="(max-width: 991px) 100vw, 60vw"
                                            className={styles.thumbImage}
                                        />
                                        <div className={styles.overlay} aria-hidden="true" />

                                        <div className={styles.info}>
                                            <span className={styles.number}>{video.number}</span>
                                            <span
                                                className={`${styles.numberLine} ${styles[video.accent]}`}
                                                aria-hidden="true"
                                            />
                                            <p className={styles.videoTitle}>{video.title}</p>
                                            <p className={styles.meta}>
                                                {video.category}
                                                <span className={styles.dot} aria-hidden="true">
                                                    •
                                                </span>
                                                {video.format}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className={styles.playButton}
                                            aria-label={`Play video: ${video.title}`}
                                            aria-busy={loadingId === video.id}
                                            disabled={loadingId === video.id}
                                            onClick={() => handlePlay(video)}
                                        >
                                            <span className={styles.playRing} aria-hidden="true" />
                                            <svg
                                                viewBox="0 0 24 24"
                                                className={styles.playIcon}
                                                aria-hidden="true"
                                                focusable="false"
                                            >
                                                <path d="M8 5v14l11-7z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
