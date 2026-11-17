<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		/** Final value to count up to. */
		value: number;
		decimals?: number;
		prefix?: string;
		suffix?: string;
		duration?: number;
	}

	let { value, decimals = 0, prefix = '', suffix = '', duration = 1200 }: Props = $props();

	let display = $state(0);
	let el: HTMLSpanElement | undefined = $state();

	onMount(() => {
		// Reduced motion: show the final value immediately.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			display = value;
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const p = Math.min(1, (now - start) / duration);
					// Cubic ease-out.
					const eased = 1 - Math.pow(1 - p, 3);
					display = value * eased;
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		if (el) io.observe(el);
		return () => io.disconnect();
	});
</script>

<span bind:this={el}>{prefix}{display.toFixed(decimals)}{suffix}</span>
