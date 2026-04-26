<script lang="ts">
	import { FileIcon } from '@lucide/svelte';
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
	import { addNewDeck, loadDecksInfo } from '$lib/deck';
	// eslint-disable-next-line no-useless-assignment
	let { decks = $bindable() } = $props();

	const LINE_DELIM = '|';
	const ROW_DELIM = '\t';

	async function onFileAccept(details: FileAcceptDetails): Promise<void> {
		for (let file of details.files) {
			const fileName: string = file.name;
			const deckName = fileName.replace(/.csv$/, '');
			let fileText: string = await file.text();
			if (fileText.endsWith(LINE_DELIM)) {
				fileText = fileText.slice(0, -1); // Drop last delim if any
			}
			const deck = fileText
				.trim()
				.split(LINE_DELIM)
				.map((line) => {
					const lineSplit = line.split(ROW_DELIM);
					return { question: lineSplit[0], answer: lineSplit[1] };
				});
			console.log('Adding New deck', deckName);
			addNewDeck(deckName, deck);
		}
		decks = loadDecksInfo();
	}
</script>

<FileUpload accept="text/csv" {onFileAccept}>
	<!-- <FileUpload.Label>Upload your files</FileUpload.Label> -->
	<FileUpload.Dropzone>
		<FileIcon class="size-10" />
		<span>Select file or drag here.</span>
		<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
	<FileUpload.ItemGroup>
		<FileUpload.Context>
			{#snippet children(fileUpload)}
				{#each fileUpload().acceptedFiles as file (file.name)}
					<FileUpload.Item {file}>
						<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
						<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
						<FileUpload.ItemDeleteTrigger />
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>
	<FileUpload.ClearTrigger>Clear Files</FileUpload.ClearTrigger>
</FileUpload>
