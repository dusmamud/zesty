<script lang="ts">
	import { Heart, Star } from '@lucide/svelte';
	import { addToCart, store, toggleFavourite } from '#lib/store.svelte.ts';
	import { formatPrice, type Dish } from '#lib/data.ts';

	interface Props {
		dish: Dish;
	}

	let { dish }: Props = $props();
</script>

<article class="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl">
	<div class="relative">
		<a href="/dish/{dish.id}" aria-label="View {dish.name}">
			<img
				src={dish.image}
				alt={dish.name}
				loading="lazy"
				class="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
			/>
		</a>
		{#if dish.discount}
			<span class="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">
				{dish.discount}
			</span>
		{/if}
		<button
			type="button"
			aria-label={store.favourites.has(dish.id)
				? `Remove ${dish.name} from favourites`
				: `Save ${dish.name} as favourite`}
			aria-pressed={store.favourites.has(dish.id)}
			onclick={() => toggleFavourite(dish.id)}
			class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:scale-110"
		>
			<Heart
				class="h-4.5 w-4.5 {store.favourites.has(dish.id)
					? 'fill-red-500 text-red-500'
					: 'text-stone-500'}"
			/>
		</button>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pt-12 pb-4 text-white"
		>
			<div class="flex items-start gap-2">
				<a href="/dish/{dish.id}" class="min-w-0">
					<h3 class="font-display text-lg leading-tight font-bold hover:underline">{dish.name}</h3>
				</a>
				<span
					class="mt-1 flex h-4 w-4 shrink-0 items-center justify-center border-2 {dish.veg
						? 'border-green-400'
						: 'border-red-400'}"
					title={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
				>
					<span class="h-2 w-2 rounded-full {dish.veg ? 'bg-green-400' : 'bg-red-400'}"></span>
				</span>
			</div>
			<p class="mt-1 flex items-center gap-1 text-sm">
				<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
				<span class="font-bold">{dish.rating.toFixed(1)}</span>
				<span class="text-white/80">({dish.reviews})</span>
			</p>
			<div class="pointer-events-auto mt-2 flex items-center justify-between gap-2">
				<p class="font-display text-xl font-extrabold">
					{formatPrice(dish.price)}
					{#if dish.oldPrice}
						<span class="ml-1 text-sm font-medium text-white/70 line-through">
							{formatPrice(dish.oldPrice)}
						</span>
					{/if}
				</p>
				<button
					type="button"
					onclick={() => addToCart(dish)}
					class="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow hover:bg-brand-dark"
				>
					Order Now
				</button>
			</div>
		</div>
	</div>
</article>
