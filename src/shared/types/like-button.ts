export type LikeButtonType = {
	id: never;
	name: string;
	description: string;
	started: string;
	ended: string;
	busyness: number;
	directions: [
		{
			id: number;
			name: string;
		},
	];
	link?: string;
	phone_number?: string;
	telegram_nick?: string;
	email?: string;
	project_specialists: [
		{
			id: number;
			profession: {
				id: number;
				specialization: string;
				speciality: string;
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
	project_status: string;
	variant: 'primary' | 'secondary' | 'trivial';
	disabled?: boolean;
	favorite: boolean;
};
