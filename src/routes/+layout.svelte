<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { CheckCircle2, Clock, ShoppingCart } from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import CheckoutModal from '#lib/components/CheckoutModal.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import { cartCount, store, totals } from '#lib/store.svelte.ts';
	import { formatPrice } from '#lib/data.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let count = $derived(cartCount());
	let t = $derived(totals());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="top" class="min-h-screen bg-cream font-body text-ink">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<!-- STICKY MOBILE CART BAR -->
{#if count > 0 && !store.cartOpen}
	<button
		type="button"
		onclick={() => (store.cartOpen = true)}
		class="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-brand px-5 py-3.5 font-bold text-white shadow-xl lg:hidden"
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
		<div class="relative w-full max-w-md rounded-t-3xl bg-white p-6 text-center shadow-2xl sm:rounded-3xl">
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
				class="mt-6 block w-full rounded-full bg-brand py-3 text-center font-bold text-white hover:bg-brand-dark"
			>
				Track Order
			</a>
			<button
				type="button"
				onclick={() => (store.orderPlaced = null)}
				class="mt-2 w-full rounded-full py-3 font-bold text-stone-600 hover:bg-stone-100"
			>
				Back to Menu
			</button>
		</div>
	</div>
{/if}
