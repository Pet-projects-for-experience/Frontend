import { IProjectsRequests } from '@/services/models/IProjectsRequests';
export type InviteToProjectVacancyType = {
	handleRequestInProject: (projects: IProjectsRequests) => void;
	setCurrentText: (arg: string | undefined) => void;
	currentText: string | undefined;
	project_specialists: {
		id: number;
		specialization: string;
		speciality: string;
	};
};
