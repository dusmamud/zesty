<script lang="ts">
	import {
		ArrowRight,
		BadgeCheck,
		Bike,
		CheckCircle2,
		ChevronLeft,
		ChevronRight,
		Clock,
		Copy,
		Headphones,
		Heart,
		MapPin,
		Play,
		RotateCcw,
		Search,
		ShieldCheck,
		ShoppingCart,
		Star,
		Truck,
		UtensilsCrossed,
		Zap
	} from '@lucide/svelte';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import CheckoutModal from '#lib/components/CheckoutModal.svelte';
	import Header from '#lib/components/Header.svelte';
	import {
		CATEGORIES,
		DELIVERY_FEE,
		DISHES,
		FREE_DELIVERY_OVER,
		PROMOS,
		TESTIMONIALS,
		formatPrice,
		promoRate,
		type Dish
	} from '#lib/data.ts';

	// --- menu state ---
	let activeCategory = $state<(typeof CATEGORIES)[number]>('All');
	let searchQuery = $state('');
	let favourites = $state(new Set<string>());

	let visibleDishes = $derived(
		DISHES.filter(
			(d) =>
				(activeCategory === 'All' || d.category === activeCategory) &&
				(searchQuery.trim() === '' ||
					`${d.name} ${d.desc} ${d.category}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
		)
	);

	function toggleFavourite(id: string) {
		const next = new Set(favourites);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		favourites = next;
	}

	// --- cart state ---
	let cart = $state<Record<string, number>>({});
	let cartOpen = $state(false);
	let checkoutOpen = $state(false);
	let orderPlaced = $state<null | { id: string; payment: string }>(null);

	let promoCode = $state('');
	let promoApplied = $state<string | null>(null);
	let promoError = $state<string | null>(null);

	let cartLines = $derived(
		Object.entries(cart)
			.map(([id, qty]) => ({ dish: DISHES.find((d) => d.id === id)!, qty }))
			.filter((l) => l.dish && l.qty > 0)
	);
	let cartCount = $derived(cartLines.reduce((n, l) => n + l.qty, 0));
	let subtotal = $derived(cartLines.reduce((s, l) => s + l.dish.price * l.qty, 0));
	let discount = $derived(subtotal * promoRate(promoApplied));
	let delivery = $derived(subtotal === 0 || subtotal - discount >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE);
	let total = $derived(Math.max(0, subtotal - discount + delivery));

	function addToCart(dish: Dish) {
		cart = { ...cart, [dish.id]: (cart[dish.id] ?? 0) + 1 };
		cartOpen = true;
	}

	function changeQty(dishId: string, delta: number) {
		const qty = (cart[dishId] ?? 0) + delta;
		const next = { ...cart };
		if (qty <= 0) delete next[dishId];
		else next[dishId] = qty;
		cart = next;
	}

	function removeFromCart(dishId: string) {
		const next = { ...cart };
		delete next[dishId];
		cart = next;
	}

	function applyPromo() {
		const code = promoCode.trim();
		if (code in PROMOS) {
			promoApplied = code;
			promoError = null;
		} else {
			promoApplied = null;
			promoError = 'That code is not valid. Try FIRST50 (50% off) or ZESTY20 (20% off).';
		}
	}

	function placeOrder(details: { name: string; phone: string; address: string; payment: string }) {
		orderPlaced = { id: `ZST${Math.floor(100000 + Math.random() * 900000)}`, payment: details.payment };
		cart = {};
		promoApplied = null;
		promoCode = '';
		checkoutOpen = false;
		cartOpen = false;
	}

	// --- testimonials ---
	let testimonialIndex = $state(0);
	let testimonial = $derived(TESTIMONIALS[testimonialIndex]);

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

<div id="top" class="min-h-screen bg-cream font-body text-ink">
	<Header
		cartCount={cartCount}
		searchQuery={searchQuery}
		onCartOpen={() => (cartOpen = true)}
		onSearch={(v) => (searchQuery = v)}
	/>

	<main>
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
						href="#menu"
						class="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 hover:bg-brand-dark"
					>
						Order Now <ArrowRight class="h-5 w-5" />
					</a>
					<a href="#how-it-works" class="inline-flex items-center gap-2 font-bold hover:text-brand">
						<span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink">
							<Play class="h-4 w-4 fill-current" />
						</span>
						Watch Video
					</a>
				</div>
				<div class="mt-8 flex items-center gap-3">
					<div class="flex -space-x-2">
						<img src="/images/salad-bowl.jpg" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
						<img src="/images/burger-cheese.jpg" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
						<img src="/images/pizza-veggie.jpg" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
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
					src="/images/hero.jpg"
					alt="Fresh salad bowl"
					class="aspect-square w-full rounded-full object-cover shadow-xl"
				/>
				<div class="absolute top-8 -left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8">
					<Clock class="h-6 w-6 text-brand" />
					<div>
						<p class="text-xs text-muted">Delivery Time</p>
						<p class="text-sm font-bold">20–30 mins</p>
					</div>
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
		<section id="how-it-works" class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
			<p class="text-center text-xs font-bold tracking-widest text-brand uppercase">• Why Choose Us •</p>
			<h2 class="mt-2 text-center font-display text-3xl font-extrabold sm:text-4xl">
				Your Favourite Food<br />Delivery Partner
			</h2>
			<div class="mt-10 grid gap-8 sm:grid-cols-3">
				{#each [{ icon: Bike, title: 'Lightning Fast', text: 'Super quick delivery right to your door.' }, { icon: UtensilsCrossed, title: 'Wide Variety', text: 'Choose from a wide range of cuisines and dishes.' }, { icon: BadgeCheck, title: 'Top Quality', text: 'We use the freshest ingredients for the best taste.' }] as f (f.title)}
					{@const Icon = f.icon}
					<div class="rounded-3xl bg-white p-8 text-center shadow-sm">
						<span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-brand">
							<Icon class="h-8 w-8" />
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

			<div class="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
				{#each CATEGORIES as cat (cat)}
					<button
						type="button"
						role="tab"
						aria-selected={activeCategory === cat}
						onclick={() => (activeCategory = cat)}
						class="rounded-full px-5 py-2.5 text-sm font-bold {activeCategory === cat
							? 'bg-brand text-white shadow'
							: 'bg-white text-stone-700 shadow-sm hover:text-brand'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			{#if visibleDishes.length === 0}
				<p class="mt-10 rounded-2xl bg-white p-8 text-center text-muted">
					No dishes match “{searchQuery}”. Try another search or category.
				</p>
			{:else}
				<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each visibleDishes as dish (dish.id)}
						<article class="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl">
							<div class="relative">
								<img src={dish.image} alt={dish.name} loading="lazy" class="h-52 w-full object-cover" />
								{#if dish.discount}
									<span class="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">
										{dish.discount}
									</span>
								{/if}
								<button
									type="button"
									aria-label={favourites.has(dish.id) ? `Remove ${dish.name} from favourites` : `Save ${dish.name} as favourite`}
									aria-pressed={favourites.has(dish.id)}
									onclick={() => toggleFavourite(dish.id)}
									class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow"
								>
									<Heart
										class="h-4.5 w-4.5 {favourites.has(dish.id) ? 'fill-red-500 text-red-500' : 'text-stone-500'}"
									/>
								</button>
								<span
									class="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold"
									title={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
								>
									<span class="flex h-3.5 w-3.5 items-center justify-center border-2 {dish.veg ? 'border-green-600' : 'border-red-600'}">
										<span class="h-1.5 w-1.5 rounded-full {dish.veg ? 'bg-green-600' : 'bg-red-600'}"></span>
									</span>
									{dish.veg ? 'Veg' : 'Non-veg'}
								</span>
							</div>
							<div class="p-4">
								<h3 class="font-display text-lg font-bold">{dish.name}</h3>
								<p class="mt-1 line-clamp-2 min-h-10 text-sm text-muted">{dish.desc}</p>
								<p class="mt-2 flex items-center gap-1 text-sm">
									<Star class="h-4 w-4 fill-amber-400 text-amber-400" />
									<span class="font-bold">{dish.rating.toFixed(1)}</span>
									<span class="text-muted">({dish.reviews})</span>
									<span class="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-brand">{dish.category}</span>
								</p>
								<div class="mt-3 flex items-center justify-between">
									<p class="font-display text-xl font-extrabold">
										{formatPrice(dish.price)}
										{#if dish.oldPrice}
											<span class="ml-1 text-sm font-medium text-muted line-through">{formatPrice(dish.oldPrice)}</span>
										{/if}
									</p>
									<button
										type="button"
										onclick={() => addToCart(dish)}
										class="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark"
									>
										Order Now
									</button>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>

		<!-- OFFERS -->
		<section id="offers" class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
			<div class="grid gap-4 sm:grid-cols-2">
				{#each [{ code: 'FIRST50', text: '50% off your first order' }, { code: 'ZESTY20', text: '20% off orders over $15 — use at checkout' }] as offer (offer.code)}
					<div class="flex items-center justify-between gap-4 rounded-3xl bg-ink p-6 text-white">
						<div>
							<p class="font-display text-2xl font-extrabold">{offer.code}</p>
							<p class="text-sm text-stone-300">{offer.text}</p>
						</div>
						<button
							type="button"
							onclick={() => copyCode(offer.code)}
							class="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink hover:bg-orange-100"
						>
							<Copy class="h-4 w-4" /> {copiedCode === offer.code ? 'Copied!' : 'Copy'}
						</button>
					</div>
				{/each}
			</div>
			<p class="mt-2 text-sm text-muted">Both codes work in the cart: FIRST50 gives 50% off, ZESTY20 gives 20% off.</p>
		</section>

		<!-- TESTIMONIALS -->
		<section id="about" class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
			<div class="relative mx-auto w-full max-w-md">
				<div class="absolute inset-0 -z-10 rounded-full bg-brand"></div>
				<img src="/images/burger-cheese.jpg" alt="Happy customer with a burger" class="aspect-square w-full rounded-full object-cover" />
				<div class="absolute bottom-6 left-0 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg">
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
					<figcaption class="mt-4">
						<p class="font-bold">{testimonial.name}</p>
						<p class="text-sm text-muted">{testimonial.role}</p>
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
					<div class="mt-6 flex flex-wrap gap-3">
						<a href="#top" class="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white">Get it on Google Play</a>
						<a href="#top" class="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white">Download on the App Store</a>
					</div>
				</div>
				<div class="mx-auto w-64 rounded-[2rem] border-8 border-ink bg-white p-4 shadow-xl">
					<p class="font-display text-lg font-extrabold">Hi, Alex 👋</p>
					<p class="text-sm text-muted">What would you like to eat today?</p>
					<p class="mt-3 rounded-xl bg-brand px-3 py-2 text-center text-sm font-bold text-white">50% OFF on First Order</p>
					<img src="/images/salad-bowl.jpg" alt="Fresh bowl in the app" class="mt-3 h-32 w-full rounded-xl object-cover" />
					<p class="mt-3 text-sm font-bold">Popular Near You</p>
					<p class="text-xs text-muted">Pizza • Burgers • Noodles • Drinks</p>
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
	</main>

	<!-- FOOTER -->
	<footer class="bg-white">
		<div class="mx-auto grid max-w-7xl gap-8 border-t px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
			<div>
				<p class="flex items-center gap-2 font-display text-xl font-extrabold">
					<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
						<UtensilsCrossed class="h-4.5 w-4.5" />
					</span>
					Zesty
				</p>
				<p class="mt-2 text-sm text-muted">Good food. Fast delivery.<br />Every time you order.</p>
				<p class="mt-3 flex items-center gap-1.5 text-sm text-muted"><MapPin class="h-4 w-4" /> 123 Food Street, Flavortown</p>
			</div>
			<div>
				<h3 class="font-bold">Company</h3>
				<ul class="mt-3 space-y-2 text-sm text-muted">
					<li><a href="#about" class="hover:text-brand">About Us</a></li>
					<li><a href="#top" class="hover:text-brand">Careers</a></li>
					<li><a href="#top" class="hover:text-brand">Blog</a></li>
					<li><a href="#top" class="hover:text-brand">Press</a></li>
				</ul>
			</div>
			<div>
				<h3 class="font-bold">Support</h3>
				<ul class="mt-3 space-y-2 text-sm text-muted">
					<li><a href="#top" class="hover:text-brand">FAQ</a></li>
					<li><a href="#top" class="hover:text-brand">Shipping</a></li>
					<li><a href="#top" class="hover:text-brand">Returns</a></li>
					<li><a href="#top" class="hover:text-brand">Privacy Policy</a></li>
				</ul>
			</div>
			<div>
				<h3 class="font-bold">For Restaurants</h3>
				<ul class="mt-3 space-y-2 text-sm text-muted">
					<li><a href="#top" class="hover:text-brand">Partner With Us</a></li>
					<li><a href="#top" class="hover:text-brand">Add Your Restaurant</a></li>
					<li><a href="#top" class="hover:text-brand">Manage Orders</a></li>
				</ul>
			</div>
			<div>
				<h3 class="font-bold">Newsletter</h3>
				<p class="mt-3 text-sm text-muted">Subscribe for latest offers.</p>
				<form
					class="mt-3 flex overflow-hidden rounded-full border focus-within:border-brand"
					onsubmit={(e) => e.preventDefault()}
				>
					<input type="email" required placeholder="Enter your email" aria-label="Email for newsletter" class="min-w-0 flex-1 px-4 py-2.5 text-sm outline-none" />
					<button type="submit" aria-label="Subscribe" class="bg-brand px-4 text-white hover:bg-brand-dark">
						<ArrowRight class="h-4 w-4" />
					</button>
				</form>
			</div>
		</div>
		<p class="border-t py-4 text-center text-xs text-muted">© 2026 Zesty. Demo frontend — no real orders or payments.</p>
	</footer>

	<!-- STICKY MOBILE CART BAR -->
	{#if cartCount > 0 && !cartOpen}
		<button
			type="button"
			onclick={() => (cartOpen = true)}
			class="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-brand px-5 py-3.5 font-bold text-white shadow-xl lg:hidden"
		>
			<span class="flex items-center gap-2"><ShoppingCart class="h-5 w-5" /> {cartCount} item{cartCount === 1 ? '' : 's'} in cart</span>
			<span>{formatPrice(total)} • View Cart</span>
		</button>
	{/if}

	{#if cartOpen}
		<CartDrawer
			lines={cartLines}
			promoCode={promoCode}
			promoApplied={promoApplied}
			promoError={promoError}
			onClose={() => (cartOpen = false)}
			onQty={changeQty}
			onRemove={removeFromCart}
			onPromoCode={(v) => (promoCode = v)}
			onApplyPromo={applyPromo}
			onCheckout={() => {
				cartOpen = false;
				checkoutOpen = true;
			}}
		/>
	{/if}

	{#if checkoutOpen}
		<CheckoutModal total={total} onClose={() => (checkoutOpen = false)} onPlaceOrder={placeOrder} />
	{/if}

	{#if orderPlaced}
		<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-label="Order confirmed">
			<div class="relative w-full max-w-md rounded-t-3xl bg-white p-6 text-center shadow-2xl sm:rounded-3xl">
				<CheckCircle2 class="mx-auto h-14 w-14 text-green-600" />
				<h2 class="mt-3 font-display text-2xl font-extrabold">Order confirmed!</h2>
				<p class="mt-1 text-muted">Order <span class="font-bold text-ink">{orderPlaced.id}</span> • Paid via {orderPlaced.payment}</p>
				<div class="mt-5 space-y-2 text-left text-sm">
					<p class="flex items-center gap-2"><CheckCircle2 class="h-4 w-4 text-green-600" /> Order received</p>
					<p class="flex items-center gap-2"><CheckCircle2 class="h-4 w-4 text-green-600" /> Restaurant is preparing your food</p>
					<p class="flex items-center gap-2 text-muted"><Clock class="h-4 w-4" /> Rider on the way — arriving in 20–30 mins</p>
				</div>
				<button
					type="button"
					onclick={() => (orderPlaced = null)}
					class="mt-6 w-full rounded-full bg-brand py-3 font-bold text-white hover:bg-brand-dark"
				>
					Back to Menu
				</button>
			</div>
		</div>
	{/if}
</div>
