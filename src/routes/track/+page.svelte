<script lang="ts">
	import { onMount } from 'svelte';
	import { Bike, Check, Clock, MapPin, Phone, ShieldCheck } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { orderEtaMinutes, orderStatus, showToast, store, TRACK_STEPS } from '#lib/store.svelte.ts';
	import { DEMO_RIDER, DISHES, formatPrice } from '#lib/data.ts';

	// Demo order shown when there is no real order yet, so the client can see
	// the live view. Clearly labelled as a demo on the page.
	const DEMO_ORDER = {
		id: 'ZST-DEMO42',
		items: [
			{ dishId: 'zesty-chicken-burger', qty: 1, price: 5.49 },
			{ dishId: 'cold-coffee', qty: 1, price: 3.99 }
		],
		total: 11.47,
		payment: 'UPI',
		name: 'Demo Customer',
		address: '42 Palm Street, Downtown',
		placedAt: Date.now() - 12 * 60000,
		tip: 0,
		slot: 'ASAP — 20–30 min'
	};

	let now = $state(Date.now());
	// Query params are unavailable during prerendering — read the requested
	// order id on the client only; the page first renders the latest order.
	let requestedId = $state<string | null>(null);

	onMount(() => {
		requestedId = new URLSearchParams(window.location.search).get('order');
		const id = setInterval(() => (now = Date.now()), 30000);
		return () => clearInterval(id);
	});

	let order = $derived(
		(requestedId ? store.orders.find((o) => o.id === requestedId) : store.orders[0]) ?? null
	);
	let isDemo = $derived(order === null);
	let shown = $derived(order ?? DEMO_ORDER);
	let status = $derived(orderStatus(shown.placedAt, now));
	let eta = $derived(orderEtaMinutes(shown.placedAt, now));
	// Rider position along the route, from the order status.
	let progress = $derived([8, 38, 72, 100][status]);

	function dishName(id: string) {
		return DISHES.find((d) => d.id === id)?.name ?? 'Dish';
	}
</script>

