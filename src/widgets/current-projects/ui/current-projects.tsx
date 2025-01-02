/* eslint-disable camelcase */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MainButton, ProjectCard } from '@/shared/ui';
//import { currentProjects } from '@/shared/types/current-projects';
import { useGetSectionQuery } from '@/services/GeneralService';
import { useGetProjectsPreviewMainQuery } from '@/services/ProjectService';
import {
	titleCurrentProjects,
	descriptionCurrentProjects,
} from '@/shared/constants';
//import Link from 'next/link';
import styles from './current-projects.module.scss';
import { CardProps } from '@/shared/ui/project-card/types';

export const CurrentProjects = () => {
	const router = useRouter();
	const { data: section } = useGetSectionQuery([]);
	const { data: projects } = useGetProjectsPreviewMainQuery([]);

	return (
		<>
			<h2 className={styles.header}>
				{section ? section[1].title : titleCurrentProjects}
			</h2>
			<p className={styles.text}>
				{section ? section[1].description : descriptionCurrentProjects}
			</p>
			<p className={styles.textMobile}>Присоединитесь к актуальным проектам.</p>
			<div className={styles.projectCards}>
				{projects?.results.map((item: CardProps) => {
					const { id, started, ended, name, directions, project_specialists } =
						item;
					return (
						<ProjectCard
							id={id}
							key={id}
							started={started}
							ended={ended}
							name={name}
							directions={directions}
							project_specialists={project_specialists}
						/>
					);
				})}
			</div>
			<div className={styles.showAll}>
				<MainButton
					variant="primary"
					width="max"
					onClick={() => router.push('projects')}>
					Все проекты
				</MainButton>
			</div>
		</>
	);
};
