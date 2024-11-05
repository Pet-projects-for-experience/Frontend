export type SpecialistCardType = {
	userId: number;
	avatar: string;
	userName: string;
	name: string;
	readyToParticipate: boolean;
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
			id?: number;
			profession?: {
				id?: number;
				speciality?: string;
				specialization?: string;
			};
			level?: number;
			skills?: [{ id: number; name: string }];
		},
	];
};
