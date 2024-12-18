import { HTMLAttributes } from 'react';
export type RequestOrganizerCardType = HTMLAttributes<HTMLElement> & {
	cover_letter: string;
	is_viewed?: boolean;
	position: {
		is_required: boolean;
		profession: {
			id: number;
			speciality: string;
			specialization: string;
		};
	};
	project: {
		name: string;
		directions: [
			{
				id: number;
				name: string;
			},
		];
	};
	request_participants: {
		avatar: string;
		name: string;
		ready_to_participate: boolean;
		username: string;
	};
	request_status?: string;
};