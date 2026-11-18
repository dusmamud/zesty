import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Static site: every route is prerendered at build time, no server runtime.
			// Fallback '404.html' is the SPA shell Cloudflare Pages serves (with a
			// 404 status) for unknown paths, so our branded +error.svelte renders
			// there. Build strictness is unchanged: a missing prerendered route
			// still fails the build (strict: true).
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true
			})
		})
	]
});
