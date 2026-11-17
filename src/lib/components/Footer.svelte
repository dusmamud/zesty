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
			<div class="mt-4 flex items-center gap-2">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Zesty on Facebook"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:bg-brand"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true"
						><path
							d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
						/></svg
					>
				</a>
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Zesty on Instagram"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:bg-brand"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
						><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.25" /><circle
							cx="17.4"
							cy="6.6"
							r="1.1"
							fill="currentColor"
							stroke="none"
						/></svg
					>
				</a>
				<a
					href="https://x.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Zesty on X"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:bg-brand"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true"
						><path
							d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
						/></svg
					>
				</a>
				<a
					href="https://youtube.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Zesty on YouTube"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white hover:bg-brand"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true"
						><path
							d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
						/></svg
					>
				</a>
			</div>
		</div>
		<div>
			<h3 class="font-bold">Company</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/about" class="hover:text-brand">About Us</a></li>
				<li><a href="/careers" class="hover:text-brand">Careers</a></li>
				<li><a href="/blog" class="hover:text-brand">Blog</a></li>
				<li><a href="/blog" class="hover:text-brand">Press</a></li>
				<li><a href="/contact" class="hover:text-brand">Contact Us</a></li>
			</ul>
		</div>
		<div>
			<h3 class="font-bold">Support</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/faq" class="hover:text-brand">FAQ</a></li>
				<li><a href="/faq" class="hover:text-brand">Shipping</a></li>
				<li><a href="/faq" class="hover:text-brand">Returns</a></li>
				<li><a href="/privacy" class="hover:text-brand">Privacy Policy</a></li>
				<li><a href="/terms" class="hover:text-brand">Terms</a></li>
			</ul>
		</div>
		<div>
			<h3 class="font-bold">For Restaurants</h3>
			<ul class="mt-3 space-y-2 text-sm text-muted">
				<li><a href="/partner" class="hover:text-brand">Partner With Us</a></li>
				<li><a href="/partner" class="hover:text-brand">Add Your Restaurant</a></li>
				<li><a href="/partner" class="hover:text-brand">Manage Orders</a></li>
				<li><a href="/blog" class="hover:text-brand">Resources</a></li>
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
	<p class="border-t py-4 text-center text-xs text-muted">© 2026 Zesty. All rights reserved.</p>
</footer>
