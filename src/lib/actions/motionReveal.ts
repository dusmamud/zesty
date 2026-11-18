/**
 * Motion-powered scroll reveal (Motion v14 — the official successor to
 * Framer Motion, which is React-only and cannot run in SvelteKit).
 *
 * Uses Motion's `inView` + `animate`: when the element first enters the
 * viewport it glides up once (transform + opacity only, compositor thread).
 * Reduced motion: shows immediately. If Motion ever fails, the element is
 * shown as-is — content is never left hidden.
 *
 * Usage: <div use:motionReveal>…</div> or <div use:motionReveal={{ delay: 120 }}>…</div>
 */
import { animate, inView } from 'motion';

export function motionReveal(
	node: HTMLElement,
	params: { delay?: number } = {}
) {
	if (typeof window === 'undefined') return {};

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.style.opacity = '1';
		return {};
	}

	node.style.opacity = '0';
	const delay = (params.delay ?? 0) / 1000;

	let stop: (() => void) | undefined;
	try {
		stop = inView(
			node,
			() => {
				animate(
					node,
					{ opacity: [0, 1], y: [12, 0] },
					{ duration: 0.45, delay, ease: 'easeOut' }
				);
			},
			{ margin: '-20px' }
		);
	} catch {
		node.style.opacity = '1';
	}

	return {
		destroy() {
			stop?.();
		}
	};
}
