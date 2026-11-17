<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown, Headphones, Mail, Phone } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	let openIndex = $state(0);

	const FAQS = [
		{
			q: 'How long does delivery take?',
			a: 'Most orders arrive in 20–30 minutes. You can track your order live on the Orders page — it moves from Placed to Preparing to Out for delivery to Delivered.'
		},
		{
			q: 'Which areas do you deliver to?',
			a: 'We deliver to Downtown, Riverside, Old Town, University District, Green Park and Harbour View. See the full list with ETAs on the How It Works page.'
		},
		{
			q: 'What payment methods do you accept?',
			a: 'UPI, debit/credit card, and cash on delivery. You can pay as a guest — no account is needed. (This is a demo, so no real payment is taken.)'
		},
		{
			q: 'How do promo codes work?',
			a: 'Add dishes to your cart, open the cart and enter the code: FIRST50 gives 50% off your first order, ZESTY20 gives 20% off orders over $15, and FREEDEL gives free delivery on any order. One code per order.'
		},
		{
			q: 'What if my order is wrong or late?',
			a: 'Tell us within 7 days and we will make it right — a replacement, a refund, or credit on your next order. Start from the Contact page or call +1-555-0199.'
		},
		{
			q: 'Can I order without creating an account?',
			a: 'Yes. Guest checkout is the default on Zesty. Signing in is optional — it just saves your address and keeps your order history.'
		},
		{
			q: 'Do you have vegetarian options?',
			a: 'Yes — every dish is marked Veg or Non-veg, and the menu page has a Veg-only filter. Veg Biryani, Margherita Pizza, Thai Basil Noodles and more are all vegetarian.'
		}
	];
</script>

<svelte:head>
	<title>FAQ — Zesty</title>
	<meta
		name="description"
		content="Zesty FAQ: delivery time and areas, payment methods, promo codes, refunds and returns, guest checkout and vegetarian options."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">Support</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Frequently Asked Questions</h1>
		<p class="mt-2 text-muted">Can't find your answer? Our support team is here 24/7.</p>
	</div>

	<div class="mt-8 space-y-3">
		{#each FAQS as faq, i (faq.q)}
			<div class="overflow-hidden rounded-2xl bg-white shadow-sm" use:reveal={{ delay: Math.min(i, 3) * 60 }}>
				<button
					type="button"
					aria-expanded={openIndex === i}
					onclick={() => (openIndex = openIndex === i ? -1 : i)}
					class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold hover:text-brand"
				>
					{faq.q}
					<ChevronDown class="h-5 w-5 shrink-0 transition {openIndex === i ? 'rotate-180' : ''}" />
				</button>
				{#if openIndex === i}
					<p transition:slide={{ duration: 200 }} class="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.a}</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-ink p-7 text-white shadow-sm" use:reveal>
		<h2 class="flex items-center gap-2 font-display text-xl font-bold">
			<Headphones class="h-5 w-5 text-brand-light" /> Still need help?
		</h2>
		<p class="mt-2 text-sm text-stone-300">Reach us any time — we answer fast, day or night.</p>
		<div class="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
			<a href="tel:+15550199" class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 hover:bg-white/20">
				<Phone class="h-4 w-4" /> +1-555-0199
			</a>
			<a href="mailto:hello@zesty.example" class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 hover:bg-white/20">
				<Mail class="h-4 w-4" /> hello@zesty.example
			</a>
			<a href="/contact" class="flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 hover:bg-brand-dark">
				Contact Us →
			</a>
		</div>
	</div>
</div>
