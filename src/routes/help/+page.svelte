<script lang="ts">
	import { CreditCard, Package, RotateCcw, Truck, User } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';

	const TOPICS = [
		{ icon: Truck, title: 'Delivery', text: 'Orders arrive in 20–30 minutes in our delivery areas. Delivery is $1.99, free over $20. Track any order live on the Orders page.' },
		{ icon: CreditCard, title: 'Payment', text: 'Pay by UPI, card or cash on delivery in the demo checkout. Promo codes FIRST50, ZESTY20 and FREEDEL work in the cart.' },
		{ icon: RotateCcw, title: 'Refunds & returns', text: 'Wrong or missing item? Tell us from the Orders page within 7 days and we will make it right — refund or replacement on the next order.' },
		{ icon: Package, title: 'My order', text: 'Order status, ETAs and reorder live on the Orders page. If an order is late, the tracking timeline shows why.' },
		{ icon: User, title: 'Account', text: 'Sign in from the header to see your profile, orders and favourites. Your details stay in your browser — this is a demo site.' }
	];
</script>

<svelte:head>
	<title>Help Centre — Zesty</title>
	<meta
		name="description"
		content="Zesty Help Centre: delivery, payment, refunds, orders and account help. Answers in one place."
	/>
	<Seo
		title="Help Centre — Zesty"
		description="Zesty Help Centre: delivery, payment, refunds, orders and account help. Answers in one place."
		path="/help"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Help Centre</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">How Can We Help?</h1>
		<p class="mt-2 max-w-xl text-muted">
			Quick answers on delivery, payment, refunds and your account. Still stuck? The contact
			page is one tap away.
		</p>
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2">
		{#each TOPICS as topic, i (topic.title)}
			{@const Icon = topic.icon}
			<article class="rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:motionReveal={{ delay: (i % 2) * 100 }}>
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-6 w-6" />
				</span>
				<h2 class="mt-4 font-display text-xl font-extrabold">{topic.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{topic.text}</p>
			</article>
		{/each}
	</div>

	<div class="mt-8 flex flex-wrap gap-3" use:motionReveal>
		<a
			href="/faq"
			class="rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
		>
			Read the FAQ
		</a>
		<a
			href="/contact"
			class="rounded-full bg-white px-6 py-3 text-sm font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
		>
			Contact Us
		</a>
		<a
			href="/orders"
			class="rounded-full bg-white px-6 py-3 text-sm font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
		>
			Track My Order
		</a>
	</div>
</div>
