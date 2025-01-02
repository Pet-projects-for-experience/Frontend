import React, { FC } from 'react';
import styles from './specialties.module.scss';
import { SpecialityCard } from '@/shared/ui/speciality-card/speciality-card';
import { TSpecialties } from './types';
import { AddSpecialty } from '@/shared/ui/add-specialty/add-specialty';

export const Specialties: FC<TSpecialties> = ({
	professions,
	specialists,
	allSkills,
	handleSubmitChangeSpecialty,
	isLoadingChangeSpecialty,
	isSuccessСhangeSpecialty,
	handleDeleteSpecialty,
	handleAddSpecialty,
	isLoadingAddSpecialty,
	isSuccessAddSpecialty,
	isLoadingDeleteSpecialty,
}) => {
	return (
		<section className={styles.specialityList}>
			<h3 className={styles.specialityList__title}>Специальность</h3>
			<ul className={styles.specialityList__contentList}>
				{specialists.map((specialist) => (
					<li key={specialist.id}>
						<SpecialityCard
							data={specialist}
							professions={professions}
							allSkills={allSkills}
							handleSubmitChangeSpecialty={handleSubmitChangeSpecialty}
							isLoadingChangeSpecialty={isLoadingChangeSpecialty}
							isSuccessСhangeSpecialty={isSuccessСhangeSpecialty}
							handleDeleteSpecialty={handleDeleteSpecialty}
							isLoadingDeleteSpecialty={isLoadingDeleteSpecialty}
						/>
					</li>
				))}
			</ul>
			<AddSpecialty
				allSkills={allSkills}
				professions={professions}
				isLoadingAddSpecialty={isLoadingAddSpecialty}
				handleAddSpecialty={handleAddSpecialty}
				isSuccessAddSpecialty={isSuccessAddSpecialty}
			/>
		</section>
	);
};
