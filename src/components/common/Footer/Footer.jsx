"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const SOCIALS = [
    {
        name: "Facebook",
        href: "https://facebook.com",
        path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.4.3-.8.7-.8Z",
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        path: "M6.9 9.5H4V20h2.9V9.5ZM5.4 5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 20h-2.9v-5.4c0-1.3-.5-2.1-1.6-2.1-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V20H11s.04-9.6 0-10.5h2.9v1.5c.4-.6 1.1-1.5 2.6-1.5 1.9 0 3.4 1.3 3.4 4V20Z",
    },
    {
        name: "Instagram",
        href: "https://instagram.com",
        path: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm4.3-5.7a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM20 8.2a4.8 4.8 0 0 0-4.8-4.8H8.8A4.8 4.8 0 0 0 4 8.2v7.4A4.8 4.8 0 0 0 8.8 20.4h6.4a4.8 4.8 0 0 0 4.8-4.8V8.2Zm-1.4 7.4a3.4 3.4 0 0 1-3.4 3.4H8.8a3.4 3.4 0 0 1-3.4-3.4V8.2a3.4 3.4 0 0 1 3.4-3.4h6.4a3.4 3.4 0 0 1 3.4 3.4v7.4Z",
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        path: "M19.5 7.3c-.5.2-1 .4-1.6.5.6-.3 1-.9 1.2-1.5-.5.3-1.1.6-1.8.7a2.8 2.8 0 0 0-4.8 2.6A8 8 0 0 1 6.6 6.5a2.9 2.9 0 0 0 .9 3.8c-.5 0-.9-.1-1.3-.3v.1c0 1.4 1 2.5 2.3 2.8-.4.1-.8.1-1.3.1-.3 0-.6 0-.9-.1a2.8 2.8 0 0 0 2.6 2c-1 .7-2.1 1.1-3.4 1.1H4.3A8 8 0 0 0 8.7 17c5.3 0 8.2-4.4 8.2-8.2v-.4c.6-.4 1.1-.9 1.5-1.5-.5.2-1.1.4-1.7.5.6-.4 1.1-1 1.3-1.7Z",
    },
];

const LINK_COLUMNS = [
    {
        title: "Services",
        links: [
            { label: "Publishing Excellence", href: "/services/publishing-excellence" },
            { label: "Growth & Marketing", href: "/services/growth-marketing" },
            { label: "Book Strategy", href: "/services/book-strategy" },
            { label: "Brand Storytelling", href: "/services/brand-storytelling" },
            { label: "Consulting", href: "/services/consulting" },
        ],
    },
    {
        title: "About",
        links: [
            { label: "About", href: "/about" },
            { label: "My Approach", href: "/about/approach" },
            { label: "Case Studies", href: "/about/case-studies" },
            { label: "Testimonials", href: "/about/testimonials" },
            { label: "Media & Press", href: "/about/press" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: "/blog" },
            { label: "Free Guides", href: "/resources/guides" },
            { label: "Author Resources", href: "/resources/authors" },
            { label: "Recommended Books", href: "/resources/books" },
            { label: "FAQS", href: "/#faq" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Portfolio", href: "/portfolio" },
            { label: "Process", href: "/#process" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
            { label: "Contact", href: "/contact-us" },
        ],
    },
];

export default function Footer() {
    // TODO: wire up to the real newsletter endpoint / server action.
    const handleSubscribe = (event) => {
        event.preventDefault();
    };

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logoLink} aria-label="Swift Book Marketing home">
                            <Image src="/images/footer-logo.png" alt="Swift Book Marketing" width={191} height={56} />
                        </Link>
                        <div className={styles.brandRule} aria-hidden="true" />
                        <p className={styles.brandDescription}>
                            Our team of committed and ambitious marketers at Swift Book
                            Marketing has a proven record of producing several popular
                            publications all across the business goals.
                        </p>

                        <ul className={styles.socials}>
                            {SOCIALS.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.href}
                                        className={styles.socialLink}
                                        aria-label={social.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                                            <path d={social.path} fill="currentColor" />
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {LINK_COLUMNS.map((column) => (
                        <nav key={column.title} className={styles.linkColumn} aria-label={column.title}>
                            <p className={styles.columnTitle}>{column.title}</p>
                            <div className={styles.columnRule} aria-hidden="true" />
                            <ul className={styles.linkList}>
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className={styles.link}>
                                            <span className={styles.linkChevron} aria-hidden="true">
                                                ›
                                            </span>
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    <div className={styles.newsletter}>
                        <p className={styles.newsletterTitle}>Stay Inspired</p>
                        <p className={styles.newsletterDescription}>
                            Insights, strategies, and stories delivered to your inbox.
                        </p>

                        <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                            <label htmlFor="footer-newsletter-email" className={styles.srOnly}>
                                Your email address
                            </label>
                            <input
                                id="footer-newsletter-email"
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                className={styles.newsletterInput}
                                required
                            />
                            <button type="submit" className={styles.newsletterSubmit} aria-label="Subscribe">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottomLine} aria-hidden="true">
                    <span>✦</span>
                </div>

                <p className={styles.copyright}>
                    Copyright © {new Date().getFullYear()} Swift Book Marketing. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
