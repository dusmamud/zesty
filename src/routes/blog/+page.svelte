<script lang="ts">
	import FadeImage from '#lib/components/FadeImage.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { DISHES, responsiveSrcset } from '#lib/data.ts';
	import { reveal } from '#lib/actions/reveal.ts';

	const POSTS = [
		{
			title: 'Why your burger arrives hot (and how we keep it that way)',
			date: '12 November 2026',
			image: '/images/burger-chicken.webp',
			alt: 'Zesty Chicken Burger',
			paras: [
				'A burger that travels 3 km should still taste like it just left the grill. Ours does, because of three boring decisions: the patty is cooked after you order, the box vents steam instead of trapping it, and the rider bag is heated — not just insulated.',
				'We tested 14 box designs before picking this one. The difference is real: soggy buns dropped from 1 in 5 orders to almost none. Small details, big difference.'
			]
		},
		{
			title: 'The 20–30 minute promise: what happens after you tap Order',
			date: '5 November 2026',
			image: '/images/noodles-thai.webp',
			alt: 'Thai Basil Noodles',
			paras: [
				'Minute 0: your order prints in the kitchen. Minute 2: cooking starts. Minute 10: packing, with a photo check. Minute 12: a rider picks it up. The rest is the road — and riders who know every shortcut in the city.',
				'If anything slips past 30 minutes, the Orders page tells you why instead of leaving you guessing. A late order you can see is still annoying — but at least it is honest.'
			]
		},
		{
			title: '5 dishes our regulars order every single week',
			date: '28 October 2026',
			image: '/images/pizza-veggie.webp',
			alt: 'Veggie Supreme Pizza',
			paras: [
				'We looked at a month of orders. The top five: Zesty Chicken Burger, Veggie Supreme Pizza, Thai Basil Noodles, Chocolate Lava Cake and Mango Smoothie. The burger wins by a mile — 410 ratings at 4.9 stars.',
				'New here? Start with the burger, add a lava cake, and use FIRST50 for 50% off your first order. That is the regulars\' starter pack, and it works.'
			]
		}
	];
</script>

<svelte:head>
	<title>Blog — Zesty</title>
	<meta
		name="description"
		content="The Zesty blog: how we keep food hot on delivery, what happens after you tap order, and the dishes our regulars love most."
	/>
	<Seo
		title="Blog — Zesty"
		description="The Zesty blog: how we keep food hot on delivery, what happens after you tap order, and the dishes our regulars love most."
		path="/blog"
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Blog</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">From Our Kitchen</h1>
		<p class="mt-2 max-w-xl text-muted">Short notes on food, delivery and the dishes you love.</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each POSTS as post, i (post.title)}
			{@const postDish = DISHES.find((d) => d.image === post.image)}
			<article class="overflow-hidden rounded-3xl bg-white shadow-sm" use:reveal={{ delay: i * 100 }}>
				<FadeImage
					src={post.image}
					srcset={postDish ? responsiveSrcset(post.image, postDish.width) : undefined}
					sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
					alt={post.alt}
					width={postDish?.width}
					height={postDish?.height}
					class="h-52 w-full object-cover"
				/>
				<div class="p-6">
					<p class="text-xs font-bold tracking-wide text-orange-700 uppercase">{post.date}</p>
					<h2 class="mt-2 font-display text-xl leading-snug font-bold">{post.title}</h2>
					{#each post.paras as para (para.slice(0, 24))}
						<p class="mt-2 text-sm leading-relaxed text-muted">{para}</p>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</div>
