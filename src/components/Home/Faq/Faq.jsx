"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.css";

const FAQS = [
    {
        number: "01",
        question: "What services do you offer?",
        answer: "I offer full-service support for authors and brands from book development and publishing to marketing strategy and launch. Each project is tailored to your goals and audience for the most impact.",
    },
    {
        number: "02",
        question: "Who do you typically work with?",
        answer: "First-time and established authors, plus brands that publish books as part of a larger marketing strategy — anyone who wants the finished book and its launch handled as one coherent project.",
    },
    {
        number: "03",
        question: "What's your process like?",
        answer: "We start with a discovery conversation about your goals and audience, move through editorial and design, then into a structured launch plan — with regular check-ins at every stage.",
    },
    {
        number: "04",
        question: "How long does a project usually take?",
        answer: "Most full-service projects run three to six months from manuscript to launch, depending on scope. Marketing-only and consulting engagements can move faster.",
    },
    {
        number: "05",
        question: "Do you offer one-time consultations?",
        answer: "Yes — a single strategy session is a great way to get clarity on positioning, next steps, or a specific challenge before committing to a larger engagement.",
    },
    {
        number: "06",
        question: "How do we get started?",
        answer: "Reach out through the contact form with a bit about your project. We'll set up a short call to talk through your goals and see if we're the right fit.",
    },
    {
        number: "07",
        question: "Do you offer one-time consultations?",
        answer: "Yes — a single strategy session is a great way to get clarity on positioning, next steps, or a specific challenge before committing to a larger engagement.",
    },
];

function ChatIcon() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path
                d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9.5L5 20v-4H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.5 9.5h9M7.5 12.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const idBase = useId();

    const toggle = (index) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };

    return (
        <section className={styles.section} aria-labelledby="faq-title">
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.eyebrow}>
                            <span>FAQ</span>
                            <div className={styles.eyebrowLine}>
                                <span className={styles.star} aria-hidden="true">
                                    ✦
                                </span>
                            </div>
                        </div>

                        <h2 id="faq-title" className={styles.heading}>
                            Questions
                            <br />
                            people often ask.
                            <br />
                            <em>Clear answers.</em>
                            <br />
                            <em>Real clarity.</em>
                        </h2>

                        <div className={styles.decorativeLine} aria-hidden="true">
                            <span>✦</span>
                        </div>

                        <p className={styles.description}>
                            Here are answers to the most common questions about working together
                            and my process.
                        </p>

                        <div className={styles.ctaCard} fade-up="">
                            <div className={styles.ctaIcon}>
                                <ChatIcon />
                            </div>
                            <p className={styles.ctaTitle}>Still have a question?</p>
                            <p className={styles.ctaDescription}>
                                I&apos;d love to hear from you. Reach out and I&apos;ll get back to
                                you as soon as possible.
                            </p>
                            <a href="/contact-us" className={styles.ctaLink}>
                                Get in touch
                            </a>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.accordion}>
                            {FAQS.map((item, index) => {
                                const isOpen = index === openIndex;
                                const panelId = `${idBase}-panel-${index}`;
                                const headerId = `${idBase}-header-${index}`;

                                return (
                                    <div key={item.number} className={styles.item} data-open={isOpen}>
                                        <h3 className={styles.itemHeading}>
                                            <button
                                                type="button"
                                                id={headerId}
                                                className={styles.itemHeader}
                                                onClick={() => toggle(index)}
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                            >
                                                <span className={styles.itemNumber}>{item.number}</span>
                                                <span className={styles.itemQuestion}>{item.question}</span>
                                                <span className={styles.itemToggle} aria-hidden="true">
                                                    {isOpen ? "×" : "+"}
                                                </span>
                                            </button>
                                        </h3>

                                        {isOpen && (
                                            <div
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={headerId}
                                                className={styles.itemAnswerRow}
                                            >
                                                <p className={styles.itemAnswer}>{item.answer}</p>
                                                <span className={styles.itemToggleGhost} aria-hidden="true">
                                                    ×
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
