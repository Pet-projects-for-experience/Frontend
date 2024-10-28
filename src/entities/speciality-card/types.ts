import { TProfession, TSkills, TSpeciality } from '@/shared/types/specialty';

export type SpecialityCardProps = {
	index: number;
	data: TSpeciality;
	professions: TProfession[];
	allSkills: TSkills[];
	handleSubmitChangeSpecialty: ({
		id,
		profession,
		level,
		skills,
	}: TSpeciality) => void;
	handleDeleteSpecialty: (id: number) => void;
};
