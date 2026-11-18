<script lang="ts">
	import { Star } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { motionReveal } from '#lib/actions/motionReveal.ts';
	import { DISHES, REVIEWS } from '#lib/data.ts';

	let minRating = $state(0);
	let shown = $derived(REVIEWS.filter((r) => r.rating >= minRating));
	let avg = $derived((REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1));

	function dishImage(dishName: string) {
		return DISHES.find((d) => d.name === dishName)?.image ?? '/images/salad-bowl.webp';
	}
</script>

<svelte:head>
	<title>Reviews — Zesty</title>
	<meta
		name="description"
		content="What customers say about Zesty: real reviews of burgers, pizza, noodles, desserts and delivery, with ratings per dish."
	/>
	<Seo
		title="Reviews — Zesty"
		description="What customers say about Zesty: reviews of burgers, pizza, noodles, desserts and delivery, with ratings per dish."
		path="/reviews"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:motionReveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Reviews</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Loved By Thousands Of Foodies</h1>
		<p class="mt-2 flex flex-wrap items-center gap-2 text-muted">
			<span class="flex items-center gap-1">
				{#each Array(5) as _}
					<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
				{/each}
			</span>
			<span class="font-bold text-ink">{avg} average</span> • {REVIEWS.length} reviews • Demo reviews shown on this demo site.
		</p>
	</div>

	<div class="mt-6 flex flex-wrap gap-2" use:motionReveal>
		{#each [0, 4, 5] as r (r)}
			<button
				type="button"
				onclick={() => (minRating = r)}
				aria-pressed={minRating === r}
				class="rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-transform duration-150 active:scale-95 {minRating === r
					? 'bg-brand text-white'
					: 'bg-white hover:text-brand'}"
			>
				{r === 0 ? 'All reviews' : `${r}★ & up`}
			</button>
		{/each}
	</div>

	<div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
		{#each shown as review, i (review.name + review.dish)}
			<figure class="rounded-3xl bg-white p-6 shadow-sm" use:motionReveal={{ delay: (i % 3) * 80 }}>
				<div class="flex items-center gap-1">
					{#each Array(5) as _, s (s)}
						<Star
							class="h-4 w-4 {s < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}"
						/>
					{/each}
					<span class="ml-1 font-bold">{review.rating.toFixed(1)}</span>
				</div>
				<blockquote class="mt-3 leading-relaxed">“{review.text}”</blockquote>
				<figcaption class="mt-4 flex items-center gap-3">
					<img
						src={dishImage(review.dish)}
						alt=""
						width="80"
						height="80"
						loading="lazy"
						class="h-11 w-11 rounded-full object-cover"
					/>
					<div>
						<p class="font-bold">{review.name}</p>
						<p class="text-sm text-muted">{review.dish} • {review.date}</p>
					</div>
				</figcaption>
			</figure>
		{/each}
	</div>
	{#if shown.length === 0}
		<p class="mt-8 rounded-2xl bg-white p-8 text-center text-muted">No reviews match that filter yet.</p>
	{/if}
</div>
