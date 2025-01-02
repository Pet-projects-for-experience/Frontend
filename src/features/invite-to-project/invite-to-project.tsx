/* eslint-disable camelcase */
'use client';
import React, { useState } from 'react';
import { InviteToProject } from '@/widgets/invite-to-project';
import { useRequestParticipationInProjectsMutation } from '@/services/ProjectService';
import { IProjectsRequests } from '@/services/models/IProjectsRequests';
import { Option as SelectOption } from '@/shared/types/option';
import { toaster } from '@/widgets/notification-toast';
export const InviteToProjectFeature = ({
	project_specialists,
	projectId,
}: {
	projectId: number;
	project_specialists: [
		{
			id: number;
			profession: {
				id: number;
				specialization: string;
				speciality: string;
			};
		},
	];
}) => {
	const specializationArray = project_specialists.map((item) => {
		return {
			value: item.id,
			label: item.profession.specialization,
		};
	});
	const [selectedPosition, setSelectedPosition] = useState({
		//value: 0,
		//label: ' ',
		value: project_specialists[0].id,
		label: project_specialists[0].profession.specialization,
	} as SelectOption);

	const [currentText, setCurrentText] = useState(undefined);

	const handleSpecializationChange = (selectedOptions: SelectOption[]) => {
		console.info('specialization: ', selectedOptions[0]);
		if (selectedOptions !== undefined && selectedOptions.length !== 0) {
			setSelectedPosition(selectedOptions[0]);
		} else setSelectedPosition({ value: 0, label: ' ' });
	};
	const [requestInProject] = useRequestParticipationInProjectsMutation();
	const handleRequestInProject = (projects: IProjectsRequests) => {
		const {
			project = projectId,
			position = selectedPosition.value as number,
			cover_letter = currentText,
		} = projects;

		// console.log('requestInProject', requestInProject, project,position /*cover_letter*/);

		position !== 0
			? requestInProject({ project, position, cover_letter })
					.unwrap()
					.then(() => {
						toaster({
							status: 'success',
							title: 'Заявка отправлена',
							subtitle: 'Отслеживать статус можно в разделе проекты',
						});
					})
					.catch((error) => {
						toaster({
							status: 'error',
							title: 'Ошибка отправки',
							subtitle: `${error.data?.unique_in_progress?.[0] || error.data?.cover_letter?.[0] || 'Попробуйте отправить ещё раз'}`,
						});
						console.log('errorCatch', error);
					})
			: toaster({
					status: 'error',
					title: 'Ошибка отправки',
					subtitle: 'Выберите специальность',
				});
	};
	return (
		<InviteToProject
			handleRequestInProject={handleRequestInProject}
			specializationArray={specializationArray}
			handleSpecializationChange={handleSpecializationChange}
			setCurrentText={setCurrentText as () => void}
			currentText={currentText}
			selectedPosition={selectedPosition}
		/>
	);
};
