import { TProfession, TSkills, TSpeciality } from '@/shared/types/specialty';

export type AddSpecialtyProps = {
	professions: TProfession[];
	allSkills: TSkills[];
	isLoadingAddSpecialty: boolean;
	handleAddSpecialty: (data: TSpeciality) => void;
	isSuccessAddSpecialty: boolean;
};
