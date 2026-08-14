import Image from "next/image";
import Link from "next/link";
import styles from "./Banner.module.css";

export default function Banner() {
    return (
        <section
            className={styles.banner}
            data-node-id="634:66"
            aria-labelledby="hero-title"
        >
            <div className="container">
                <div className="row align-items-center">
                    {/* Content */}
                    <div className="col-12 col-lg-6">
                        <div className={styles.content}>
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
                                <Link href="/contact-us" className={styles.primaryButton} fade-up="banner-actions">
                                    <span>Start your journey</span>
                                    <span className={styles.arrow} aria-hidden="true">
                                        →
                                    </span>
                                </Link>

                                <Link href="/portfolio" className={styles.secondaryButton} fade-up="banner-actions">
                                    Explore our work
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="col-12 col-lg-6">
                        <div className={styles.imageWrapper} fade-up="">
                            <Image
                                src="/banner-book.png"
                                alt="Swift Book Marketing book"
                                width={470}
                                height={720}
                                sizes="(max-width: 991px) 90vw, 50vw"
                                preload
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
