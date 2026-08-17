"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * Site-wide, attribute-driven award-site button hover: a magnetic cursor
 * pull plus a directional color-fill sweep. Mounted once in the root
 * layout — never import/run this per-section.
 *
 * Usage: add `magnetic-btn=""` to a filled brand CTA (Link or button).
 * Skipped entirely for touch/coarse pointers and prefers-reduced-motion,
 * leaving the element's normal CSS :hover styles untouched.
 */

const STRENGTH = 0.35;
const MAX_PULL = 14;
const HOVER_LIFT = -3;

const EDGE_START = {
    top: { xPercent: 0, yPercent: -101 },
    bottom: { xPercent: 0, yPercent: 101 },
    left: { xPercent: -101, yPercent: 0 },
    right: { xPercent: 101, yPercent: 0 },
};

function nearestEdge(el, event) {
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;
    const distances = {
        top: relY,
        bottom: rect.height - relY,
        left: relX,
        right: rect.width - relX,
    };
    return Object.keys(distances).reduce((a, b) => (distances[a] < distances[b] ? a : b));
}

function initMagneticButton(el) {
    if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
    }
    el.style.overflow = "hidden";

    Array.from(el.children).forEach((child) => {
        child.style.position = "relative";
        child.style.zIndex = "2";
    });

    const fill = document.createElement("span");
    fill.setAttribute("aria-hidden", "true");
    fill.style.position = "absolute";
    fill.style.inset = "0";
    fill.style.zIndex = "1";
    fill.style.pointerEvents = "none";
    fill.style.borderRadius = "inherit";
    fill.style.background = "var(--secondary-color)";
    el.insertBefore(fill, el.firstChild);
    gsap.set(fill, EDGE_START.bottom);

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    let hovered = false;

    const onEnter = (event) => {
        hovered = true;
        gsap.set(fill, EDGE_START[nearestEdge(el, event)]);
        gsap.to(fill, { xPercent: 0, yPercent: 0, duration: 0.5, ease: "power3.out" });
    };

    const onMove = (event) => {
        if (!hovered) return;
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        xTo(gsap.utils.clamp(-MAX_PULL, MAX_PULL, relX * STRENGTH));
        yTo(HOVER_LIFT + gsap.utils.clamp(-MAX_PULL, MAX_PULL, relY * STRENGTH));
    };

    const onLeave = (event) => {
        hovered = false;
        gsap.to(fill, { ...EDGE_START[nearestEdge(el, event)], duration: 0.45, ease: "power2.in" });
        xTo(0);
        yTo(0);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        fill.remove();
        gsap.set(el, { clearProps: "transform" });
        el.removeAttribute("data-magnetic-init");
    };
}

export default function MagneticButtons() {
    const pathname = usePathname();

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (prefersReducedMotion || !supportsHover) return;

        const cleanups = [];
        gsap.utils.toArray("[magnetic-btn]").forEach((el) => {
            if (el.hasAttribute("data-magnetic-init")) return;
            el.setAttribute("data-magnetic-init", "true");
            cleanups.push(initMagneticButton(el));
        });

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }, [pathname]);

    return null;
}
