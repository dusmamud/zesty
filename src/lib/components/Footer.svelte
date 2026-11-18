<script lang="ts">
	import { ArrowRight, CheckCircle2, UtensilsCrossed } from '@lucide/svelte';
	import { store, subscribeNewsletter } from '#lib/store.svelte.ts';

	let email = $state('');

	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim().length > 3 && email.includes('@')) {
			subscribeNewsletter();
		}
	}
</script>

<footer class="bg-white">
	<div class="mx-auto grid max-w-[1440px] gap-8 border-t px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
		<div>
			<a href="/" class="flex items-center gap-2 font-display text-xl font-extrabold">
				<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
					<UtensilsCrossed class="h-4.5 w-4.5" />
				</span>
				Zesty
			</a>
			<p class="mt-2 text-sm text-muted">Good food. Fast delivery.<br />Every time you order.</p>
		</div>
		<div>
			<h3 class="font-bold">Company</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/about" class="hover:text-brand">About Us</a></li>
				<li><a href="/careers" class="hover:text-brand">Careers</a></li>
				<li><a href="/blog" class="hover:text-brand">Blog</a></li>
				<li><a href="/reviews" class="hover:text-brand">Reviews</a></li>
				<li><a href="/rewards" class="hover:text-brand">Rewards</a></li>
				<li><a href="/contact" class="hover:text-brand">Contact Us</a></li>
			</ul>
		</div>
		<div>
			<h3 class="font-bold">Support</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/help" class="hover:text-brand">Help Centre</a></li>
				<li><a href="/faq" class="hover:text-brand">FAQ</a></li>
				<li><a href="/help" class="hover:text-brand">Shipping</a></li>
				<li><a href="/help" class="hover:text-brand">Returns</a></li>
				<li><a href="/privacy" class="hover:text-brand">Privacy Policy</a></li>
				<li><a href="/terms" class="hover:text-brand">Terms</a></li>
			</ul>
		</div>
		<div>
			<h3 class="font-bold">For Restaurants</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/partner" class="hover:text-brand">Partner With Us</a></li>
				<li><a href="/partner" class="hover:text-brand">Add Your Restaurant</a></li>
				<li><a href="/orders" class="hover:text-brand">Manage Orders</a></li>
				<li><a href="/catering" class="hover:text-brand">Catering</a></li>
				<li><a href="/delivery-areas" class="hover:text-brand">Delivery Areas</a></li>
			</ul>
		</div>
		<div>
			<h3 class="font-bold">Newsletter</h3>
			<p class="mt-3 text-sm text-muted">Subscribe for latest offers.</p>
			{#if store.newsletterSubscribed}
				<p class="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-sm font-semibold text-green-700">
					<CheckCircle2 class="h-4 w-4 shrink-0" /> You're subscribed — tasty offers are on the way!
				</p>
			{:else}
				<form
					class="mt-3 flex overflow-hidden rounded-full border focus-within:border-brand"
					onsubmit={subscribe}
				>
					<input
						type="email"
						required
						bind:value={email}
						placeholder="Enter your email"
						aria-label="Email for newsletter"
						class="min-w-0 flex-1 px-4 py-2.5 text-sm outline-none"
					/>
					<button type="submit" aria-label="Subscribe" class="bg-brand px-4 text-white hover:bg-brand-dark">
						<ArrowRight class="h-4 w-4" />
					</button>
				</form>
			{/if}
		</div>
	</div>
	<p class="border-t py-4 text-center text-xs text-muted">
		<a href="/gift-cards" class="hover:text-brand">Gift Cards</a> •
		<a href="/app" class="hover:text-brand">Get the App</a> •
		<a href="/account" class="hover:text-brand">My Account</a> •
		<a href="/delivery-areas" class="hover:text-brand">Delivery Areas</a>
	</p>
	<p class="border-t py-4 text-center text-xs text-muted">© 2026 Zesty. All rights reserved.</p>
</footer>
