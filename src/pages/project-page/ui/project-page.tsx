/* eslint-disable camelcase */
'use client';
import React from 'react';
import { ProjectCardDetailed } from '@/widgets/project-card-detailed';
import { Loader } from '@/shared/ui';
import { useGetProjectByIdQuery } from '@/services/ProjectService';

export const Project = ({ id }: { id: number }) => {
	const { data: project, isLoading } = useGetProjectByIdQuery({ id });
	//console.log('projectDetail', project);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<ProjectCardDetailed
					idProject={id}
					name={project?.name}
					description={project?.description}
					directions={project?.directions}
					busyness={project?.busyness}
					phone_number={project?.phone_number}
					link={project?.link}
					owner={project?.owner}
					started={project?.started}
					ended={project?.ended}
					project_status={project?.project_status}
					project_specialists={project?.project_specialists}
					unique_project_participants_skills={
						project?.unique_project_participants_skills
					}
					project_participants={project?.project_participants}
					telegram_nick={project.telegram_nick}
					email={project.email}
					is_favorite={project.is_favorite}
				/>
			)}
		</>
	);
};
