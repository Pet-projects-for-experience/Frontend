'use client';
import { Form, MainButton } from '@/shared/ui';
import { FormProject, FormProjectSpecialists } from '@/widgets';
import React from 'react';
import styles from './profile-create-project-page.module.scss';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const ProfileCreateProject = () => {
	const projectSpecialists = useSelector(
		(state: RootState) => state.projectSpecialists.project_specialists
	);

	const handleSubmit = () => {
		console.log('Final submission:', projectSpecialists);
	};

	const { control } = useForm();

	return (
		<>
			<Form onSubmit={handleSubmit} extraClass={styles.form}>
				<FormProject control={control} />
				<FormProjectSpecialists  />
				<div className={styles.btn}>
					<MainButton
						variant={'primary'}
						width={'min'}
						type="submit"
						disabled={false}>
						{'Submit'}
					</MainButton>
				</div>
			</Form>
		</>
	);
};
