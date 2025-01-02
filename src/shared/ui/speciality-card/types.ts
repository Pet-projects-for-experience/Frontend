import {
	Speciality,
	TProfession,
	TSkills,
	TSpeciality,
} from '@/shared/types/specialty';

export type SpecialityCardProps = {
	data: TSpeciality;
	professions: TProfession[];
	allSkills: TSkills[];
	handleSubmitChangeSpecialty: (data: Speciality) => void;
	isLoadingChangeSpecialty: boolean;
	isSuccessСhangeSpecialty: boolean;
	handleDeleteSpecialty: (id: number) => void;
	isLoadingDeleteSpecialty: boolean;
};
