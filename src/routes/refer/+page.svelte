<script lang="ts">
	import { CheckCircle2, Copy, Gift, Share2, Users } from '@lucide/svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { showToast } from '#lib/store.svelte.ts';
	import { REFERRAL_CODE, REFERRAL_REWARD, REFERRALS } from '#lib/data.ts';

	let copied = $state(false);

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(REFERRAL_CODE);
		} catch {
			// Clipboard unavailable — code is still visible on screen.
		}
		copied = true;
		showToast(`Code ${REFERRAL_CODE} copied`);
		setTimeout(() => (copied = false), 2000);
	}

	async function share() {
		const text = `Order food on Zesty with my code ${REFERRAL_CODE} — you get 50% off your first order!`;
		if (typeof navigator !== 'undefined' && navigator.share) {
			try {
				await navigator.share({ title: 'Zesty — Refer & Earn', text, url: 'https://zeesty.pages.dev' });
				return;
			} catch {
				// Share cancelled — fall through to copy.
			}
		}
		try {
			await navigator.clipboard.writeText(`${text} https://zeesty.pages.dev`);
			showToast('Invite link copied — share it anywhere');
		} catch {
			showToast('Copy the code above to share it');
		}
	}
</script>

<svelte:head>
	<title>Refer &amp; Earn — Zesty</title>
	<meta
		name="description"
		content="Invite friends to Zesty: you get $5 credit, they get 50% off their first order. Share your personal code."
	/>
	<Seo
		title="Refer & Earn — Zesty"
		description="Invite friends to Zesty: you get $5 credit, they get 50% off their first order. Share your personal code."
		path="/refer"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
	<div use:reveal>
		<p class="text-xs font-bold tracking-widest text-orange-700 uppercase">Refer &amp; Earn</p>
		<h1 class="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Give 50% Off, Get $5</h1>
		<p class="mt-2 max-w-xl text-muted">{REFERRAL_REWARD}. Your credit lands in your wallet when your friend's first order is delivered.</p>
	</div>

	<div class="mt-8 rounded-3xl bg-ink p-8 text-center text-white shadow-sm" use:reveal>
		<p class="text-sm font-bold tracking-widest text-orange-300 uppercase">Your personal code</p>
		<p class="mt-2 font-display text-4xl font-extrabold tracking-wider">{REFERRAL_CODE}</p>
		<div class="mt-5 flex flex-wrap justify-center gap-3">
			<button
				type="button"
				onclick={copyCode}
				class="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition-transform duration-150 hover:bg-brand-dark active:scale-95"
			>
				{#if copied}<CheckCircle2 class="h-4 w-4" /> Copied!{:else}<Copy class="h-4 w-4" /> Copy code{/if}
			</button>
			<button
				type="button"
				onclick={share}
				class="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition-transform duration-150 hover:bg-stone-100 active:scale-95"
			>
				<Share2 class="h-4 w-4" /> Share invite
			</button>
		</div>
		<p class="mt-4 text-xs text-stone-400">Demo programme — codes and credits are not real money.</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		{#each [{ icon: Users, title: '1. Share your code', text: 'Send it to friends on WhatsApp, SMS or social media.' }, { icon: Gift, title: '2. Friend gets 50% off', text: 'They use your code on their first order — no minimum spend.' }, { icon: CheckCircle2, title: '3. You get $5 credit', text: 'Credit lands in your wallet once their order is delivered.' }] as step, i (step.title)}
			{@const Icon = step.icon}
			<div class="rounded-3xl bg-white p-6 shadow-sm" use:reveal={{ delay: i * 100 }}>
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-brand">
					<Icon class="h-6 w-6" />
				</span>
				<h2 class="mt-3 font-display text-lg font-bold">{step.title}</h2>
				<p class="mt-1 text-sm text-muted">{step.text}</p>
			</div>
		{/each}
	</div>

	<div class="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8" use:reveal>
		<h2 class="font-display text-xl font-bold">Your referrals</h2>
		<ul class="mt-4 divide-y divide-orange-100">
			{#each REFERRALS as r (r.name)}
				<li class="flex flex-wrap items-center justify-between gap-2 py-3">
					<span class="font-bold">{r.name}</span>
					<span class="text-sm text-muted">{r.status}</span>
					<span class="rounded-full px-3 py-1 text-xs font-bold {r.status === 'Ordered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
						{r.reward}
					</span>
				</li>
			{/each}
		</ul>
		<p class="mt-2 text-xs text-muted">Demo list — sample friends, not real accounts.</p>
		<div class="mt-5 flex flex-wrap gap-3">
			<a href="/wallet" class="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">See my wallet →</a>
			<a href="/rewards" class="rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-sm hover:text-brand">Zesty Rewards →</a>
		</div>
	</div>
</div>
