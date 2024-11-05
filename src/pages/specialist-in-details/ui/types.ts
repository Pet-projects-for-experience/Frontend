export type SpecialistInfoQueryType = {
	avatar: string;
	username: string;
	name: string;
	ready_to_participate: boolean;
	specialists: [
		{
			id: number;
			profession: {
				id: number;
				speciality: string;
				specialization: string;
			};
			level: number;
			skills: [{ id: number; name: string }];
		},
		{
			id: number;
			profession: {
				id: number;
				speciality: string;
				specialization: string;
			};
			level: number;
			skills: [{ id: number; name: string }];
		},
	];
	about: string;
	portfolio_link: string;
	birthday: number;
	country: string;
	city: string;
	phone_number: string;
	telegram_nick: string;
	email: string;
	projects: [{ id: number; name: string }];
};
