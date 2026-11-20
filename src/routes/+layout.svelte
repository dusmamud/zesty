<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { page } from '$app/state';
	import '../app.css';
	import { ArrowUp, CheckCircle2, Clock, Heart, Home, Package, ShoppingCart, User, UtensilsCrossed } from '@lucide/svelte';
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

	// Mobile bottom nav (thumb zone): the 5 places people actually go.
	// Desktop keeps the top nav; the bottom bar is mobile-only (lg:hidden).
	const NAV_TABS = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/menu', label: 'Menu', icon: UtensilsCrossed },
		{ href: '/orders', label: 'Orders', icon: Package },
		{ href: '/favourites', label: 'Saved', icon: Heart },
		{ href: '/account', label: 'Account', icon: User }
	];

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
		// Escape closes any open drawer / modal / confirmation (a11y baseline).
		function onKeydown(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			if (store.checkoutOpen) store.checkoutOpen = false;
			else if (store.cartOpen) store.cartOpen = false;
			else if (store.orderPlaced) store.orderPlaced = null;
		}
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('keydown', onKeydown);
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
			window.removeEventListener('keydown', onKeydown);
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

<div id="top" class="min-h-screen bg-cream pb-[76px] font-body text-ink lg:pb-0">
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

<!-- MOBILE BOTTOM NAV — thumb zone (mobile only; desktop keeps the top nav) -->
<nav
	aria-label="Primary"
	class="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 shadow-[0_-4px_16px_rgb(0_0_0/0.06)] backdrop-blur-md lg:hidden"
	style="padding-bottom: env(safe-area-inset-bottom)"
>
	<ul class="grid grid-cols-5">
		{#each NAV_TABS as tab (tab.href)}
			{@const Icon = tab.icon}
			{@const active = tab.href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(tab.href)}
			<li>
				<a
					href={tab.href}
					aria-current={active ? 'page' : undefined}
					class="relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold {active
						? 'text-brand'
						: 'text-stone-500 hover:text-ink'}"
				>
					<Icon class="h-5 w-5" />
					{tab.label}
					{#if tab.href === '/orders' && store.orders.length > 0}
						<span class="absolute top-1 right-[calc(50%-18px)] flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-white">
							{store.orders.length}
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<Toast />

<!-- BACK TO TOP — sits above the bottom nav (and above the cart bar when it shows) -->
{#if showTop && !footerVisible}
	<button
		type="button"
		aria-label="Back to top"
		onclick={backToTop}
		transition:fly={{ y: 12, duration: 200 }}
		class="fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-xl transition-transform duration-150 hover:bg-brand active:scale-95 {count > 0
			? 'bottom-40 lg:bottom-6'
			: 'bottom-20 lg:bottom-6'}"
	>
		<ArrowUp class="h-5 w-5" />
	</button>
{/if}

<!-- STICKY MOBILE CART BAR — above the bottom nav on mobile -->
{#if count > 0 && !store.cartOpen}
	<button
		type="button"
		onclick={() => (store.cartOpen = true)}
		transition:fly={{ y: 20, duration: 200 }}
		class="fixed inset-x-4 bottom-20 z-40 flex items-center justify-between rounded-full bg-brand px-5 py-3.5 font-bold text-white shadow-xl transition-transform duration-150 active:scale-95 lg:hidden"
		style="margin-bottom: env(safe-area-inset-bottom)"
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
				href="/track"
				onclick={() => (store.orderPlaced = null)}
				class="mt-6 block w-full rounded-full bg-brand py-3 text-center font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Track Order Live
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
