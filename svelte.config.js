import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // fallback to index on fail
			precompress: false,
			strict: true
		}),
		output: {
			// This inlines code, styles, and small assets into the HTML file
			bundleStrategy: 'inline'
		}
	}
};

export default config;
