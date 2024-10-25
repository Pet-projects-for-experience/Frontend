import { TProfession, TSkills, TSpeciality } from '@/shared/types/specialty';

export type SpecialityCardProps = {
	// id: number;
	data: TSpeciality;
	professions: TProfession[];
	allSkills: TSkills[];
	isLoadingChangeSpecialty: boolean;
	handleSubmitChangeSpecialty: ({
		id,
		profession,
		level,
		skills,
	}: TSpeciality) => void;
	isSuccessСhangeSpecialty: boolean;
	handleDeleteSpecialty: (id: number) => void;
	isLoadingDeleteSpecialty: boolean;
};
