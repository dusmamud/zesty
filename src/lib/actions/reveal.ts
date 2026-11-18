/**
 * Scroll-reveal action: fades an element up once when it enters the viewport.
 *
 * Uses IntersectionObserver (no scroll listeners). The `.reveal` class is added
 * on mount so the element starts hidden, then `.revealed` is added the first
 * time it is visible and the observer disconnects. Stagger with `delay` (ms),
 * applied through the `--reveal-delay` CSS variable.
 *
 * Usage: <div use:reveal>…</div> or <div use:reveal={{ delay: 120 }}>…</div>
 */
export function reveal(node: HTMLElement, params: { delay?: number } = {}) {
	if (typeof window === 'undefined') return {};

	if (params.delay) node.style.setProperty('--reveal-delay', `${params.delay}ms`);
	node.classList.add('reveal');

	// Reduced motion: show immediately, no observer needed.
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('revealed');
		return {};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.05, rootMargin: '0px 0px -20px' }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
