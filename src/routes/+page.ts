import type { PageLoad } from '/$types';
import { loadDecksInfo } from '$lib/deck';

export const ssr = false;

export const load: PageLoad = ({ depends }) => {
	depends('app:decks');
	const decks = loadDecksInfo();
	return { decks: decks };
};
