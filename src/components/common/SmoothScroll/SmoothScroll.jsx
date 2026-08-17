"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * Site-wide inertia scroll (eased catch-up between the native scroll
 * position and what's rendered) so every scroll-tied animation on the
 * page — the banner pin, the badge rows, the section reveals — rides on
 * the same smoothed motion instead of the browser's stock scroll.
 *
 * Requires the #smooth-wrapper / #smooth-content markup in layout.js.
 * Left native (untouched) on touch devices and for reduced-motion users.
 */
export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: prefersReducedMotion ? 0 : 1.15,
            smoothTouch: false,
            normalizeScroll: true,
            ignoreMobileResize: true,
        });

        // Pinned sections (the banner) insert their pin-spacer asynchronously
        // on the next ScrollTrigger refresh, which can land after this ran —
        // re-measuring once everything (fonts, images, pin-spacers) has
        // settled keeps the smoother's scroll range from coming up short.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const timeoutId = setTimeout(refresh, 500);

        return () => {
            window.removeEventListener("load", refresh);
            clearTimeout(timeoutId);
            smoother.kill();
        };
    }, []);

    return null;
}
