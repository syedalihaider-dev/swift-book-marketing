import Link from "next/link";
import styles from "./CallToAction.module.css";

const HIGHLIGHT = {
    icon: "/images/thoughtful-strategic-impactful.png",
    title: "Thoughtful. Strategic. Impactful.",
    description:
        "We partner with authors and brands to create books that inspire and strategies that deliver results.",
};

const FEATURES = [
    {
        icon: "/images/expert-guidance.png",
        titleLine1: "Expert",
        titleLine2: "Guidance",
        description: "From concept to completed manuscript.",
    },
    {
        icon: "/images/strategic-growth.png",
        titleLine1: "Strategic",
        titleLine2: "Growth",
        description: "Marketing that reaches the right readers.",
    },
    {
        icon: "/images/lasting-impact.png",
        titleLine1: "Lasting",
        titleLine2: "Impact",
        description: "Stories and strategies that drive real change.",
    },
];

export default function CallToAction() {
    return (
        <section className={styles.section} aria-labelledby="cta-title">
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.eyebrow}>
                            <span>Let&apos;s create something meaningful</span>
                            <div className={styles.eyebrowLine}>
                                <span className={styles.star} aria-hidden="true">
                                    ✦
                                </span>
                            </div>
                        </div>

                        <h2 id="cta-title" className={styles.heading}>
                            Ready to tell
                            <br />
                            your story?
                            <br />
                            <em>Let&apos;s bring it to life.</em>
                        </h2>

                        <div className={styles.decorativeLine} aria-hidden="true">
                            <span>✦</span>
                        </div>

                        <p className={styles.description}>
                            Whether you&apos;re writing your first book or growing your author
                            platform, we&apos;re here to help you create impact that lasts.
                        </p>

                        <div className={styles.actions}>
                            <Link href="/contact-us" className={styles.primaryButton} fade-up="cta-actions">
                                <span>Get in touch</span>
                                <span className={styles.arrow} aria-hidden="true">
                                    →
                                </span>
                            </Link>

                            <Link href="/portfolio" className={styles.secondaryButton} fade-up="cta-actions">
                                Explore all work
                            </Link>
                        </div>
                    </div>

                    <div className={styles.centerDivider} aria-hidden="true">
                        <span>✦</span>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.highlight} fade-up="">
                            <div className={styles.highlightIcon}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={HIGHLIGHT.icon} alt="" width={70} height={70} />
                            </div>
                            <div className={styles.highlightText}>
                                <h3 className={styles.highlightTitle}>{HIGHLIGHT.title}</h3>
                                <p className={styles.highlightDescription}>{HIGHLIGHT.description}</p>
                            </div>
                        </div>

                        <div className={styles.rightDivider} aria-hidden="true">
                            <span>✦</span>
                        </div>

                        <div className={styles.features}>
                            {FEATURES.map((feature) => (
                                <div key={feature.titleLine1} className={styles.feature} fade-up="cta-features">
                                    <div className={styles.featureIcon}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={feature.icon} alt="" width={56} height={56} />
                                    </div>
                                    <h4 className={styles.featureTitle}>
                                        {feature.titleLine1}
                                        <br />
                                        {feature.titleLine2}
                                    </h4>
                                    <p className={styles.featureDescription}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
