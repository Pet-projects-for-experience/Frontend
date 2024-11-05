export interface ProjectSpecialist {
	profession: number;
	skills: string;
	count: number;
	level: number;
	is_required: boolean;
}

export interface Project {
	name: string;
	description: string;
	started: string;
	ended: string;
	busyness: number;
	directions: string[];
	link: string;
	phone_number: string;
	telegram_nick: string;
	email: string;
	project_specialists: ProjectSpecialist[];
	status: number;
}
