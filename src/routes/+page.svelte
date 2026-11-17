<script lang="ts">
	import {
		Apple,
		ArrowRight,
		BadgeCheck,
		Bike,
		ChevronLeft,
		ChevronRight,
		Clock,
		Copy,
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
	import {
		CATEGORIES,
		DISHES,
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

	// --- testimonials ---
	let testimonialIndex = $state(0);
	let testimonial = $derived(TESTIMONIALS[testimonialIndex]);
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

	const HOME_OFFERS = [
		{ code: 'FIRST50', text: '50% off your first order' },
		{ code: 'ZESTY20', text: '20% off orders over $15' },
		{ code: 'FREEDEL', text: 'Free delivery on any order' }
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
			priceRange: '$',
			telephone: '+1-555-0199',
			address: { '@type': 'PostalAddress', streetAddress: '123 Food Street', addressLocality: 'Flavortown' }
		})}
	</script>
</svelte:head>

<!-- HERO -->
<section class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
	<div>
		<p class="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand">
			<Zap class="h-3.5 w-3.5" /> Fast • Fresh • Reliable
		</p>
		<h1 class="mt-4 font-display text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl">
			Delicious Food,<br />
			<span class="text-brand">Delivered Fast</span><br />
			To Your Door
		</h1>
		<p class="mt-4 max-w-md text-lg text-muted">
			Craving something tasty? We deliver your favorite meals hot, fresh and on time.
		</p>
		<div class="mt-6 flex flex-wrap items-center gap-4">
			<a
				href="/menu"
				class="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 hover:bg-brand-dark"
			>
				Order Now <ArrowRight class="h-5 w-5" />
			</a>
			<a href="/how-it-works" class="inline-flex items-center gap-2 font-bold hover:text-brand">
				<span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink">
					<Play class="h-4 w-4 fill-current" />
				</span>
				Watch Video
			</a>
		</div>
		<div class="mt-8 flex items-center gap-3">
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

	<div class="relative mx-auto w-full max-w-lg">
		<div class="absolute inset-0 -z-10 rounded-full bg-orange-100"></div>
		<img
			src="/images/hero-woman.jpg"
			alt="Happy woman in a mustard sweater eating a fresh salad bowl"
			class="aspect-square w-full rounded-full object-cover shadow-xl"
		/>
		<div class="absolute top-8 -left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8">
			<img src="/images/avatars/avatar-woman-1.jpg" alt="" class="h-9 w-9 rounded-full object-cover" />
			<div>
				<p class="text-xs text-muted">Delivery Time</p>
				<p class="text-sm font-bold">20–30 mins</p>
			</div>
			<Clock class="h-5 w-5 text-brand" />
		</div>
		<div class="absolute right-0 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
			<img src="/images/pizza-veggie.jpg" alt="Pizza" class="h-12 w-12 rounded-full object-cover" />
			<div>
				<p class="font-display text-lg font-extrabold text-brand">50% OFF</p>
				<p class="text-xs text-muted">On Your First Order</p>
			</div>
		</div>
		<div class="absolute top-2 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
			<Heart class="h-5 w-5 fill-red-500 text-red-500" />
		</div>
	</div>
</section>

