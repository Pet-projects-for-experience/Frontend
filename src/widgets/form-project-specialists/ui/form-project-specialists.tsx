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
import { useDispatch } from 'react-redux';
import { addProjectSpecialist } from '@/store/reducers/ProjectSpecialist';

export const FormProjectSpecialists = () => {
	const { data: professions, isLoading: isLoadingProf } =
		useGetProfessionsQuery([]);

	const { data: allSkills, isLoading: isLoadingSkills } = useGetSkillsQuery([]);

	const [specialties, setSpecialties] = useState<TSpeciality[]>([]);

	const dispatch = useDispatch();

	const handleAddSpecialty = ({ profession, level, skills }: TSpeciality) => {
		setSpecialties(() => [
			...specialties,
			{
				profession,
				level,
				skills,
			},
		]);

		toaster({
			status: 'success',
			title: 'Специальность успешно добавлена',
		});

		dispatch(
			addProjectSpecialist({
				profession: profession.id,
				skills: skills.map((v) => v.id),
				count: 1,
				level: level,
				// eslint-disable-next-line camelcase
				is_required: true,
			})
		);
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
		setSpecialties((sp) => sp.filter((_, specId) => specId !== id));
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
						{specialties.map((specialist, index) => (
							<li key={index}>
								<ProjectSpecialitCard
									index={index}
									data={specialist}
									professions={professions}
									allSkills={allSkills}

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
