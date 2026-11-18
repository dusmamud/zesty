<script lang="ts">
	import { Heart, Star } from '@lucide/svelte';
	import FadeImage from '#lib/components/FadeImage.svelte';
	import VegMark from '#lib/components/VegMark.svelte';
	import { addToCart, store, toggleFavourite } from '#lib/store.svelte.ts';
	import { formatPrice, responsiveSrcset, type Dish } from '#lib/data.ts';

	interface Props {
		dish: Dish;
		/** True for the first card on a listing page (its image is the LCP element). */
		priority?: boolean;
	}

	let { dish, priority = false }: Props = $props();

	// Re-trigger the heart pop on every toggle.
	let heartPopped = $state(false);
	function onFavourite() {
		toggleFavourite(dish.id);
		heartPopped = true;
		setTimeout(() => (heartPopped = false), 350);
	}
</script>

<article
	class="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
	<div class="relative">
		<a href="/dish/{dish.id}" aria-label="View {dish.name}">
			<FadeImage
				src={dish.image}
				srcset={responsiveSrcset(dish.image, dish.width)}
				sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
				alt={dish.name}
				width={dish.width}
				height={dish.height}
				loading={priority ? 'eager' : 'lazy'}
				fetchpriority={priority ? 'high' : undefined}
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
			onclick={onFavourite}
			class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition-transform duration-150 hover:scale-110 active:scale-95"
		>
			<Heart
				class="h-4.5 w-4.5 {heartPopped ? 'animate-heart-pop' : ''} {store.favourites.has(dish.id)
					? 'fill-red-500 text-red-500'
					: 'text-stone-500'}"
			/>
		</button>
		<div
			class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-black/5 px-4 pt-16 pb-4 text-white"
		>
			<div class="flex items-start gap-2">
				<a href="/dish/{dish.id}" class="min-w-0">
					<h2 class="font-display text-lg leading-tight font-bold hover:underline">{dish.name}</h2>
				</a>
				<VegMark veg={dish.veg} />
			</div>
			<p class="mt-1 flex items-center gap-1 text-sm">
				<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
				<span class="font-bold">{dish.rating.toFixed(1)}</span>
				<span class="text-white/80">({dish.reviews})</span>
			</p>
			<div class="pointer-events-auto mt-2 flex items-center justify-between gap-2">
				<p class="flex items-baseline gap-2 font-display text-xl font-extrabold">
					{formatPrice(dish.price)}
					{#if dish.oldPrice}
						<span class="text-sm font-medium text-white/70 line-through">
							{formatPrice(dish.oldPrice)}
						</span>
					{/if}
				</p>
				<button
					type="button"
					onclick={() => addToCart(dish)}
					class="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Order Now
				</button>
			</div>
		</div>
	</div>
</article>
