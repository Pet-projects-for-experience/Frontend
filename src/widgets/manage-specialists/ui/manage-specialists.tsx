// 'use client';
// import React, { useState } from 'react';
// import styles from './manage-specialist.specialist.module.scss';
// import { Form, Toggler } from '@/shared/ui';
// import { SingleSelectInput } from '@/shared/ui/single-select-input/single-select-input';
// import { MultiSelectInput } from '@/shared/ui/multi-select-input/multi-select-input';
// import { LEVEL } from '@/utils/constants';
// import {
// 	useGetProfessionsQuery,
// 	useGetSkillsQuery,
// } from '@/services/GeneralService';

// export const ManageSpecialists = () => {
// 	const [recruitmentIsOpen, setRecruitmentIsOpen] = useState(false);

// 	const { data: skills } = useGetSkillsQuery([]);
// 	const { data: profession } = useGetProfessionsQuery([]);

// 	console.log(skills);

// 	const onSubmit = (data: unknown) => {
// 		console.table(data);
// 	};
// 	return (
// 		<Form className={styles.container} onSubmit={onSubmit}>
// 			<div className={styles.specialists}>
// 				<h3 className={styles.specialists_master_title}>Кто нужен в проект</h3>
// 				<div className={styles.specialists_toggle}>
// 					<span>Набор {recruitmentIsOpen ? 'открыт' : 'закрыт'}</span>
// 					<Toggler
// 						checked={recruitmentIsOpen as boolean}
// 						name={'allow_notifications'}
// 						id={'allow_notifications'}
// 						onChange={(evt) => setRecruitmentIsOpen(evt.target.checked)}
// 					/>
// 				</div>

// 				<SingleSelectInput
// 					name={`project_specialists`}
// 					label={'Специальность'}
// 					onChange={() => {}}
// 					options={profession?.map(
// 						(specialization: { id: number; name: string }) => {
// 							return {
// 								label: specialization.id,
// 								value: specialization.name,
// 							};
// 						}
// 					)}
// 					description="Выберите одну специальность"
// 					isSearchable
// 				/>

// 				<div>
// 					<MultiSelectInput
// 						name={`project_specialists`}
// 						onChange={() => {}}
// 						options={LEVEL}
// 						values={[]}
// 						label={'Уровень квалификации'}
// 						isSearchable
// 					/>
// 				</div>

// 				<div>
// 					<MultiSelectInput
// 						isSearchable
// 						name={`project_specialists`}
// 						onChange={() => {}}
// 						options={skills?.map((skill: { id: number; name: string }) => {
// 							return {
// 								label: skill.id,
// 								value: skill.name,
// 							};
// 						})}
// 						values={[]}
// 						label={'Навыки'}
// 						description="Выберите не более 15 навыков"
// 						maxSelections={15}
// 					/>
// 				</div>
// 			</div>
// 		</Form>
// 	);
// };
