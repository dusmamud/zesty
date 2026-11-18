<script lang="ts">
	import { Gift } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { formatPrice, GIFT_CARD_AMOUNTS } from '#lib/data.ts';

	let amount = $state(25);
	let recipient = $state('');
	let sent = $state(false);

	function sendGift(e: SubmitEvent) {
		e.preventDefault();
		if (recipient.trim().length < 2) return;
		sent = true;
	}
</script>

<svelte:head>
	<title>Gift Cards — Zesty</title>
	<meta
		name="description"
		content="Give the gift of great food: Zesty gift cards from $10 to $100, redeemable on any order. Demo page — no real payment is taken."
	/>
	<Seo
		title="Gift Cards — Zesty"
		description="Give the gift of great food: Zesty gift cards from $10 to $100, redeemable on any order. Demo page — no real payment is taken."
		path="/gift-cards"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Gift Cards</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Give Great Food</h1>
		<p class="mt-2 max-w-xl text-muted">
			A Zesty gift card works on any dish, any day. Pick an amount — this is a demo, so no
			payment is taken and no real card is sent.
		</p>
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2">
		<div class="rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:motionReveal>
			<p class="text-sm font-bold">Choose an amount</p>
			<div class="mt-3 grid grid-cols-2 gap-3">
				{#each GIFT_CARD_AMOUNTS as a (a)}
					<button
						type="button"
						onclick={() => (amount = a)}
						aria-pressed={amount === a}
						class="rounded-2xl px-4 py-4 font-display text-xl font-extrabold transition-transform duration-150 active:scale-95 {amount === a
							? 'bg-brand text-white'
							: 'bg-orange-100 text-orange-700 hover:bg-orange-200'}"
					>
						{formatPrice(a)}
					</button>
				{/each}
			</div>
			<div class="mt-6 flex items-center gap-3 rounded-2xl bg-cream-dark p-4">
				<Gift class="h-8 w-8 shrink-0 text-brand" />
				<div>
					<p class="font-bold">Zesty Gift Card — {formatPrice(amount)}</p>
					<p class="text-sm text-muted">Valid on any order • Never expires in this demo</p>
				</div>
			</div>
		</div>

		{#if sent}
			<div class="rounded-3xl bg-white p-6 text-center shadow-sm sm:p-8" use:motionReveal>
				<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Gift class="h-7 w-7" />
				</span>
				<h2 class="mt-3 font-display text-2xl font-extrabold">Gift ready (demo)!</h2>
				<p class="mt-2 text-muted">
					A {formatPrice(amount)} gift card for <span class="font-bold text-ink">{recipient}</span> is
					ready in this demo. No email was sent and no payment was taken.
				</p>
				<button
					type="button"
					onclick={() => ((sent = false), (recipient = ''))}
					class="mt-5 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
				>
					Send Another
				</button>
			</div>
		{:else}
			<form
				class="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
				onsubmit={sendGift}
				use:motionReveal={{ delay: 100 }}
			>
				<label class="block text-sm font-bold" for="gift-name">Recipient's name</label>
				<input
					id="gift-name"
					bind:value={recipient}
					required
					minlength="2"
					placeholder="e.g. Priya"
					class="mt-2 w-full rounded-full border border-orange-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
				/>
				<p class="mt-4 text-sm text-muted">
					The card code is generated at checkout in the real flow. Here it is just a preview.
				</p>
				<button
					type="submit"
					class="mt-5 w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Preview {formatPrice(amount)} Gift Card
				</button>
			</form>
		{/if}
	</div>
</div>
