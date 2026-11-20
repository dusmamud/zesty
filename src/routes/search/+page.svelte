<script lang="ts">
	import { Search, TrendingUp, X } from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { DISHES, formatPrice } from '#lib/data.ts';

	let query = $state('');
	let focused = $state(false);

	const LS_KEY = 'zesty-recent-searches';

	function loadRecent(): string[] {
		try {
			return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
		} catch {
			return [];
		}
	}

	let recent = $state<string[]>([]);
	if (typeof window !== 'undefined') recent = loadRecent();

	function saveRecent(q: string) {
		const clean = q.trim();
		if (clean.length < 2) return;
		const next = [clean, ...recent.filter((r) => r.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
		recent = next;
		try {
			localStorage.setItem(LS_KEY, JSON.stringify(next));
		} catch {
			// Storage unavailable — recent searches just won't persist.
		}
	}

	function clearRecent() {
		recent = [];
		try {
			localStorage.removeItem(LS_KEY);
		} catch {
			// Ignore.
		}
	}

	let suggestions = $derived(
		query.trim().length < 2
			? []
			: DISHES.filter((d) =>
					`${d.name} ${d.desc} ${d.category} ${d.ingredients.join(' ')}`
						.toLowerCase()
						.includes(query.trim().toLowerCase())
				).slice(0, 6)
	);

	let results = $derived(
		DISHES.filter((d) =>
			query.trim() === ''
				? false
				: `${d.name} ${d.desc} ${d.category} ${d.ingredients.join(' ')}`
						.toLowerCase()
						.includes(query.trim().toLowerCase())
		)
	);

	let trending = $derived([...DISHES].sort((a, b) => b.reviews - a.reviews).slice(0, 4));

	function runSearch(q: string) {
		query = q;
		saveRecent(q);
		focused = false;
		document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>Search — Zesty</title>
	<meta
		name="description"
		content="Search Zesty by dish, cuisine or ingredient — with live suggestions, trending dishes and your recent searches."
	/>
	<Seo
		title="Search — Zesty"
		description="Search Zesty by dish, cuisine or ingredient — with live suggestions, trending dishes and your recent searches."
		path="/search"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Find Your Craving</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Search Dishes</h1>
		<p class="mt-2 max-w-xl text-muted">Search by dish, cuisine or ingredient — try “pizza”, “spicy” or “mango”.</p>
	</div>

	<!-- Search box with live suggestions -->
	<div class="relative mt-6 max-w-2xl" use:reveal>
		<Search class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" />
		<input
			type="search"
			bind:value={query}
			placeholder="Search dishes, cuisines, ingredients…"
			aria-label="Search dishes"
			onfocus={() => (focused = true)}
			onblur={() => setTimeout(() => (focused = false), 150)}
			onkeydown={(e) => {
				if (e.key === 'Enter') runSearch(query);
				if (e.key === 'Escape') focused = false;
			}}
			class="w-full rounded-full border border-orange-200 bg-white py-3.5 pr-12 pl-12 text-base outline-none focus:border-brand"
		/>
		{#if query}
			<button
				type="button"
				aria-label="Clear search"
				onclick={() => (query = '')}
				class="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-stone-100"
			>
				<X class="h-4 w-4" />
			</button>
		{/if}

		{#if focused && suggestions.length > 0}
			<ul class="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100" role="listbox" aria-label="Suggestions">
				{#each suggestions as dish (dish.id)}
					<li>
						<a
							href="/dish/{dish.id}"
							onclick={() => saveRecent(query)}
							class="flex items-center gap-3 px-4 py-3 hover:bg-cream"
						>
							<img src={dish.image} alt="" width={dish.width} height={dish.height} loading="lazy" class="h-10 w-10 rounded-xl object-cover" />
							<span class="min-w-0 flex-1">
								<span class="block truncate font-bold">{dish.name}</span>
								<span class="block text-xs text-muted">{dish.category} • {formatPrice(dish.price)}</span>
							</span>
							<span class="text-sm font-bold text-orange-700">★ {dish.rating.toFixed(1)}</span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Trending + recent -->
	{#if query.trim() === ''}
		<div class="mt-8" use:reveal>
			<h2 class="flex items-center gap-2 font-display text-lg font-bold"><TrendingUp class="h-5 w-5 text-brand" /> Trending now</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each trending as dish (dish.id)}
					<button
						type="button"
						onclick={() => runSearch(dish.name)}
						class="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
					>
						{dish.name}
					</button>
				{/each}
				{#each ['Pizza', 'Spicy', 'Veg', 'Dessert', 'Cold coffee'] as term (term)}
					<button
						type="button"
						onclick={() => runSearch(term)}
						class="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 transition-transform duration-150 hover:bg-orange-200 active:scale-95"
					>
						{term}
					</button>
				{/each}
			</div>
		</div>

		{#if recent.length > 0}
			<div class="mt-8" use:reveal>
				<div class="flex items-center gap-3">
					<h2 class="font-display text-lg font-bold">Recent searches</h2>
					<button type="button" onclick={clearRecent} class="text-xs font-bold text-muted hover:text-brand">Clear</button>
				</div>
				<div class="mt-3 flex flex-wrap gap-2">
					{#each recent as term (term)}
						<button
							type="button"
							onclick={() => runSearch(term)}
							class="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:text-brand"
						>
							{term}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	{/if}

	<!-- Results -->
	<div id="search-results" class="mt-10 scroll-mt-24">
		{#if query.trim() !== ''}
			{#if results.length === 0}
				<div class="rounded-3xl bg-white p-10 text-center shadow-sm" use:reveal>
					<p class="font-display text-xl font-bold">No dishes match “{query.trim()}”</p>
					<p class="mt-1 text-sm text-muted">Try “pizza”, “burger” or “mango” — or browse the trending dishes below.</p>
					<div class="mt-6 grid gap-6 text-left sm:grid-cols-2 xl:grid-cols-4">
						{#each trending as dish (dish.id)}
							<DishCard {dish} />
						{/each}
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted" use:reveal>
					{results.length} result{results.length === 1 ? '' : 's'} for “{query.trim()}”
				</p>
				<div class="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each results as dish, i (dish.id)}
						<div use:reveal={{ delay: (i % 3) * 80 }}>
							<DishCard {dish} />
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
