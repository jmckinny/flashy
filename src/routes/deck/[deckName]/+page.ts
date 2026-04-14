import { loadDeck } from '$lib/deck';
import type { PageLoad } from '/$types';
import { error } from '@sveltejs/kit';

export const ssr = false;

export const load: PageLoad = ({ params }) => {
	const deckName = params.deckName;
	if (!deckName) {
		throw error(404, 'Not found');
	}
	try {
		const cards = loadDeck(deckName);
		return {
			deckName: deckName,
			cards: cards
		};
	} catch (e) {
		console.error(e);
		throw error(404, 'Not found');
	}
};
