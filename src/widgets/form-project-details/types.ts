export type ProjectCardDetailType = {
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
	link: string;
	owner: {
		avatar: string;
		id: number;
		name: string;
		username: string;
	};
	status: string;
	recruitment_status?: string;
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
			count: number;
			level: string;
		},
	];
};
