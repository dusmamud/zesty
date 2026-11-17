<script lang="ts">
	import OfferCard from '#lib/components/OfferCard.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { OFFERS } from '#lib/data.ts';

	let copiedCode = $state<string | null>(null);
	async function copyCode(code: string) {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			// Clipboard unavailable — code is still visible on screen.
		}
		copiedCode = code;
		setTimeout(() => (copiedCode = null), 2000);
	}
</script>

<svelte:head>
	<title>Offers — Zesty</title>
	<meta
		name="description"
		content="Zesty offers: FIRST50 for 50% off your first order, ZESTY20 for 20% off over $15, and FREEDEL for free delivery on any order."
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">Offers</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Deals Worth Ordering For</h1>
		<p class="mt-2 max-w-xl text-muted">
			Copy a code and paste it in the cart at checkout. One code per order.
		</p>
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each OFFERS as offer, i (offer.code)}
			<div use:reveal={{ delay: i * 100 }}>
				<OfferCard {offer} copied={copiedCode === offer.code} onCopy={() => copyCode(offer.code)} />
			</div>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-white p-7 shadow-sm" use:reveal>
		<h2 class="font-display text-xl font-bold">How promo codes work</h2>
		<ol class="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
			<li>Add dishes to your cart from the menu.</li>
			<li>Open the cart and enter the code in the promo box.</li>
			<li>The discount (or free delivery) applies instantly to your total.</li>
		</ol>
		<p class="mt-3 text-sm text-muted">
			Only one code can be used per order. Codes cannot be combined with each other.
		</p>
	</div>
</div>
