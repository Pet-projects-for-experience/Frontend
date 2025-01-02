export type VacancyCardType = {
	idSpecialty: number;
	name: string;
	title: string;
	skills: { id: number; name: string }[];
	count: number;
	projectId: number;
	specialists: {
		id: number;
		specialization: string;
		speciality: string;
	};
};
