import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={`row ${styles.headerRow}`}>
                    <div className="col-12">
                        <nav
                            className={`d-flex align-items-center justify-content-between ${styles.nav}`}
                            aria-label="Main navigation"
                        >
                            {/* Logo */}
                            <Link
                                href="/"
                                className={styles.logoLink}
                                aria-label="Swift Book Marketing home"
                            >
                                <Image
                                    src="/logo.png"
                                    alt="Swift Book Marketing"
                                    width={208}
                                    height={70}
                                    priority
                                />
                            </Link>

                            {/* Navigation Actions */}
                            <div className="d-flex align-items-center">
                                <Link href="/contact-us" className={styles.beginLink}>
                                    Begin
                                </Link>

                                <button
                                    type="button"
                                    className={styles.menuButton}
                                    aria-label="Open navigation menu"
                                    aria-expanded="false"
                                >
                                    <span />
                                    <span />
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}