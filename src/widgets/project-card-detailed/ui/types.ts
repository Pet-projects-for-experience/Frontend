import { HTMLAttributes } from 'react';
export type ProjectCardDetailType = HTMLAttributes<HTMLElement> & {
	idProject: number | never;
	name: string;
	description: string;
	started: string;
	ended: string;
	directions: [
		{
			id: number;
			name: string;
		},
	];
	busyness: number;
	phone_number: string;
	telegram_nick?: string;
	email?: string;
	link: string;
	owner: {
		avatar: string;
		id: number;
		name: string;
		username: string;
		visible_status: number;
	};
	project_status: string;
	recruitment_status?: string;
	is_favorite: boolean;
	project_specialists: [
		{
			id: number;
			profession: {
				id: number;
				specialization: string;
				specialty: string;
			};
			skills: {
				id: number;
				name: string;
			}[];
			count?: number;
				level?: number;
				is_required?: boolean;	
		},
	];
	unique_project_participants_skills: string[];
	project_participants: [
		{
			id: number;
			user_id: number;
			avatar: string;
			profession: {
				id: number;
				specialty: string;
				specialization: string;
				visible_status: number;
			};
		},
	];
};
