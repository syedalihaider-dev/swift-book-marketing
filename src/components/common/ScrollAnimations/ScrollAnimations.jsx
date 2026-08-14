"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide, attribute-driven GSAP scroll-reveal engine. Mounted once in the
 * root layout — never import/run this per-section. To animate an element,
 * add one of the attributes below in JSX; no extra wiring required.
 *
 * Elements ([fade-up] on images/cards/buttons):
 *   [fade-up]         fades up on its own
 *   [fade-up="group"] elements sharing the same group value fade up together, staggered
 *
 * Images ([puzzle-image] on a position:relative, overflow:hidden image wrapper):
 *   [puzzle-image]    the image assembles from a grid of tiles as it scrolls into view
 */

let pluginRegistered = false;
function registerPlugins() {
    if (pluginRegistered) return;
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
}

function initFadeUpGroups(els, prefersReducedMotion) {
    const groups = new Map();

    els.forEach((el) => {
        if (prefersReducedMotion) {
            gsap.set(el, { opacity: 1 });
            return;
        }
        // A non-empty `fade-up="name"` groups elements to stagger together.
        // A bare/empty `fade-up` means "animate on its own" — key it by the
        // element itself so unrelated single elements never get lumped
        // into one shared "ungrouped" bucket (and one shared trigger).
        const groupValue = el.getAttribute("fade-up");
        const key = groupValue || el;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(el);
    });

    groups.forEach((els) => {
        gsap.fromTo(
            els,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: els[0],
                    start: "top 90%",
                    toggleActions: "play none none none",
                    markers: false,
                },
            }
        );
    });
}

const PUZZLE_COLS = 6;
const PUZZLE_ROWS = 4;

function buildPuzzleOverlay(el) {
    const overlay = document.createElement("div");
    overlay.className = "gs-puzzle-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.zIndex = "2";
    overlay.style.display = "grid";
    overlay.style.gridTemplateColumns = `repeat(${PUZZLE_COLS}, 1fr)`;
    overlay.style.gridTemplateRows = `repeat(${PUZZLE_ROWS}, 1fr)`;
    overlay.style.pointerEvents = "none";

    // A non-empty `puzzle-image="#hex"` overrides the tile color; otherwise
    // tiles match the page background so the image reads as fully hidden.
    const tileColor = el.getAttribute("puzzle-image") || "var(--bg-color)";
    const tiles = [];
    for (let i = 0; i < PUZZLE_COLS * PUZZLE_ROWS; i++) {
        const tile = document.createElement("div");
        tile.style.backgroundColor = tileColor;
        tiles.push(tile);
        overlay.appendChild(tile);
    }

    el.appendChild(overlay);
    return { overlay, tiles };
}

function initPuzzleImages(els, prefersReducedMotion, puzzleOverlays) {
    els.forEach((el) => {
        // The overlay is positioned absolute; its container must anchor it.
        if (getComputedStyle(el).position === "static") {
            el.style.position = "relative";
        }

        if (prefersReducedMotion) return;

        const { overlay, tiles } = buildPuzzleOverlay(el);
        puzzleOverlays.push(overlay);

        gsap.to(tiles, {
            opacity: 0,
            scale: 0.4,
            duration: 0.5,
            ease: "power2.inOut",
            stagger: { each: 0.025, from: "random" },
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
                markers: false,
            },
            onComplete: () => overlay.remove(),
        });
    });
}

export default function ScrollAnimations() {
    const pathname = usePathname();

    useEffect(() => {
        registerPlugins();
        document.documentElement.classList.add("js");

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const initializedEls = [];
        const puzzleOverlays = [];

        const ctx = gsap.context(() => {
            try {
                const newFadeUpEls = [];
                gsap.utils.toArray("[fade-up]").forEach((el) => {
                    if (el.hasAttribute("data-gs-init")) return;
                    el.setAttribute("data-gs-init", "true");
                    initializedEls.push(el);
                    newFadeUpEls.push(el);
                });
                initFadeUpGroups(newFadeUpEls, prefersReducedMotion);

                const newPuzzleEls = [];
                gsap.utils.toArray("[puzzle-image]").forEach((el) => {
                    if (el.hasAttribute("data-gs-init")) return;
                    el.setAttribute("data-gs-init", "true");
                    initializedEls.push(el);
                    newPuzzleEls.push(el);
                });
                initPuzzleImages(newPuzzleEls, prefersReducedMotion, puzzleOverlays);
            } catch (error) {
                // Fail open: never leave content permanently invisible if the
                // animation setup throws for any reason.
                console.error("ScrollAnimations init failed, revealing content", error);
                gsap.set("[fade-up]", { opacity: 1 });
                puzzleOverlays.forEach((overlay) => overlay.remove());
            }
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready?.then(refresh);
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            ctx.revert();
            puzzleOverlays.forEach((overlay) => overlay.remove());
            initializedEls.forEach((el) => el.removeAttribute("data-gs-init"));
        };
    }, [pathname]);

    return null;
}