<svelte:head>
	<title>Track Order — Zesty</title>
	<meta
		name="description"
		content="Track your Zesty order live: placed, preparing, out for delivery and delivered, with live ETA and your rider's details."
	/>
	<Seo
		title="Track Order — Zesty"
		description="Track your Zesty order live: placed, preparing, out for delivery and delivered, with live ETA and your rider's details."
		path="/track"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Live Tracking</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Track Your Order</h1>
		<p class="mt-2 max-w-xl text-muted">
			Order <span class="font-bold text-ink">{shown.id}</span> • {shown.slot ?? 'ASAP — 20–30 min'}
		</p>
	</div>

	{#if isDemo}
		<p class="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200" use:reveal>
			Demo tracking — this is a sample order so you can see the live view. Place a real order and it will show up here instead.
			<a href="/menu" class="ml-1 font-bold underline">Order now →</a>
		</p>
	{/if}

	{#if store.orders.length > 1}
		<div class="mt-6 flex flex-wrap gap-2" use:reveal>
			<span class="py-2 text-sm font-bold">Your orders:</span>
			{#each store.orders as o (o.id)}
				<a
					href="/track?order={o.id}"
					class="rounded-full px-4 py-2 text-sm font-bold {o.id === shown.id
						? 'bg-brand text-white shadow'
						: 'bg-white shadow-sm hover:text-brand'}"
				>
					{o.id}
				</a>
			{/each}
		</div>
	{/if}

	<!-- ETA + route map -->
	<div class="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:reveal>
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				{#if status === 3}
					<p class="flex items-center gap-2 font-display text-2xl font-extrabold text-green-700">
						<Check class="h-6 w-6" /> Delivered — enjoy!
					</p>
					<p class="mt-1 text-sm text-muted">Your food arrived hot and fresh.</p>
				{:else}
					<p class="flex items-center gap-2 font-display text-2xl font-extrabold">
						<Clock class="h-6 w-6 text-brand" /> Arriving in about {eta} min
					</p>
					<p class="mt-1 text-sm text-muted">Step {status + 1} of 4: {TRACK_STEPS[status]}</p>
				{/if}
			</div>
			<span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
				{shown.slot ?? 'ASAP — 20–30 min'}
			</span>
		</div>

		<!-- Stylised route: restaurant → your door, rider dot moves with status -->
		<div class="relative mt-8 px-1 pb-6" aria-hidden="true">
			<div class="h-1.5 rounded-full bg-stone-200"></div>
			<div
				class="absolute top-0 left-1 h-1.5 rounded-full bg-brand transition-all duration-700"
				style="width: {progress}%"
			></div>
			<div
				class="absolute top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 ring-orange-100 transition-all duration-700"
				style="left: {progress}%"
			>
				<Bike class="h-5 w-5" />
			</div>
			<div class="mt-4 flex justify-between text-xs font-bold">
				<span class="flex items-center gap-1"><MapPin class="h-3.5 w-3.5 text-brand" /> Zesty Kitchen</span>
				<span class="text-muted">On the way</span>
				<span class="flex items-center gap-1"><MapPin class="h-3.5 w-3.5 text-brand" /> Your door</span>
			</div>
		</div>

		<!-- Timeline -->
		<ol class="mt-4 flex items-center">
			{#each TRACK_STEPS as step, i (step)}
				<li class="flex flex-1 items-center last:flex-none">
					<div class="flex flex-col items-center gap-1.5">
						<span
							class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold {i <= status
								? 'bg-brand text-white'
								: 'bg-stone-200 text-stone-500'}"
						>
							{#if i < status || status === 3}<Check class="h-4 w-4" />{:else}{i + 1}{/if}
						</span>
						<span class="w-20 text-center text-[11px] leading-tight font-semibold {i <= status ? 'text-ink' : 'text-muted'}">
							{step}
						</span>
					</div>
					{#if i < TRACK_STEPS.length - 1}
						<div class="mx-1 mb-5 h-1 flex-1 rounded-full {i < status ? 'bg-brand' : 'bg-stone-200'}"></div>
					{/if}
				</li>
			{/each}
		</ol>
	</div>

	<!-- Rider card -->
	<div class="mt-6 grid gap-6 sm:grid-cols-2">
		<div class="rounded-3xl bg-white p-6 shadow-sm" use:reveal>
			<h2 class="font-display text-lg font-bold">Your rider</h2>
			<div class="mt-3 flex items-center gap-3">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-lg font-extrabold text-white">
					{DEMO_RIDER.name.charAt(0)}
				</span>
				<div>
					<p class="font-bold">{DEMO_RIDER.name} • ★ {DEMO_RIDER.rating.toFixed(1)}</p>
					<p class="text-sm text-muted">{DEMO_RIDER.trips.toLocaleString()} trips • {DEMO_RIDER.vehicle}</p>
				</div>
			</div>
			<p class="mt-3 text-sm text-muted">{DEMO_RIDER.etaNote}. Your food is sealed in a tamper-proof bag.</p>
			<button
				type="button"
				onclick={() => showToast('Demo — rider calls are disabled in this demo.')}
				class="mt-4 flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-transform duration-150 hover:bg-stone-800 active:scale-95"
			>
				<Phone class="h-4 w-4" /> Call rider
			</button>
			<p class="mt-2 text-xs text-muted">Demo rider — a mock persona, not a real person.</p>
		</div>

		<div class="rounded-3xl bg-white p-6 shadow-sm" use:reveal={{ delay: 100 }}>
			<h2 class="font-display text-lg font-bold">Order summary</h2>
			<ul class="mt-3 space-y-2 text-sm">
				{#each shown.items as item (item.dishId)}
					<li class="flex justify-between gap-3">
						<span><span class="font-semibold">{item.qty} × {dishName(item.dishId)}</span></span>
						<span class="font-bold">{formatPrice(item.price * item.qty)}</span>
					</li>
				{/each}
			</ul>
			<dl class="mt-3 space-y-1 border-t border-orange-100 pt-3 text-sm">
				{#if shown.tip}
					<div class="flex justify-between"><dt class="text-muted">Rider tip</dt><dd class="font-semibold">{formatPrice(shown.tip)}</dd></div>
				{/if}
				<div class="flex justify-between text-base font-extrabold"><dt>Total</dt><dd>{formatPrice(shown.total)}</dd></div>
				<div class="flex justify-between"><dt class="text-muted">Paid via</dt><dd class="font-semibold">{shown.payment}</dd></div>
				<div class="flex justify-between"><dt class="text-muted">Deliver to</dt><dd class="max-w-45 text-right font-semibold">{shown.address}</dd></div>
			</dl>
			<p class="mt-3 flex items-start gap-2 text-xs text-muted">
				<ShieldCheck class="h-4 w-4 shrink-0 text-green-600" /> Contactless delivery available — the rider leaves the order at your door on request. Add a note at checkout.
			</p>
		</div>
	</div>

	<div class="mt-6 flex flex-wrap gap-3" use:reveal>
		<a href="/faq" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">Help with this order</a>
		<a href="/contact" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">Contact support</a>
		<a href="/orders" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">All my orders →</a>
	</div>
</div>
