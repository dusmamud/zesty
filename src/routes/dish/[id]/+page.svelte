<script lang="ts">
	import { ArrowLeft, Clock, Heart, Minus, Plus, ShoppingCart, Star } from '@lucide/svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import FadeImage from '#lib/components/FadeImage.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import VegMark from '#lib/components/VegMark.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { addToCart, cartCount, store, toggleFavourite } from '#lib/store.svelte.ts';
	import { ALLERGEN_INFO, DISHES, DISH_REVIEWS, formatPrice, NUTRITION, responsiveSrcset } from '#lib/data.ts';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	let dish = $derived(DISHES.find((d) => d.id === params.id)!);

	let qty = $state(1);
	let extraCheese = $state(false);
	let extraSauce = $state(false);
	let spice = $state<'Mild' | 'Medium' | 'Hot'>('Medium');
	let instructions = $state('');

	// Re-trigger the heart pop on every toggle.
	let heartPopped = $state(false);
	function onFavourite() {
		toggleFavourite(dish.id);
		heartPopped = true;
		setTimeout(() => (heartPopped = false), 350);
	}

	let unitPrice = $derived(dish.price + (extraCheese ? 0.99 : 0) + (extraSauce ? 0.49 : 0));
	let totalPrice = $derived(unitPrice * qty);

	let related = $derived(
		DISHES.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 3)
	);

	// Product JSON-LD as a string (see home page: raw ld+json <script> tags do not
	// evaluate {…} in Svelte, so it is injected with {@html}).
	const SITE_URL = 'https://zeesty.pages.dev';
	let productLd = $derived(
		`<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: dish.name,
			image: `${SITE_URL}${dish.image}`,
			description: dish.desc,
			offers: {
				'@type': 'Offer',
				price: dish.price,
				priceCurrency: 'USD',
				availability: 'https://schema.org/InStock'
			}
		}).replace(/</g, '\\u003c')}<\/script>`
	);

	// Rotate the review pool per dish so each dish shows a different set.
	let dishReviews = $derived.by(() => {
		const offset = dish.id.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % DISH_REVIEWS.length;
		return [0, 1, 2].map((i) => DISH_REVIEWS[(offset + i) % DISH_REVIEWS.length]);
	});
</script>

