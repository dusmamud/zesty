<script lang="ts">
	import { Check, Clock, Package, RotateCcw } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { onMount } from 'svelte';
	import { orderEtaMinutes, orderStatus, reorder, store, TRACK_STEPS } from '#lib/store.svelte.ts';
	import { DISHES, formatPrice } from '#lib/data.ts';
	import { reveal } from '#lib/actions/reveal.ts';

	let now = $state(Date.now());

	onMount(() => {
		const id = setInterval(() => (now = Date.now()), 30000);
		return () => clearInterval(id);
	});

	function dishName(id: string): string {
		return DISHES.find((d) => d.id === id)?.name ?? 'Dish';
	}

	function dishImage(id: string): string {
		return DISHES.find((d) => d.id === id)?.image ?? '/images/salad-bowl.webp';
	}

	function dishDims(id: string): { width: number; height: number } {
		const d = DISHES.find((x) => x.id === id);
		return d ? { width: d.width, height: d.height } : { width: 800, height: 533 };
	}
</script>

<svelte:head>
	<title>My Orders — Zesty</title>
	<meta
		name="description"
		content="Track your Zesty orders live and view your order history. Reorder your favourites in one tap."
	/>
	<Seo
		title="My Orders — Zesty"
		description="Track your Zesty orders live and view your order history. Reorder your favourites in one tap."
		path="/orders"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">My Orders</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Order History &amp; Tracking</h1>
	</div>

	{#if store.orders.length === 0}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
			<Package class="mx-auto h-14 w-14 text-stone-300" />
			<p class="mt-3 font-display text-xl font-bold">No orders yet</p>
			<p class="mt-1 text-sm text-muted">Your orders will show up here with live tracking.</p>
			<a
				href="/menu"
				class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Browse the Menu →
			</a>
		</div>
	{:else}
		<div class="mt-8 space-y-6">
			{#each store.orders as order (order.id)}
				{@const status = orderStatus(order.placedAt, now)}
				{@const eta = orderEtaMinutes(order.placedAt, now)}
				<article class="rounded-3xl bg-white p-6 shadow-sm sm:p-7">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<div>
							<p class="font-display text-xl font-extrabold">{order.id}</p>
							<p class="text-sm text-muted">
								Placed {new Date(order.placedAt).toLocaleString()} • {order.name}
							</p>
							<p class="text-sm text-muted">{order.address}</p>
						</div>
						<div class="text-right">
							<p class="font-display text-xl font-extrabold">{formatPrice(order.total)}</p>
							<p class="text-sm text-muted">Paid via {order.payment}</p>
						</div>
					</div>

					<ul class="mt-4 space-y-2">
						{#each order.items as item (item.dishId)}
							<li class="flex items-center gap-3 text-sm">
								<img
								src={dishImage(item.dishId)}
								alt=""
								width={dishDims(item.dishId).width}
								height={dishDims(item.dishId).height}
								class="h-10 w-10 rounded-lg object-cover"
							/>
								<span class="font-semibold">{dishName(item.dishId)}</span>
								<span class="text-muted">× {item.qty}</span>
								<span class="ml-auto font-bold">{formatPrice(item.price * item.qty)}</span>
							</li>
						{/each}
					</ul>

					<!-- Tracking timeline -->
					<div class="mt-6">
						{#if status === 3}
							<p class="flex items-center gap-2 text-sm font-bold text-green-700">
								<Check class="h-4 w-4" /> Delivered — enjoy your meal!
							</p>
						{:else}
							<p class="flex items-center gap-2 text-sm font-bold text-orange-700">
								<Clock class="h-4 w-4" /> Arriving in about {eta} min
							</p>
						{/if}
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

					<div class="mt-5 flex flex-wrap gap-3">
						<button
							type="button"
							onclick={() => reorder(order)}
							class="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
						>
							<RotateCcw class="h-4 w-4" /> Reorder
						</button>
						<a href="/faq" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">
							Need help with this order?
						</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
