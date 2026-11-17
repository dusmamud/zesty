/**
 * Gentle hero parallax: translates the element down slowly as the page scrolls.
 *
 * Transform-only, rAF-throttled passive scroll listener, clamped to `max`
 * pixels. Disabled on touch devices and when the user prefers reduced motion.
 *
 * Usage: <div use:parallax={{ speed: 0.08, max: 80 }}>…</div>
 */
export function parallax(node: HTMLElement, params: { speed?: number; max?: number } = {}) {
	if (typeof window === 'undefined') return {};

	const speed = params.speed ?? 0.08;
	const max = params.max ?? 80;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const coarse = window.matchMedia('(pointer: coarse)').matches;
	if (reduced || coarse) return {};

	let ticking = false;

	function update() {
		ticking = false;
		const y = Math.min(window.scrollY * speed, max);
		node.style.transform = `translateY(${y}px)`;
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(update);
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
		}
	};
}
