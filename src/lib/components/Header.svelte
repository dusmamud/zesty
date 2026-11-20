<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { Menu, Search, ShoppingCart, User, UtensilsCrossed, X } from '@lucide/svelte';
	import { page } from '$app/state';
	import { cartCount, store } from '#lib/store.svelte.ts';

	let count = $derived(cartCount());
	let mobileOpen = $state(false);
	let scrolled = $state(false);

	// Header gains a shadow once the page scrolls (rAF-throttled, passive).
	onMount(() => {
		let ticking = false;
		function update() {
			ticking = false;
			scrolled = window.scrollY > 8;
		}
		function onScroll() {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		}
		function onKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape' && mobileOpen) mobileOpen = false;
		}
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('keydown', onKeydown);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('keydown', onKeydown);
		};
	});

	const LINKS = [
		{ href: '/', label: 'Home' },
		{ href: '/menu', label: 'Menu' },
		{ href: '/how-it-works', label: 'How It Works' },
		{ href: '/offers', label: 'Offers' },
		{ href: '/about', label: 'About Us' }
	];

	let firstName = $derived(store.user ? store.user.name.split(' ')[0] : '');
</script>

<header
	class="sticky top-0 z-40 border-b border-orange-100 transition-shadow duration-200 {scrolled
		? 'bg-cream/95 shadow-md backdrop-blur-md'
		: 'bg-cream/90 backdrop-blur'}"
>
	<div class="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6">
		<a href="/" class="flex items-center gap-2">
			<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
				<UtensilsCrossed class="h-5 w-5" />
			</span>
			<span class="font-display text-2xl font-extrabold tracking-tight">Zesty</span>
		</a>

		<nav class="ml-6 hidden items-center gap-6 text-sm font-semibold text-stone-700 lg:flex">
			{#each LINKS as link (link.href)}
				<a
					href={link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
					class="py-1 {page.url.pathname === link.href ? 'text-orange-700' : 'hover:text-brand'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-2 sm:gap-3">
			<a
				href="/search"
				aria-label="Search dishes"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
			>
				<Search class="h-5 w-5" />
			</a>

			<button
				type="button"
				aria-label="Open cart"
				onclick={() => (store.cartOpen = true)}
				class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
			>
				<ShoppingCart class="h-5 w-5" />
				{#if count > 0}
					{#key count}
						<span
							class="animate-pop absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white"
						>
							{count}
						</span>
					{/key}
				{/if}
			</button>

			{#if store.user}
				<a
					href="/orders"
					class="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform duration-150 hover:bg-brand-dark active:scale-95 sm:flex"
				>
					<User class="h-4 w-4" /> Hi, {firstName}
				</a>
			{:else}
				<a
					href="/signin"
					class="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform duration-150 hover:bg-brand-dark active:scale-95 sm:block"
				>
					Sign In
				</a>
			{/if}

			<button
				type="button"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				onclick={() => (mobileOpen = !mobileOpen)}
				class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition-transform duration-150 active:scale-95 lg:hidden"
			>
				{#if mobileOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<nav transition:slide={{ duration: 200 }} class="border-t border-orange-100 bg-cream px-4 py-3 lg:hidden">
			<ul class="space-y-1 text-sm font-semibold">
				{#each LINKS as link (link.href)}
					<li>
						<a
							href={link.href}
							onclick={() => (mobileOpen = false)}
							class="block rounded-xl px-3 py-2.5 hover:bg-white {page.url.pathname === link.href
								? 'text-orange-700'
								: 'text-stone-700'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
				<li>
					<a
						href={store.user ? '/orders' : '/signin'}
						onclick={() => (mobileOpen = false)}
						class="block rounded-xl bg-brand px-3 py-2.5 text-center font-bold text-white"
					>
						{store.user ? `Hi, ${firstName} — My Orders` : 'Sign In'}
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>
