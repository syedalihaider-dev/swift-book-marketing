import Image from "next/image";
import styles from "./TwoPillars.module.css";

const PILLARS = [
    {
        numeral: "I.",
        icon: "/images/publishing-excellence-icon.png",
        title: "Publishing",
        titleItalic: "Excellence",
        description:
            "The work behind a book that reads and looks right: editorial judgment, considered design, clean production files, and distribution that lands.",
        image: "/images/publishing-excellence-img.png",
        imageWidth: 384,
        imageHeight: 288,
        imageAlt: "Publishing excellence — a finished book styled with editorial production materials",
        variant: "light",
        tileColor: "#efe8d6",
        items: [
            { icon: "/images/developmental-editing.png", label: "Developmental editing" },
            { icon: "/images/interior-typesetting.png", label: "Interior typesetting" },
            { icon: "/images/cover-design.png", label: "Cover design" },
            { icon: "/images/line-copy-editing.png", label: "Line & copy editing" },
            { icon: "/images/retail-distribution.png", label: "Retail distribution" },
            { icon: "/images/print-production.png", label: "Print production" },
        ],
    },
    {
        numeral: "II.",
        icon: "/images/growth-marketing-performance-icon.png",
        title: "Growth & Marketing",
        titleItalic: "Performance",
        description:
            "Launch and steady-state campaigns. Positioning, paid, funnel, and social reviewed against readers reached, not surface metrics.",
        image: "/images/growth-marketing-performance-img.png",
        imageWidth: 284,
        imageHeight: 190,
        imageAlt: "Growth and marketing performance — laptop and phone dashboards with social engagement",
        variant: "dark",
        tileColor: "#173328",
        items: [
            { icon: "/images/launch-strategy-choreography.png", label: "Launch strategy & choreography" },
            { icon: "/images/amazon-meta-advertising.png", label: "Amazon & Meta advertising" },
            { icon: "/images/author-funnel-email.png", label: "Author funnel & email" },
            { icon: "/images/social-presence-content.png", label: "Social presence & content" },
            { icon: "/images/publicity-visibility.png", label: "Publicity & visibility" },
        ],
    },
];

export default function TwoPillars() {
    return (
        <section className={styles.section} aria-labelledby="two-pillars-title">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6" scroll-reveal="two-pillars-header">
                        <div className={styles.eyebrow}>
                            <span>Two pillars, one practice</span>
                            <div className={styles.eyebrowLine}>
                                <span className={styles.star} aria-hidden="true">
                                    ✦
                                </span>
                            </div>
                        </div>

                        <h2 id="two-pillars-title" className={styles.heading}>
                            Craft and reach,
                            <br />
                            in <em>one</em> studio.
                        </h2>
                    </div>

                    <div className="col-12 col-lg-5 offset-lg-1">
                        <div className={styles.intro} scroll-reveal="two-pillars-header">
                            <p className={styles.introText}>
                                The work is split into two disciplines because they need different
                                skills. <strong>Strategy and taste run through both,</strong> and the
                                same team stays with the book from start to finish.
                            </p>
                            <div className={styles.introLine} aria-hidden="true">
                                <span>✦</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`row ${styles.cardsRow}`}>
                    {PILLARS.map((pillar) => (
                        <div key={pillar.numeral} className="col-12 col-lg-6">
                            <div
                                className={`${styles.card} ${styles[pillar.variant]}`}
                                scroll-reveal="two-pillars-cards"
                            >
                                <div className={styles.cardWave} aria-hidden="true" />

                                <div className={styles.cardInner}>
                                    <div className={styles.cardTopRow}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.headerLine}>
                                                <span className={styles.numeral}>{pillar.numeral}</span>
                                                <span className={styles.badge}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={pillar.icon} alt="" width={26} height={26} />
                                                </span>
                                            </div>
                                            <h3 className={styles.cardTitle}>
                                                {pillar.title}
                                                <br />
                                                <em>{pillar.titleItalic}</em>
                                            </h3>
                                        </div>

                                        <div
                                            className={styles.cardImage}
                                            fade-up=""
                                            puzzle-image={pillar.tileColor}
                                        >
                                            <Image
                                                src={pillar.image}
                                                alt={pillar.imageAlt}
                                                width={pillar.imageWidth}
                                                height={pillar.imageHeight}
                                                className={styles.collageImage}
                                            />
                                        </div>
                                    </div>

                                    <p className={styles.cardDescription}>
                                        {pillar.description}
                                    </p>

                                    <div className={styles.itemsDivider} aria-hidden="true">
                                        <span>✦</span>
                                    </div>

                                    <ul className={styles.itemsGrid}>
                                        {pillar.items.map((item) => (
                                            <li key={item.label} className={styles.item}>
                                                <span className={styles.itemIcon}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.icon} alt="" width={40} height={40} />
                                                </span>
                                                <span className={styles.itemLabel}>{item.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <span className={styles.cardBottomMark} aria-hidden="true">
                                    ✦
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
