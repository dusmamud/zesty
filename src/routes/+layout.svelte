<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { page } from '$app/state';
	import '../app.css';
	import { ArrowUp, CheckCircle2, Clock, ShoppingCart } from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import CheckoutModal from '#lib/components/CheckoutModal.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Toast from '#lib/components/Toast.svelte';
	import { cartCount, store, totals } from '#lib/store.svelte.ts';
	import { formatPrice } from '#lib/data.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let count = $derived(cartCount());
	let t = $derived(totals());

	// Scroll progress (0..1) + back-to-top visibility, one rAF-throttled listener.
	let progress = $state(0);
	let showTop = $state(false);
	let reducedMotion = $state(false);
	// Hide the back-to-top button while the footer is on screen: it used to sit
	// exactly on top of the newsletter submit arrow (mobile footer).
	let footerVisible = $state(false);

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let ticking = false;
		function update() {
			ticking = false;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
			showTop = window.scrollY > 600;
		}
		function onScroll() {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		}
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		const footer = document.querySelector('footer');
		let obs: IntersectionObserver | undefined;
		if (footer) {
			obs = new IntersectionObserver(([entry]) => (footerVisible = entry.isIntersecting), {
				threshold: 0
			});
			obs.observe(footer);
		}
		return () => {
			window.removeEventListener('scroll', onScroll);
			obs?.disconnect();
		};
	});

	function backToTop() {
		window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
	}

	// Page transitions stay subtle and fast; zero-duration when reduced motion.
	let flyIn = $derived(reducedMotion ? { y: 0, duration: 0 } : { y: 8, duration: 200 });
	let fadeOut = $derived(reducedMotion ? { duration: 0 } : { duration: 120 });
</script>

<div id="top" class="min-h-screen bg-cream font-body text-ink">
	{#if !reducedMotion}
		<div
			class="scroll-progress fixed top-0 left-0 z-[70] h-[3px] w-full origin-left bg-brand"
			style="transform: scaleX({progress})"
			aria-hidden="true"
		></div>
	{/if}

	<Header />

	<main>
		{#key page.url.pathname}
			<div in:fly={flyIn} out:fade={fadeOut}>
				{@render children()}
			</div>
		{/key}
	</main>

	<Footer />
</div>

<Toast />

<!-- BACK TO TOP -->
{#if showTop && !footerVisible}
	<button
		type="button"
		aria-label="Back to top"
		onclick={backToTop}
		transition:fly={{ y: 12, duration: 200 }}
		class="fixed right-4 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-xl transition-transform duration-150 hover:bg-brand active:scale-95 lg:right-6 lg:bottom-6"
	>
		<ArrowUp class="h-5 w-5" />
	</button>
{/if}

<!-- STICKY MOBILE CART BAR -->
{#if count > 0 && !store.cartOpen}
	<button
		type="button"
		onclick={() => (store.cartOpen = true)}
		transition:fly={{ y: 20, duration: 200 }}
		class="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-brand px-5 py-3.5 font-bold text-white shadow-xl transition-transform duration-150 active:scale-95 lg:hidden"
	>
		<span class="flex items-center gap-2"><ShoppingCart class="h-5 w-5" /> {count} item{count === 1 ? '' : 's'} in cart</span>
		<span>{formatPrice(t.total)} • View Cart</span>
	</button>
{/if}

{#if store.cartOpen}
	<CartDrawer />
{/if}

{#if store.checkoutOpen}
	<CheckoutModal />
{/if}

{#if store.orderPlaced}
	<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-label="Order confirmed">
		<button
			type="button"
			aria-label="Close"
			onclick={() => (store.orderPlaced = null)}
			transition:fade={{ duration: 200 }}
			class="absolute inset-0 bg-black/40"
		></button>
		<div
			transition:scale={{ start: 0.96, duration: 200 }}
			class="relative w-full max-w-md rounded-t-3xl bg-white p-6 text-center shadow-2xl sm:rounded-3xl"
		>
			<CheckCircle2 class="mx-auto h-14 w-14 text-green-600" />
			<h2 class="mt-3 font-display text-2xl font-extrabold">Order confirmed!</h2>
			<p class="mt-1 text-muted">
				Order <span class="font-bold text-ink">{store.orderPlaced.id}</span> • Paid via {store.orderPlaced.payment}
			</p>
			<div class="mt-5 space-y-2 text-left text-sm">
				<p class="flex items-center gap-2"><CheckCircle2 class="h-4 w-4 text-green-600" /> Order received</p>
				<p class="flex items-center gap-2"><CheckCircle2 class="h-4 w-4 text-green-600" /> Restaurant is preparing your food</p>
				<p class="flex items-center gap-2 text-muted"><Clock class="h-4 w-4" /> Rider on the way — arriving in 20–30 mins</p>
			</div>
			<a
				href="/orders"
				onclick={() => (store.orderPlaced = null)}
				class="mt-6 block w-full rounded-full bg-brand py-3 text-center font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Track Order
			</a>
			<button
				type="button"
				onclick={() => (store.orderPlaced = null)}
				class="mt-2 w-full rounded-full py-3 font-bold text-stone-600 transition-transform duration-150 hover:bg-stone-100 active:scale-95"
			>
				Back to Menu
			</button>
		</div>
	</div>
{/if}
