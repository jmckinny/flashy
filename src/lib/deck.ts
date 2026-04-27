export const LINE_DELIM = '|';
export const ROW_DELIM = '\t';

export interface Card {
	question: string;
	answer: string;
}

export interface DeckInfo {
	name: string;
	cardCount: number;
}

export function loadDecksInfo(): DeckInfo[] {
	const deckList = localStorage.getItem('decks');
	const decks = (deckList ? JSON.parse(deckList) : []) ?? [];
	return decks;
}

export function loadDeck(deckName: string): Card[] {
	const deckJson = localStorage.getItem(deckName);
	if (!deckJson) {
		throw new Error('Failed to load deck: ' + deckName);
	}
	const deck = JSON.parse(deckJson);
	return deck;
}

export function updateDeck(deckName: string, cards: Card[]) {
	const decksInfo = loadDecksInfo();
	const index = decksInfo.findIndex((d) => d.name === deckName);
	if (index < 0) {
		throw new Error('Failed to find deck with name: ' + deckName);
	}
	const deckInfo = decksInfo[index];
	deckInfo.cardCount = cards.length;

	localStorage.setItem('decks', JSON.stringify(decksInfo));
	localStorage.setItem(deckName, JSON.stringify(cards));
}

export function addNewDeck(deckName: string, cards: Card[]) {
	const decksInfo = loadDecksInfo();
	const deckInfoExists = decksInfo.find((d) => d.name === deckName);
	const deckExists = localStorage.getItem(deckName);

	if (deckInfoExists || deckExists) {
		throw new Error('Deck already exists with name: ' + deckName);
	}

	decksInfo.push({ name: deckName, cardCount: cards.length });

	localStorage.setItem('decks', JSON.stringify(decksInfo));
	localStorage.setItem(deckName, JSON.stringify(cards));
}

export function deleteDeck(deckName: string) {
	let decksInfo = loadDecksInfo();
	const deckInfoExists = decksInfo.find((d) => d.name === deckName);
	const deckExists = localStorage.getItem(deckName);

	if (!deckInfoExists || !deckExists) {
		throw new Error("Deck doesn't exists with name: " + deckName);
	}

	decksInfo = decksInfo.filter((d) => d.name !== deckName);
	localStorage.removeItem(deckName);
	localStorage.setItem('decks', JSON.stringify(decksInfo));
}

export function deckToCSV(
	deckName: string,
	rowDelim: string = ROW_DELIM,
	lineDelim: string = LINE_DELIM
): string {
	const deck = loadDeck(deckName);
	return deck.map((card) => `${card.question}${rowDelim}${card.answer}`).join(lineDelim);
}
