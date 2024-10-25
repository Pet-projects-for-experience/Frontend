'use client';
import React, { useState } from 'react';
import {
	useGetProfessionsQuery,
	useGetSkillsQuery,
} from '@/services/GeneralService';
import { TSpeciality } from '@/shared/types/specialty';
import { toaster } from '@/widgets/notification-toast';
import styles from './form-project-specialists.module.scss';
import { Loader } from '@/shared/ui';
import { AddProjectSpeciality } from '@/entities/add-proejct-specialists/add-project-speciality';
import { ProjectSpecialitCard } from '@/entities/speciality-card/project-speciality-card';

export const FormProjectSpecialists = () => {
	const { data: professions, isLoading: isLoadingProf } =
		useGetProfessionsQuery([]);

	const { data: allSkills, isLoading: isLoadingSkills } = useGetSkillsQuery([]);

	const [specialties, setSpecialties] = useState<TSpeciality[]>([]);

	const handleAddSpecialty = ({ profession, level, skills }: TSpeciality) => {
		setSpecialties((prevSpecialties) => [
			{
				profession,
				level,
				skills,
			},
			...prevSpecialties,
		]);

		toaster({
			status: 'success',
			title: 'Специальность успешно добавлена',
		});
	};
	const handleChangeSpecialty = ({
		id,
		profession,
		level,
		skills,
	}: TSpeciality) => {
		setSpecialties(
			specialties.map((specilist) =>
				specilist.id === id
					? { ...specilist, profession, level, skills }
					: specilist
			)
		);
	};
	const handleDelete = (id: number) => {
		setSpecialties(specialties.filter((item) => item.id !== id));
	};

	return (
		<section className={styles.specialityList}>
			{isLoadingProf || isLoadingSkills ? (
				<div style={{ minWidth: '816px' }}>
					<Loader />
				</div>
			) : (
				<>
					<h3 className={styles.specialityList__title}>Специальность</h3>
					<ul className={styles.specialityList__contentList}>
						{specialties.map((specialist) => (
							<li key={specialist.id}>
								<ProjectSpecialitCard
									data={specialist}
									professions={professions}
									allSkills={allSkills}
									isLoadingChangeSpecialty={false}
									isSuccessСhangeSpecialty={false}
									isLoadingDeleteSpecialty={false}
									handleSubmitChangeSpecialty={handleChangeSpecialty}
									handleDeleteSpecialty={handleDelete}
								/>
							</li>
						))}
					</ul>
					<AddProjectSpeciality
						allSkills={allSkills}
						professions={professions}
						handleAddSpecialty={handleAddSpecialty}
						isLoadingAddSpecialty={true}
						isSuccessAddSpecialty={true}
					/>
				</>
			)}
		</section>
	);
};
