import { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLElement> & {
	id: number,
	started: string;
	ended: string;
	name: string;
	directions: [
		{
			id: number;
			name: string;
		},
	];
	project_specialists: [
		{
			id: number;
			profession: {
				id: number;
				specialization: string;
				speciality: string;
			};
		},
	];
};
