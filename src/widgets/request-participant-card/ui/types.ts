import { HTMLAttributes } from 'react';
export type RequestParticipantCardType = HTMLAttributes<HTMLElement> & {
	request_status: string;
	project: {
		started: string;
		ended: string;
		name: string;
	};
};