<svelte:head>
	<title>{dish.name} — Zesty</title>
	<meta
		name="description"
		content="{dish.name} — {dish.desc} Rated {dish.rating.toFixed(1)} by {dish.reviews} customers. Order on Zesty, delivered hot in 20–30 minutes."
	/>
	<Seo
		title="{dish.name} — Zesty"
		description="{dish.name} — {dish.desc} Rated {dish.rating.toFixed(1)} by {dish.reviews} customers. Order on Zesty, delivered hot in 20–30 minutes."
		path="/dish/{dish.id}"
		image={dish.image}
	/>
	{@html productLd}
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 pt-10 pb-28 sm:px-6 lg:pb-10">
	<a href="/menu" class="inline-flex items-center gap-2 py-1 text-sm font-bold text-stone-600 hover:text-brand">
		<ArrowLeft class="h-4 w-4" /> Back to Menu
	</a>

	<div class="mt-6 grid gap-10 lg:grid-cols-2">
		<div>
			<div class="relative overflow-hidden rounded-3xl shadow-sm">
				<FadeImage src={dish.image} srcset={responsiveSrcset(dish.image, dish.width)} sizes="(max-width: 768px) 100vw, 624px" alt={dish.name} width={dish.width} height={dish.height} loading="eager" fetchpriority="high" class="aspect-[4/3] w-full object-cover" />
				{#if dish.discount}
					<span class="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
						{dish.discount}
					</span>
				{/if}
				<button
					type="button"
					aria-label={store.favourites.has(dish.id)
						? `Remove ${dish.name} from favourites`
						: `Save ${dish.name} as favourite`}
					aria-pressed={store.favourites.has(dish.id)}
					onclick={onFavourite}
					class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow transition-transform duration-150 hover:scale-110 active:scale-95"
				>
					<Heart
						class="h-5 w-5 {heartPopped ? 'animate-heart-pop' : ''} {store.favourites.has(dish.id)
							? 'fill-red-500 text-red-500'
							: 'text-stone-500'}"
					/>
				</button>
			</div>
			<p class="mt-3 flex items-center gap-2 text-sm text-muted">
				<Clock class="h-4 w-4" /> Delivered hot in 20–30 minutes • Free delivery over $20
			</p>
		</div>

		<div>
			<div class="flex items-start justify-between gap-4">
				<div class="min-w-0">
					<VegMark veg={dish.veg} />
					<h1 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{dish.name}</h1>
					<p class="mt-2 flex flex-wrap items-center gap-1.5 text-sm">
						<Star class="h-5 w-5 fill-amber-400 text-amber-400" />
						<span class="font-bold">{dish.rating.toFixed(1)}</span>
						<span class="whitespace-nowrap text-muted">({dish.reviews} reviews)</span>
						<span class="ml-2 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">{dish.category}</span>
					</p>
				</div>
				<p class="flex shrink-0 items-baseline gap-2 font-display text-3xl font-extrabold whitespace-nowrap">
					{formatPrice(dish.price)}
					{#if dish.oldPrice}
						<span class="align-middle text-base font-medium text-muted line-through">{formatPrice(dish.oldPrice)}</span>
					{/if}
				</p>
			</div>

			<p class="mt-4 leading-relaxed text-muted">{dish.desc}</p>

			<h2 class="mt-6 font-display text-lg font-bold">Ingredients</h2>
			<ul class="mt-2 flex flex-wrap gap-2">
				{#each dish.ingredients as ing (ing)}
					<li class="rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow-sm">{ing}</li>
				{/each}
			</ul>

			<!-- Nutrition (estimated) + allergens — trust info the leaders all show -->
			{#if NUTRITION[dish.id]}
				{@const n = NUTRITION[dish.id]}
				<h2 class="mt-6 font-display text-lg font-bold">Nutrition <span class="text-sm font-semibold text-muted">(estimated, per serving)</span></h2>
				<div class="mt-2 grid grid-cols-4 gap-2 text-center">
					<div class="rounded-2xl bg-white p-3 shadow-sm"><p class="font-display text-lg font-extrabold">{n.calories}</p><p class="text-xs text-muted">Calories</p></div>
					<div class="rounded-2xl bg-white p-3 shadow-sm"><p class="font-display text-lg font-extrabold">{n.protein}g</p><p class="text-xs text-muted">Protein</p></div>
					<div class="rounded-2xl bg-white p-3 shadow-sm"><p class="font-display text-lg font-extrabold">{n.carbs}g</p><p class="text-xs text-muted">Carbs</p></div>
					<div class="rounded-2xl bg-white p-3 shadow-sm"><p class="font-display text-lg font-extrabold">{n.fat}g</p><p class="text-xs text-muted">Fat</p></div>
				</div>
			{/if}
			{#if ALLERGEN_INFO[dish.id]?.length}
				<h2 class="mt-6 font-display text-lg font-bold">Allergens</h2>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each ALLERGEN_INFO[dish.id] as allergen (allergen)}
						<li class="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">{allergen}</li>
					{/each}
				</ul>
				<p class="mt-2 text-xs text-muted">Values are estimates. Tell us about allergies in “Cooking instructions” and we’ll take care.</p>
			{/if}

			<h2 class="mt-6 font-display text-lg font-bold">Customise</h2>
			<div class="mt-2 space-y-2">
				<label class="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
					<span class="flex items-center gap-2 text-sm font-semibold">
						<input type="checkbox" bind:checked={extraCheese} class="h-5 w-5 accent-orange-600" />
						Extra cheese
					</span>
					<span class="text-sm font-bold">+$0.99</span>
				</label>
				<label class="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
					<span class="flex items-center gap-2 text-sm font-semibold">
						<input type="checkbox" bind:checked={extraSauce} class="h-5 w-5 accent-orange-600" />
						Extra sauce
					</span>
					<span class="text-sm font-bold">+$0.49</span>
				</label>
			</div>

			<fieldset class="mt-4">
				<legend class="font-display text-lg font-bold">Spice level</legend>
				<div class="mt-2 flex gap-2">
					{#each ['Mild', 'Medium', 'Hot'] as level (level)}
						<button
							type="button"
							aria-pressed={spice === level}
							onclick={() => (spice = level as 'Mild' | 'Medium' | 'Hot')}
							class="rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 active:scale-95 {spice === level
								? 'bg-brand text-white shadow'
								: 'bg-white text-stone-700 shadow-sm hover:text-brand'}"
						>
							{level}
						</button>
					{/each}
				</div>
			</fieldset>

			<div class="mt-4">
				<label for="instructions" class="font-display text-lg font-bold">Cooking instructions</label>
				<textarea
					id="instructions"
					rows="2"
					bind:value={instructions}
					placeholder="e.g. No onions, extra spicy, cut the burger in half…"
					class="mt-2 w-full resize-none rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
				></textarea>
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3">
				<div class="flex items-center gap-1 rounded-full bg-white px-2 py-2 shadow-sm">
					<button
						type="button"
						aria-label="Decrease quantity"
						onclick={() => (qty = Math.max(1, qty - 1))}
						class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
					>
						<Minus class="h-4 w-4" />
					</button>
					<span class="w-8 text-center font-display text-lg font-extrabold">{qty}</span>
					<button
						type="button"
						aria-label="Increase quantity"
						onclick={() => (qty += 1)}
						class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
					>
						<Plus class="h-4 w-4" />
					</button>
				</div>
				<button
					type="button"
					onclick={() => addToCart(dish, qty, unitPrice, { spice, instructions: instructions.trim() || undefined })}
					class="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3.5 text-[15px] font-bold whitespace-nowrap text-white shadow transition-transform duration-150 hover:bg-brand-dark active:scale-95 sm:px-6 sm:text-base"
				>
					<ShoppingCart class="h-5 w-5" />
					Add to Cart • {formatPrice(totalPrice)}
				</button>
			</div>
			{#if instructions.trim()}
				<p class="mt-2 text-xs text-muted">Note for the kitchen: “{instructions.trim()}”</p>
			{/if}
		</div>
	</div>

	<section class="mt-14" use:reveal>
		<h2 class="font-display text-2xl font-extrabold">What customers say</h2>
		<div class="mt-4 grid gap-4 sm:grid-cols-3">
			{#each dishReviews as review (review.name + review.text)}
				<figure class="rounded-3xl bg-white p-5 shadow-sm">
					<div class="flex items-center gap-1">
						{#each Array(review.rating) as _}
							<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
						{/each}
						<span class="ml-1 text-sm font-bold">{review.rating.toFixed(1)}</span>
					</div>
					<blockquote class="mt-2 text-sm leading-relaxed">“{review.text}”</blockquote>
					<figcaption class="mt-3 text-sm font-bold">{review.name}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	{#if related.length > 0}
		<section class="mt-14" use:reveal>
			<h2 class="font-display text-2xl font-extrabold">You may also like</h2>
			<div class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each related as rel (rel.id)}
					<DishCard dish={rel} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<!-- STICKY MOBILE ADD BAR — thumb zone; only while the cart is empty, so it
     never fights the global cart bar (which takes over once you add). -->
{#if cartCount() === 0}
	<div
		class="fixed inset-x-4 bottom-20 z-30 flex items-center justify-between gap-3 rounded-full bg-white py-2 pr-2 pl-5 shadow-xl ring-1 ring-orange-100 lg:hidden"
		style="margin-bottom: env(safe-area-inset-bottom)"
	>
		<span class="min-w-0">
			<span class="block truncate text-sm font-bold">{dish.name}</span>
			<span class="block text-sm font-extrabold text-brand">{formatPrice(totalPrice)}</span>
		</span>
		<button
			type="button"
			onclick={() => addToCart(dish, qty, unitPrice, { spice, instructions: instructions.trim() || undefined })}
			class="flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold whitespace-nowrap text-white shadow transition-transform duration-150 hover:bg-brand-dark active:scale-95"
		>
			<ShoppingCart class="h-4 w-4" /> Add to Cart
		</button>
	</div>
{/if}
