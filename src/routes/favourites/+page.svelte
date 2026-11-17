<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { store } from '#lib/store.svelte.ts';
	import { DISHES } from '#lib/data.ts';
	import { reveal } from '#lib/actions/reveal.ts';

	let favDishes = $derived(DISHES.filter((d) => store.favourites.has(d.id)));
</script>

<svelte:head>
	<title>My Favourites — Zesty</title>
	<meta
		name="description"
		content="Your saved favourite dishes on Zesty. Tap the heart on any dish to save it here."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">Saved For Later</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">My Favourites</h1>
	</div>

	{#if favDishes.length === 0}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
			<Heart class="mx-auto h-14 w-14 text-stone-300" />
			<p class="mt-3 font-display text-xl font-bold">No favourites yet</p>
			<p class="mt-1 text-sm text-muted">Tap the heart on any dish to save it here for next time.</p>
			<a
				href="/menu"
				class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Browse the Menu →
			</a>
		</div>
	{:else}
		<p class="mt-4 text-sm text-muted">
			{favDishes.length} saved dish{favDishes.length === 1 ? '' : 'es'}
		</p>
		<div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each favDishes as dish (dish.id)}
				<DishCard {dish} />
			{/each}
		</div>
	{/if}
</div>
