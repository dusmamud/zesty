<script lang="ts">
	import { CheckCircle2, Clock, Mail, MapPin } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let submitted = $state(false);
	let error = $state('');

	function submit() {
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (message.trim().length < 5) {
			error = 'Please write a short message.';
			return;
		}
		error = '';
		submitted = true;
	}
</script>

<svelte:head>
	<title>Contact Us — Zesty</title>
	<meta
		name="description"
		content="Contact Zesty — send us a message about an order, feedback, or anything else. Open 10am–11pm, 7 days."
	/>
</svelte:head>

<div class="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-brand uppercase">Contact Us</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">We'd Love To Hear From You</h1>
		<p class="mt-2 max-w-xl text-muted">Order issue, feedback, or just hungry? Reach us any time.</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-2">
		<div class="space-y-4" use:reveal>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm">
				<MapPin class="h-6 w-6 shrink-0 text-brand" />
				<div>
					<h2 class="font-display font-bold">Our kitchen</h2>
					<p class="text-sm text-muted">Delivery-only kitchen<br />Open 10:00 AM – 11:00 PM, 7 days a week</p>
				</div>
			</div>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm">
				<Mail class="h-6 w-6 shrink-0 text-brand" />
				<div>
					<h2 class="font-display font-bold">Message us</h2>
					<p class="text-sm text-muted">Use the form on this page — we reply within a day.</p>
				</div>
			</div>
			<div class="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm">
				<Clock class="h-6 w-6 shrink-0 text-brand" />
				<div>
					<h2 class="font-display font-bold">Delivery hours</h2>
					<p class="text-sm text-muted">10:00 AM – 11:00 PM daily • Average delivery 20–30 minutes</p>
				</div>
			</div>
		</div>

		<div class="rounded-3xl bg-white p-7 shadow-sm" use:reveal={{ delay: 100 }}>
			{#if submitted}
				<div class="flex h-full flex-col items-center justify-center py-8 text-center">
					<CheckCircle2 class="h-14 w-14 text-green-600" />
					<h2 class="mt-3 font-display text-2xl font-extrabold">Message sent!</h2>
					<p class="mt-1 max-w-sm text-sm text-muted">
						Thanks, {name.trim()} — we'll get back to you at {email.trim()} within a day.
					</p>
					<p class="mt-3 text-xs text-muted">Demo form — no message is sent anywhere.</p>
				</div>
			{:else}
				<h2 class="font-display text-xl font-bold">Send us a message</h2>
				<div class="mt-5 space-y-3">
					<div>
						<label for="ct-name" class="text-sm font-semibold">Your name</label>
						<input id="ct-name" type="text" bind:value={name} placeholder="e.g. Aarav Patel" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="ct-email" class="text-sm font-semibold">Email</label>
						<input id="ct-email" type="email" bind:value={email} placeholder="you@example.com" class="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand" />
					</div>
					<div>
						<label for="ct-message" class="text-sm font-semibold">Message</label>
						<textarea id="ct-message" rows="4" bind:value={message} placeholder="How can we help?" class="mt-1 w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand"></textarea>
					</div>
					{#if error}
						<p role="alert" class="text-sm font-semibold text-red-600">{error}</p>
					{/if}
					<button
						type="button"
						onclick={submit}
						class="w-full rounded-full bg-brand py-3.5 font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
					>
						Send Message
					</button>
					<p class="text-center text-xs text-muted">Demo form — no message is sent anywhere.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
