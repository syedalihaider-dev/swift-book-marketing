"use client";

import styles from "./Contact.module.css";

const CONTACT_INFO = [
    {
        icon: "/images/email-icon.png",
        label: "Email",
        value: "info@swiftbookmarketing.com",
        href: "mailto:info@swiftbookmarketing.com",
    },
    {
        icon: "/images/phone-icon.png",
        label: "Phone",
        value: "+1 (615) 123-4567",
        href: "tel:+16151234567",
    },
    {
        icon: "/images/location-icon.png",
        label: "Location",
        value: "Nashville, TN, USA",
        href: null,
    },
];

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
            <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function Contact() {
    // TODO: wire up to the real form endpoint / server action.
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <section className={styles.section} aria-labelledby="contact-title">
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.left} scroll-reveal="contact-reveal">
                        <div className={styles.eyebrow}>
                            <span>Let&apos;s connect</span>
                            <div className={styles.eyebrowLine}>
                                <span className={styles.star} aria-hidden="true">
                                    ✦
                                </span>
                            </div>
                        </div>

                        <h2 id="contact-title" className={styles.heading}>
                            Have a question
                            <br />
                            or a project in mind?
                            <br />
                            <em>I&apos;d love to hear from you.</em>
                        </h2>

                        <div className={styles.decorativeLine} aria-hidden="true">
                            <span>✦</span>
                        </div>

                        <p className={styles.description}>
                            Whether you&apos;re an author, entrepreneur, or brand leader, I&apos;m
                            here to help bring your vision to life with strategy, creativity, and
                            purpose.
                        </p>

                        <ul className={styles.infoList}>
                            {CONTACT_INFO.map((info) => (
                                <li key={info.label} className={styles.infoItem}>
                                    <span className={styles.infoIcon}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={info.icon} alt="" width={40} height={40} />
                                    </span>
                                    <span className={styles.infoText}>
                                        <span className={styles.infoLabel}>{info.label}</span>
                                        {info.href ? (
                                            <a href={info.href} className={styles.infoValue}>
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className={styles.infoValue}>{info.value}</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.right} scroll-reveal="contact-reveal">
                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <span className={styles.formIcon}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/images/message-icon.png" alt="" width={40} height={40} />
                                </span>
                                <div>
                                    <h3 className={styles.formTitle}>Send a Message</h3>
                                    <p className={styles.formSubtitle}>
                                        Fill out the form below and I&apos;ll get back to you soon.
                                    </p>
                                </div>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.field}>
                                        <label htmlFor="contact-name" className={styles.srOnly}>
                                            Your name
                                        </label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            placeholder="Your Name"
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="contact-email" className={styles.srOnly}>
                                            Email address
                                        </label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            placeholder="Email Address"
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="contact-subject" className={styles.srOnly}>
                                        Subject
                                    </label>
                                    <input
                                        id="contact-subject"
                                        name="subject"
                                        type="text"
                                        placeholder="Subject"
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="contact-message" className={styles.srOnly}>
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        placeholder="Tell me about your project or question..."
                                        className={styles.textarea}
                                        rows={5}
                                        required
                                    />
                                </div>

                                <button type="submit" className={styles.submitButton} magnetic-btn="">
                                    <span>Send Message</span>
                                    <span className={styles.submitArrow} aria-hidden="true">
                                        →
                                    </span>
                                </button>

                                <p className={styles.privacyNote}>
                                    <LockIcon />
                                    <span>Your information is safe and confidential</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
