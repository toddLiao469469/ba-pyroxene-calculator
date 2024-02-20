import { z } from 'zod';

import releaseNoteData from './release-note.json';

export enum ReleaseNoteType {
	Fix = 'FIX',
	Feature = 'FEATURE',
	Data = 'DATA',
	Improvement = 'IMPROVEMENT'
}
const releaseNoteDescriptionSchema = z.object({
	type: z.nativeEnum(ReleaseNoteType),
	content: z.string()
});

const releaseNoteSchema = z.object({
	version: z.string(),
	releaseDate: z.string(),
	descriptions: z.array(releaseNoteDescriptionSchema)
});

const releaseNotesSchema = z.array(releaseNoteSchema);

type ReleaseNotesDescription = z.infer<typeof releaseNotesSchema>;

export const validateReleaseNote = (data: unknown): data is ReleaseNotesDescription => {
	try {
		releaseNotesSchema.parse(data);
		return true;
	} catch (error) {
		console.error(error, 'Release note data is invalid');
		return false;
	}
};

const getReleaseNotes = () => {
	if (validateReleaseNote(releaseNoteData)) {
		return releaseNoteData;
	}
	throw new Error('Event data is invalid');
};

export const releaseNotes = getReleaseNotes();
