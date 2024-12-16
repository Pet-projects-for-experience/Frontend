'use client';
// import { Form, MainButton } from '@/shared/ui';
// import { FormProject, FormProjectSpecialists } from '@/widgets';
import React from 'react';
// import styles from './profile-create-project-page.module.scss';

// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { ProjectService } from '@/services/models/IProject';
// import { usePostProjectMutation } from '@/services/ProjectService';
import { CreateProjectFeature } from '@/features';
import { NotificationToastContainer } from '@/widgets/notification-toast';

export const ProfileCreateProject = () => {
	// const { projectSpecialists, projectUtility } = useSelector(
	// 	(state: RootState) => ({
	// 		projectSpecialists: state.projectSpecialists.project_specialists,
	// 		projectUtility: state.projectUtility,
	// 	})
	// );

	// const [postProject] = usePostProjectMutation();

	// const formatDate = (dateObj: Date) => {
	// 	const year = dateObj.getFullYear();
	// 	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	// 	const day = String(dateObj.getDate()).padStart(2, '0');
	// 	return `${year}-${month}-${day}`;
	// };

	// // eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const handleSubmit = (data: any) => {
	// 	const dates = {
	// 		started: formatDate(data.start as Date),
	// 		ended: formatDate(data?.end as Date),
	// 	};

	// 	const common: ProjectService = {
	// 		...data,
	// 		...projectUtility,
	// 		...dates,
	// 		// eslint-disable-next-line camelcase
	// 		project_specialists: projectSpecialists,
	// 	};

	// 	postProject(common);
	// };

	// const { control } = useForm();

	return (
		<>
			<CreateProjectFeature />
			<NotificationToastContainer />
		</>
	);
};
