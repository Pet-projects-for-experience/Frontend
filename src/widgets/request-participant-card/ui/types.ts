import { HTMLAttributes } from 'react';
export type RequestParticipantCardType = HTMLAttributes<HTMLElement> & {
	request_status: string;
	position: string;
	cover_letter: string;
	project: {
		started: string;
		ended: string;
		name: string;
		directions: [
			{
				id: number;
				name: string;
			},
		];
	};
	handleDeleteCard: (arg: number) => void;
};
