<script lang="ts">
	import { Banknote, Bike, Clock, CreditCard, MapPin, ShoppingBag, Smartphone, Truck } from '@lucide/svelte';
	import { DELIVERY_AREAS, DELIVERY_FEE, FREE_DELIVERY_OVER, formatPrice } from '#lib/data.ts';
	import { reveal } from '#lib/actions/reveal.ts';
</script>

<svelte:head>
	<title>How It Works — Zesty</title>
	<meta
		name="description"
		content="Ordering on Zesty takes three steps: pick a dish, checkout as a guest, and get hot food at your door in 20–30 minutes."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">How It Works</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Dinner In Three Easy Steps</h1>
		<p class="mt-2 max-w-xl text-muted">No account, no fuss. From craving to doorstep in about half an hour.</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: ShoppingBag, step: 'Step 1', title: 'Pick a dish', text: 'Browse the menu, check ratings and add your favourites to the cart.' }, { icon: Smartphone, step: 'Step 2', title: 'Checkout as guest', text: 'Add your address and pay by UPI, card or cash on delivery. No sign-up needed.' }, { icon: Bike, step: 'Step 3', title: 'Hot at your door', text: 'Track your order live and get it hot in 20–30 minutes.' }] as s, i (s.title)}
			{@const Icon = s.icon}
			<div class="rounded-3xl bg-white p-7 text-center shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-8 w-8" />
				</span>
				<p class="mt-4 text-xs font-bold tracking-widest text-brand uppercase">{s.step}</p>
				<h2 class="mt-1 font-display text-xl font-bold">{s.title}</h2>
				<p class="mt-1 text-sm text-muted">{s.text}</p>
			</div>
		{/each}
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-2">
		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal>
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<MapPin class="h-5 w-5 text-brand" /> Areas we deliver to
			</h2>
			<ul class="mt-4 divide-y">
				{#each DELIVERY_AREAS as a (a.area)}
					<li class="flex items-center justify-between py-2.5 text-sm">
						<span class="font-semibold">{a.area}</span>
						<span class="flex items-center gap-1 text-muted"><Clock class="h-4 w-4" /> {a.eta}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-3 text-sm text-muted">
				Outside these areas? <a href="/contact" class="font-bold text-brand hover:underline">Contact us</a> — we're adding new neighbourhoods every month.
			</p>
		</div>

		<div class="space-y-6">
			<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: 100 }}>
				<h2 class="flex items-center gap-2 font-display text-xl font-bold">
					<Truck class="h-5 w-5 text-brand" /> Delivery &amp; fees
				</h2>
				<dl class="mt-4 space-y-2 text-sm">
					<div class="flex justify-between"><dt class="text-muted">Typical delivery time</dt><dd class="font-bold">20–30 minutes</dd></div>
					<div class="flex justify-between"><dt class="text-muted">Delivery fee</dt><dd class="font-bold">{formatPrice(DELIVERY_FEE)}</dd></div>
					<div class="flex justify-between"><dt class="text-muted">Free delivery over</dt><dd class="font-bold">{formatPrice(FREE_DELIVERY_OVER)}</dd></div>
					<div class="flex justify-between"><dt class="text-muted">Free delivery code</dt><dd class="font-bold">FREEDEL — any order</dd></div>
				</dl>
			</div>
			<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: 200 }}>
				<h2 class="flex items-center gap-2 font-display text-xl font-bold">
					<CreditCard class="h-5 w-5 text-brand" /> Payment methods
				</h2>
				<ul class="mt-4 space-y-2 text-sm">
					<li class="flex items-center gap-2"><Smartphone class="h-4 w-4 text-brand" /> UPI — pay instantly at checkout</li>
					<li class="flex items-center gap-2"><CreditCard class="h-4 w-4 text-brand" /> Card — debit and credit cards accepted</li>
					<li class="flex items-center gap-2"><Banknote class="h-4 w-4 text-brand" /> Cash on Delivery — pay the rider</li>
				</ul>
				<p class="mt-3 text-sm text-muted">Demo checkout — no real payment is taken.</p>
			</div>
		</div>
	</div>

	<p class="mt-10 text-center">
		<a href="/menu" class="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95">
			Start an Order →
		</a>
	</p>
</div>