<!-- WHY CHOOSE US -->
<section id="how-it-works" class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
	<span class="absolute top-16 left-[8%] hidden h-2.5 w-2.5 rounded-full bg-brand sm:block" aria-hidden="true"></span>
	<span class="absolute top-24 right-[6%] hidden h-2 w-2 rounded-full bg-amber-400 sm:block" aria-hidden="true"></span>
	<span class="absolute bottom-24 left-[3%] hidden h-2 w-2 rounded-full bg-amber-400 sm:block" aria-hidden="true"></span>
	<p class="text-center text-xs font-bold tracking-widest text-brand uppercase">• Why Choose Us •</p>
	<h2 class="mt-2 text-center font-display text-3xl font-extrabold sm:text-4xl">
		Your Favourite Food<br />Delivery Partner
	</h2>
	<div class="mt-10 grid gap-8 sm:grid-cols-3">
		{#each [{ icon: Bike, title: 'Lightning Fast', text: 'Super quick delivery right to your door.' }, { icon: UtensilsCrossed, title: 'Wide Variety', text: 'Choose from a wide range of cuisines and dishes.' }, { icon: BadgeCheck, title: 'Top Quality', text: 'We use the freshest ingredients for the best taste.' }] as f (f.title)}
			{@const Icon = f.icon}
			<div class="relative rounded-3xl bg-white p-8 text-center shadow-sm">
				<span class="absolute top-4 right-5 h-2 w-2 rounded-full bg-brand/70" aria-hidden="true"></span>
				<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-10 w-10" />
				</span>
				<h3 class="mt-4 font-display text-lg font-bold">{f.title}</h3>
				<p class="mt-1 text-sm text-muted">{f.text}</p>
			</div>
		{/each}
	</div>
	<div class="mt-8 grid gap-4 text-center sm:grid-cols-3">
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm"><p class="font-display text-xl font-extrabold">1. Pick a dish</p><p class="text-sm text-muted">Browse the menu and add to cart.</p></div>
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm"><p class="font-display text-xl font-extrabold">2. Checkout as guest</p><p class="text-sm text-muted">No account needed — UPI, card or cash.</p></div>
		<div class="rounded-2xl bg-white px-4 py-4 shadow-sm"><p class="font-display text-xl font-extrabold">3. Hot at your door</p><p class="text-sm text-muted">Tracked delivery in 20–30 minutes.</p></div>
	</div>
</section>

<!-- MENU -->
<section id="menu" class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
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

	<div class="mt-6 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
		<CategoryRail active={activeCategory} onSelect={(c) => (activeCategory = c)} />

		<div>
			{#if visibleDishes.length === 0}
				<p class="rounded-2xl bg-white p-8 text-center text-muted">
					No dishes match “{searchQuery}”. Try another search or category.
				</p>
			{:else}
				<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each visibleDishes as dish (dish.id)}
						<DishCard {dish} />
					{/each}
				</div>
			{/if}
			<p class="mt-6 text-center">
				<a href="/menu" class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-stone-800">
					See Full Menu <ArrowRight class="h-4 w-4" />
				</a>
			</p>
		</div>
	</div>
</section>

<!-- OFFERS -->
<section id="offers" class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
	<div class="grid gap-4 sm:grid-cols-3">
		{#each HOME_OFFERS as offer (offer.code)}
			<div class="flex items-center justify-between gap-4 rounded-3xl bg-ink p-6 text-white">
				<div>
					<p class="font-display text-2xl font-extrabold">{offer.code}</p>
					<p class="text-sm text-stone-300">{offer.text}</p>
				</div>
				<button
					type="button"
					onclick={() => copyCode(offer.code)}
					class="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink hover:bg-orange-100"
				>
					<Copy class="h-4 w-4" /> {copiedCode === offer.code ? 'Copied!' : 'Copy'}
				</button>
			</div>
		{/each}
	</div>
	<p class="mt-2 text-sm text-muted">
		All codes work in the cart: FIRST50 gives 50% off, ZESTY20 gives 20% off, FREEDEL gives free delivery.
		<a href="/offers" class="font-bold text-brand hover:underline">See all offers →</a>
	</p>
</section>

<!-- TESTIMONIALS -->
<section id="about" class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
	<div class="relative mx-auto w-full max-w-md">
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
	<div>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">What Our Customers Say</p>
		<h2 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Loved By Thousands<br />Of Foodies</h2>
		<p class="mt-2 text-muted">We're proud to serve delicious food and great service every single time.</p>

		<figure class="mt-6 rounded-3xl bg-white p-6 shadow-sm">
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
		<div class="mt-4 flex items-center gap-3">
			<button
				type="button"
				aria-label="Previous testimonial"
				onclick={() => (testimonialIndex = (testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
				class="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm hover:text-brand"
			>
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button
				type="button"
				aria-label="Next testimonial"
				onclick={() => (testimonialIndex = (testimonialIndex + 1) % TESTIMONIALS.length)}
				class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow hover:bg-brand-dark"
			>
				<ChevronRight class="h-5 w-5" />
			</button>
			<span class="ml-2 text-sm text-muted">{testimonialIndex + 1} / {TESTIMONIALS.length}</span>
		</div>
	</div>
</section>

<!-- APP DOWNLOAD -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
	<div class="grid items-center gap-8 rounded-[2rem] bg-cream-dark p-8 sm:p-10 lg:grid-cols-2">
		<div>
			<p class="text-xs font-bold tracking-widest text-brand uppercase">Download Our App</p>
			<h2 class="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Get Exclusive Offers<br />On The Zesty App!</h2>
			<p class="mt-3 max-w-md text-muted">Download now and enjoy special discounts, fast delivery and easy tracking.</p>
			<div class="mt-6">
				<a
					href="/menu"
					class="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark"
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
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
		{#each [{ icon: Truck, title: 'Free Delivery', text: 'On orders over $20' }, { icon: RotateCcw, title: 'Easy Returns', text: 'Within 7 days' }, { icon: ShieldCheck, title: 'Secure Payment', text: '100% protected' }, { icon: Headphones, title: '24/7 Support', text: "We're here to help" }] as t (t.title)}
			{@const Icon = t.icon}
			<div class="flex items-start gap-3">
				<Icon class="h-7 w-7 shrink-0 text-brand" />
				<div><p class="font-bold">{t.title}</p><p class="text-sm text-muted">{t.text}</p></div>
			</div>
		{/each}
	</div>
</section>
