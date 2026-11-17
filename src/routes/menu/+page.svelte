<script lang="ts">
	import { Search } from '@lucide/svelte';
	import CategoryRail from '#lib/components/CategoryRail.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import { CATEGORIES, DISHES } from '#lib/data.ts';

	let activeCategory = $state<(typeof CATEGORIES)[number]>('All');
	let searchQuery = $state('');
	let sort = $state<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
	let vegOnly = $state(false);

	let visibleDishes = $derived(
		DISHES.filter(
			(d) =>
				(activeCategory === 'All' || d.category === activeCategory) &&
				(!vegOnly || d.veg) &&
				(searchQuery.trim() === '' ||
					`${d.name} ${d.desc} ${d.category}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
		).toSorted((a, b) => {
			if (sort === 'price-asc') return a.price - b.price;
			if (sort === 'price-desc') return b.price - a.price;
			if (sort === 'rating') return b.rating - a.rating;
			return b.reviews - a.reviews;
		})
	);
</script>

<svelte:head>
	<title>Menu — Zesty</title>
	<meta
		name="description"
		content="Browse the full Zesty menu: burgers, pizza, Asian, desserts and drinks. Filter by category, search, sort by price or rating."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<p class="text-xs font-bold tracking-widest text-brand uppercase">Explore Our Menu</p>
	<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Tasty Food You'll Love</h1>
	<p class="mt-2 max-w-xl text-muted">
		All {DISHES.length} dishes, hot and fresh in 20–30 minutes. Tap a dish to see ingredients, add-ons and reviews.
	</p>

	<div class="mt-6 flex flex-wrap items-center gap-3">
		<div class="relative grow sm:max-w-sm">
			<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
			<input
				type="search"
				value={searchQuery}
				placeholder="Search dishes…"
				aria-label="Search dishes"
				oninput={(e) => (searchQuery = e.currentTarget.value)}
				class="w-full rounded-full border border-orange-200 bg-white py-2.5 pr-4 pl-9 text-sm outline-none focus:border-brand"
			/>
		</div>
		<label class="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-sm">
			<input type="checkbox" bind:checked={vegOnly} class="h-4 w-4 accent-green-600" />
			Veg only
		</label>
		<label class="flex items-center gap-2 text-sm font-semibold">
			Sort
			<select
				bind:value={sort}
				aria-label="Sort dishes"
				class="rounded-full border border-orange-200 bg-white px-3 py-2.5 text-sm font-bold outline-none focus:border-brand"
			>
				<option value="popular">Most popular</option>
				<option value="rating">Highest rated</option>
				<option value="price-asc">Price: low to high</option>
				<option value="price-desc">Price: high to low</option>
			</select>
		</label>
	</div>

	<div class="mt-6 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
		<CategoryRail active={activeCategory} onSelect={(c) => (activeCategory = c)} />

		<div>
			{#if visibleDishes.length === 0}
				<p class="rounded-2xl bg-white p-8 text-center text-muted">
					No dishes match your filters. Try another search or category.
				</p>
			{:else}
				<p class="mb-4 text-sm text-muted">
					{visibleDishes.length} dish{visibleDishes.length === 1 ? '' : 'es'}
				</p>
				<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each visibleDishes as dish (dish.id)}
						<DishCard {dish} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
