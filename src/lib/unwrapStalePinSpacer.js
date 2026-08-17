/**
 * React 19 StrictMode double-mounts effects in dev. If the first pass's
 * cleanup (gsap.context().revert() / matchMedia revert) doesn't finish
 * unwrapping its ScrollTrigger pin-spacer before the second pass pins the
 * same element again, the new spacer ends up nested *inside* the stale one
 * — and the stale outer spacer (sized for the wrong pin duration) is what
 * the rest of the page actually lays out against, corrupting every later
 * section's scroll position. Call this right before (re-)creating a pin on
 * `el` to strip any leftover wrapper first. No-ops once already unwrapped
 * (and in production, where StrictMode's double-invoke doesn't happen).
 */
export function unwrapStalePinSpacer(el) {
    let parent = el?.parentElement;
    while (parent && parent.classList.contains("pin-spacer")) {
        const grandparent = parent.parentElement;
        if (!grandparent) break;
        grandparent.insertBefore(el, parent);
        parent.remove();
        parent = el.parentElement;
    }
}
