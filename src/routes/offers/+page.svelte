<script lang="ts">
	import { CheckCircle2, Copy, Tag } from '@lucide/svelte';

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

	const OFFERS = [
		{
			code: 'FIRST50',
			title: '50% off your first order',
			text: 'Half price on your very first Zesty order. No minimum spend.',
			terms: 'First order only • One use per customer • Valid till 31 Dec 2026'
		},
		{
			code: 'ZESTY20',
			title: '20% off orders over $15',
			text: 'A flat 20% off whenever your order crosses $15.',
			terms: 'Minimum order $15 • Can be used on every order • Valid till 31 Dec 2026'
		},
		{
			code: 'FREEDEL',
			title: 'Free delivery on any order',
			text: 'Delivery fee waived completely — even on a single coffee.',
			terms: 'No minimum spend • One use per order • Valid till 31 Dec 2026'
		}
	];
</script>

<svelte:head>
	<title>Offers — Zesty</title>
	<meta
		name="description"
		content="Zesty offers: FIRST50 for 50% off your first order, ZESTY20 for 20% off over $15, and FREEDEL for free delivery on any order."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<p class="text-xs font-bold tracking-widest text-brand uppercase">Offers</p>
	<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Deals Worth Ordering For</h1>
	<p class="mt-2 max-w-xl text-muted">
		Copy a code and paste it in the cart at checkout. One code per order.
	</p>

	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each OFFERS as offer (offer.code)}
			<article class="flex flex-col rounded-3xl bg-ink p-7 text-white shadow-sm">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
					<Tag class="h-6 w-6 text-brand-light" />
				</span>
				<p class="mt-4 font-display text-3xl font-extrabold">{offer.code}</p>
				<p class="mt-1 font-display text-lg font-bold">{offer.title}</p>
				<p class="mt-1 flex-1 text-sm text-stone-300">{offer.text}</p>
				<p class="mt-3 border-t border-white/15 pt-3 text-xs text-stone-400">{offer.terms}</p>
				<button
					type="button"
					onclick={() => copyCode(offer.code)}
					class="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-orange-100"
				>
					{#if copiedCode === offer.code}
						<CheckCircle2 class="h-4 w-4 text-green-600" /> Copied!
					{:else}
						<Copy class="h-4 w-4" /> Copy Code
					{/if}
				</button>
			</article>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-white p-7 shadow-sm">
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
