<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		Apple,
		ArrowRight,
		BadgeCheck,
		Bike,
		ChevronLeft,
		ChevronRight,
		Clock,
		Headphones,
		Heart,
		Play,
		RotateCcw,
		Search,
		ShieldCheck,
		Star,
		Truck,
		UtensilsCrossed,
		Zap
	} from '@lucide/svelte';
	import CategoryRail from '#lib/components/CategoryRail.svelte';
	import DishCard from '#lib/components/DishCard.svelte';
	import OfferCard from '#lib/components/OfferCard.svelte';
	import { parallax } from '#lib/actions/parallax.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import {
		CATEGORIES,
		DISHES,
		OFFERS,
		TESTIMONIALS,
		type Dish
	} from '#lib/data.ts';

	// --- menu state ---
	let activeCategory = $state<(typeof CATEGORIES)[number]>('All');
	let searchQuery = $state('');

	let visibleDishes = $derived(
		DISHES.filter(
			(d) =>
				(activeCategory === 'All' || d.category === activeCategory) &&
				(searchQuery.trim() === '' ||
					`${d.name} ${d.desc} ${d.category}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
		)
	);

	// --- testimonials (auto-advance every 5s, pause on hover/focus) ---
	let testimonialIndex = $state(0);
	let testimonial = $derived(TESTIMONIALS[testimonialIndex]);
	let testimonialPaused = $state(false);
	let testimonialTimer: ReturnType<typeof setInterval> | undefined;

	function nextTestimonial() {
		testimonialIndex = (testimonialIndex + 1) % TESTIMONIALS.length;
	}

	function restartTestimonialTimer() {
		if (testimonialTimer) clearInterval(testimonialTimer);
		if (typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		testimonialTimer = setInterval(() => {
			if (!testimonialPaused) nextTestimonial();
		}, 5000);
	}

	function goToTestimonial(i: number) {
		testimonialIndex = i;
		restartTestimonialTimer();
	}

	onMount(() => {
		restartTestimonialTimer();
		return () => {
			if (testimonialTimer) clearInterval(testimonialTimer);
		};
	});

	const TESTIMONIAL_AVATARS: Record<string, string> = {
		'Alex Morgan': '/images/avatars/alex-morgan.webp',
		'Priya Sharma': '/images/avatars/avatar-woman-2.jpg',
		'James Carter': '/images/avatars/avatar-man.webp'
	};

	// --- offers ---
	let copiedCode = $state<string | null>(null);
	async function copyCode(code: string) {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			// Clipboard unavailable (e.g. non-secure context) — code is still visible on screen.
		}
		copiedCode = code;
		setTimeout(() => (copiedCode = null), 2000);
	}

	const MARQUEE_ITEMS = [
		'Burgers',
		'Pizza',
		'Asian',
		'Desserts',
		'Drinks',
		'Free delivery over $20',
		'20–30 mins'
	];

	const POPULAR_NEAR_YOU: Dish[] = [
		DISHES.find((d) => d.id === 'veggie-supreme-pizza')!,
		DISHES.find((d) => d.id === 'zesty-chicken-burger')!,
		DISHES.find((d) => d.id === 'thai-basil-noodles')!
	];
</script>

<svelte:head>
	<title>Zesty — Delicious Food, Delivered Fast</title>
	<meta
		name="description"
		content="Zesty — delicious food, delivered fast to your door. Burgers, pizza, Asian, desserts and drinks, hot and fresh in 20–30 minutes."
	/>
	<meta property="og:title" content="Zesty — Delicious Food, Delivered Fast" />
	<meta
		property="og:description"
		content="Craving something tasty? We deliver your favorite meals hot, fresh and on time."
	/>
	<meta property="og:type" content="website" />
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Restaurant',
			name: 'Zesty',
			servesCuisine: ['Burgers', 'Pizza', 'Asian', 'Desserts'],
			priceRange: '$'
		})}
	</script>
</svelte:head>

<!-- HERO -->
<section class="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
	<div>
		<p
			class="hero-anim inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand"
			style="--hero-delay: 0ms"
		>
			<Zap class="h-3.5 w-3.5" /> Fast • Fresh • Reliable
		</p>
		<h1
			class="hero-anim mt-4 font-display text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
			style="--hero-delay: 80ms"
		>
			Delicious Food,<br />
			<span class="text-brand">Delivered Fast</span><br />
			To Your Door
		</h1>
		<p class="hero-anim mt-4 max-w-md text-lg text-muted" style="--hero-delay: 160ms">
			Craving something tasty? We deliver your favorite meals hot, fresh and on time.
		</p>
		<div class="hero-anim mt-6 flex flex-wrap items-center gap-4" style="--hero-delay: 240ms">
			<a
				href="/menu"
				class="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				Order Now <ArrowRight class="h-5 w-5" />
			</a>
			<a
				href="/how-it-works"
				class="inline-flex items-center gap-2 font-bold transition-transform duration-150 hover:text-brand active:scale-95"
			>
				<span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink">
					<Play class="h-4 w-4 fill-current" />
				</span>
				Watch Video
			</a>
		</div>
		<div class="hero-anim mt-8 flex items-center gap-3" style="--hero-delay: 320ms">
			<div class="flex -space-x-2">
				<img src="/images/avatars/avatar-woman-1.jpg" alt="Happy customer" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
				<img src="/images/avatars/avatar-man.webp" alt="Happy customer" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
				<img src="/images/avatars/avatar-woman-2.jpg" alt="Happy customer" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
			</div>
			<div>
				<p class="text-sm font-bold">10K+ Happy Customers</p>
				<p class="flex items-center gap-1 text-sm text-muted">
					{#each Array(5) as _}
						<Star class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
					{/each}
					(4.8)
				</p>
			</div>
		</div>
	</div>

	<div class="relative mx-auto w-full max-w-lg" use:parallax={{ speed: 0.08, max: 80 }}>
		<div class="hero-blob absolute z-0 rounded-full" aria-hidden="true"></div>
		<img
			src="/images/hero-woman.jpg"
			alt="Smiling woman holding a fresh salad bowl"
			class="hero-photo relative z-10 aspect-square w-full rounded-full object-cover shadow-xl"
		/>
		<div
			class="hero-float absolute top-8 -left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8"
			style="--hero-delay: 500ms; --bob-delay: 1.1s"
		>
			<img src="/images/avatars/avatar-woman-1.jpg" alt="" class="h-9 w-9 rounded-full object-cover" />
			<div>
				<p class="text-xs text-muted">Delivery Time</p>
				<p class="text-sm font-bold">20–30 mins</p>
			</div>
			<Clock class="h-5 w-5 text-brand" />
		</div>
		<div
			class="hero-float absolute right-0 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg"
			style="--hero-delay: 600ms; --bob-delay: 1.6s"
		>
			<img src="/images/salad-bowl.jpg" alt="Fresh salad bowl" class="h-12 w-12 rounded-full object-cover" />
			<div>
				<p class="font-display text-lg font-extrabold text-brand">50% OFF</p>
				<p class="text-xs text-muted">On Your First Order</p>
			</div>
		</div>
		<div
			class="hero-pulse absolute top-2 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg"
		>
			<Heart class="h-5 w-5 fill-red-500 text-red-500" />
		</div>
	</div>
</section>

<!-- SIGNATURE CUISINE MARQUEE -->
<div class="marquee overflow-hidden bg-brand py-3" aria-hidden="true">
	<div class="marquee-track">
		{#each [0, 1] as copy (copy)}
			<div class="flex shrink-0 items-center">
				{#each MARQUEE_ITEMS as item (item)}
					<span class="flex items-center font-display text-sm font-extrabold tracking-widest whitespace-nowrap text-white uppercase">
						<span class="px-6">{item}</span>
						<span class="text-white/60">✦</span>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<!-- WHY CHOOSE US -->
<section id="how-it-works" class="relative mx-auto max-w-[1440px] scroll-mt-24 px-4 py-16 sm:px-6">
	<div use:reveal>
		<p class="text-center text-xs font-bold tracking-widest text-brand uppercase">• Why Choose Us •</p>
		<h2 class="mt-2 text-center font-display text-3xl font-extrabold sm:text-4xl">
			Your Favourite Food<br />Delivery Partner
		</h2>
	</div>
	<div class="mt-10 grid gap-8 sm:grid-cols-3">
		{#each [{ icon: Bike, title: 'Lightning Fast', text: 'Super quick delivery right to your door.' }, { icon: UtensilsCrossed, title: 'Wide Variety', text: 'Choose from a wide range of cuisines and dishes.' }, { icon: BadgeCheck, title: 'Top Quality', text: 'We use the freshest ingredients for the best taste.' }] as f, i (f.title)}
			{@const Icon = f.icon}
			<div class="rounded-3xl bg-white p-8 text-center shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-10 w-10" />
				</span>
				<h3 class="mt-4 font-display text-lg font-bold">{f.title}</h3>
				<p class="mt-1 text-sm text-muted">{f.text}</p>
			</div>
		{/each}
	</div>
	<div class="mt-8 grid gap-4 text-center sm:grid-cols-3">
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm" use:reveal={{ delay: 0 }}><p class="font-display text-xl font-extrabold">1. Pick a dish</p><p class="text-sm text-muted">Browse the menu and add to cart.</p></div>
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm" use:reveal={{ delay: 100 }}><p class="font-display text-xl font-extrabold">2. Checkout as guest</p><p class="text-sm text-muted">No account needed — UPI, card or cash.</p></div>
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm" use:reveal={{ delay: 200 }}><p class="font-display text-xl font-extrabold">3. Hot at your door</p><p class="text-sm text-muted">Tracked delivery in 20–30 minutes.</p></div>
	</div>
</section>

<!-- MENU -->
<section id="menu" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-16 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">Explore Our Menu</p>
		<div class="mt-1 flex flex-wrap items-end justify-between gap-4">
			<h2 class="font-display text-3xl font-extrabold sm:text-4xl">Tasty Food You'll Love</h2>
			<div class="relative">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
				<input
					type="search"
					value={searchQuery}
					placeholder="Search dishes…"
					aria-label="Search dishes in menu"
					oninput={(e) => (searchQuery = e.currentTarget.value)}
					class="w-64 rounded-full border border-orange-200 bg-white py-2.5 pr-4 pl-9 text-sm outline-none focus:border-brand"
				/>
			</div>
		</div>
	</div>

	<div class="mt-6 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
		<CategoryRail active={activeCategory} onSelect={(c) => (activeCategory = c)} />

		<div>
			{#if visibleDishes.length === 0}
				<p class="rounded-2xl bg-white p-8 text-center text-muted">
					No dishes match “{searchQuery}”. Try another search or category.
				</p>
			{:else}
				{#key activeCategory + searchQuery}
					<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{#each visibleDishes as dish, i (dish.id)}
							<div use:reveal={{ delay: (i % 3) * 80 }}>
								<DishCard {dish} />
							</div>
						{/each}
					</div>
				{/key}
			{/if}
			<p class="mt-6 text-center">
				<a
					href="/menu"
					class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-stone-800 active:scale-95"
				>
					See Full Menu <ArrowRight class="h-4 w-4" />
				</a>
			</p>
		</div>
	</div>
</section>

<!-- OFFERS -->
<section id="offers" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-8 sm:px-6">
	<div class="grid gap-4 sm:grid-cols-3">
		{#each OFFERS as offer, i (offer.code)}
			<div use:reveal={{ delay: i * 100 }}>
				<OfferCard {offer} copied={copiedCode === offer.code} onCopy={() => copyCode(offer.code)} compact />
			</div>
		{/each}
	</div>
	<p class="mt-2 text-sm text-muted">
		All codes work in the cart: FIRST50 gives 50% off, ZESTY20 gives 20% off, FREEDEL gives free delivery.
		<a href="/offers" class="font-bold text-brand hover:underline">See all offers →</a>
	</p>
</section>

<!-- TESTIMONIALS -->
<section id="about" class="mx-auto grid max-w-[1440px] scroll-mt-24 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<div class="relative mx-auto w-full max-w-md" use:reveal>
		<div class="absolute inset-0 -z-10 rounded-full bg-brand"></div>
		<img
			src="/images/testimonial-man.webp"
			alt="Smiling man eating a burger"
			class="aspect-square w-full rounded-full object-cover"
		/>
		<div class="absolute bottom-6 left-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg">
			<div class="flex -space-x-2">
				<img src="/images/avatars/avatar-woman-1.jpg" alt="" class="h-7 w-7 rounded-full border-2 border-white object-cover" />
				<img src="/images/avatars/avatar-man.webp" alt="" class="h-7 w-7 rounded-full border-2 border-white object-cover" />
				<img src="/images/avatars/avatar-woman-2.jpg" alt="" class="h-7 w-7 rounded-full border-2 border-white object-cover" />
			</div>
			<span class="font-display text-lg font-extrabold">12K+</span>
			<span class="text-sm text-muted">Our Happy Customers</span>
		</div>
	</div>
	<div
		role="region"
		aria-label="Customer testimonials"
		use:reveal={{ delay: 100 }}
		onmouseenter={() => (testimonialPaused = true)}
		onmouseleave={() => (testimonialPaused = false)}
		onfocusin={() => (testimonialPaused = true)}
		onfocusout={() => (testimonialPaused = false)}
	>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">What Our Customers Say</p>
		<h2 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Loved By Thousands<br />Of Foodies</h2>
		<p class="mt-2 text-muted">We're proud to serve delicious food and great service every single time.</p>

		{#key testimonialIndex}
			<figure in:fly={{ y: 10, duration: 250 }} class="mt-6 rounded-3xl bg-white p-6 shadow-sm">
				<div class="flex items-center gap-1">
					{#each Array(5) as _}
						<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
					{/each}
					<span class="ml-1 font-bold">{testimonial.rating.toFixed(1)}</span>
				</div>
				<blockquote class="mt-3 text-lg leading-relaxed">“{testimonial.text}”</blockquote>
				<figcaption class="mt-4 flex items-center gap-3">
					<img
						src={TESTIMONIAL_AVATARS[testimonial.name]}
						alt={testimonial.name}
						class="h-11 w-11 rounded-full object-cover"
					/>
					<div>
						<p class="font-bold">{testimonial.name}</p>
						<p class="text-sm text-muted">{testimonial.role}</p>
					</div>
				</figcaption>
			</figure>
		{/key}
		<div class="mt-4 flex items-center gap-3">
			<button
				type="button"
				aria-label="Previous testimonial"
				onclick={() => goToTestimonial((testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
				class="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-150 hover:text-brand active:scale-95"
			>
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button
				type="button"
				aria-label="Next testimonial"
				onclick={() => goToTestimonial((testimonialIndex + 1) % TESTIMONIALS.length)}
				class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				<ChevronRight class="h-5 w-5" />
			</button>
			<div class="ml-1 flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
				{#each TESTIMONIALS as _, i (i)}
					<button
						type="button"
						role="tab"
						aria-selected={i === testimonialIndex}
						aria-label="Show testimonial {i + 1}"
						onclick={() => goToTestimonial(i)}
						class="h-2 rounded-full transition-all duration-200 {i === testimonialIndex
							? 'w-6 bg-brand'
							: 'w-2 bg-stone-300 hover:bg-stone-400'}"
					></button>
				{/each}
			</div>
			<span class="ml-1 text-sm text-muted">{testimonialIndex + 1} / {TESTIMONIALS.length}</span>
		</div>
	</div>
</section>

<!-- APP DOWNLOAD -->
<section class="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6">
	<div class="grid items-center gap-8 rounded-[2rem] bg-cream-dark p-8 sm:p-10 lg:grid-cols-2" use:reveal>
		<div>
			<p class="text-xs font-bold tracking-widest text-brand uppercase">Download Our App</p>
			<h2 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Get Exclusive Offers<br />On The Zesty App!</h2>
			<p class="mt-3 max-w-md text-muted">Download now and enjoy special discounts, fast delivery and easy tracking.</p>
			<div class="mt-6">
				<a
					href="/menu"
					class="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
				>
					Download App <ArrowRight class="h-4 w-4" />
				</a>
			</div>
			<div class="mt-6 flex flex-wrap gap-3">
				<span class="flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-white">
					<Play class="h-6 w-6 fill-current" />
					<span class="leading-tight">
						<span class="block text-[10px] tracking-wide text-stone-300 uppercase">Get it on</span>
						<span class="block text-base font-bold">Google Play</span>
					</span>
				</span>
				<span class="flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-white">
					<Apple class="h-6 w-6" />
					<span class="leading-tight">
						<span class="block text-[10px] tracking-wide text-stone-300 uppercase">Download on the</span>
						<span class="block text-base font-bold">App Store</span>
					</span>
				</span>
			</div>
			<p class="mt-3 text-xs text-muted">App badges are illustrative — order right here on the web, no install needed.</p>
		</div>
		<div class="mx-auto w-full max-w-xs rounded-[2.2rem] border-8 border-ink bg-white p-4 shadow-xl">
			<div class="flex items-center justify-between">
				<p class="font-display text-lg font-extrabold">Hi, Alex 👋</p>
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
					<UtensilsCrossed class="h-4 w-4" />
				</span>
			</div>
			<p class="text-sm text-muted">What would you like to eat today?</p>
			<p class="mt-3 rounded-xl bg-brand px-3 py-2 text-center text-sm font-bold text-white">50% OFF on First Order</p>
			<div class="mt-3 flex gap-2">
				{#each ['Burger', 'Pizza', 'Noodles', 'Drinks'] as chip (chip)}
					<span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand">{chip}</span>
				{/each}
			</div>
			<p class="mt-4 text-sm font-bold">Popular Near You</p>
			<div class="mt-2 grid grid-cols-3 gap-2">
				{#each POPULAR_NEAR_YOU as dish (dish.id)}
					<a href="/dish/{dish.id}" class="group block">
						<img src={dish.image} alt={dish.name} loading="lazy" class="h-20 w-full rounded-xl object-cover" />
						<p class="mt-1 truncate text-[11px] font-bold group-hover:text-brand">{dish.name}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- TRUST ROW -->
<section class="border-t border-orange-100 bg-white">
	<div class="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
		{#each [{ icon: Truck, title: 'Free Delivery', text: 'On orders over $20' }, { icon: RotateCcw, title: 'Easy Returns', text: 'Within 7 days' }, { icon: ShieldCheck, title: 'Secure Payment', text: '100% protected' }, { icon: Headphones, title: '24/7 Support', text: "We're here to help" }] as t, i (t.title)}
			{@const Icon = t.icon}
			<div class="flex items-start gap-3" use:reveal={{ delay: i * 80 }}>
				<Icon class="h-7 w-7 shrink-0 text-brand" />
				<div><p class="font-bold">{t.title}</p><p class="text-sm text-muted">{t.text}</p></div>
			</div>
		{/each}
	</div>
</section>
