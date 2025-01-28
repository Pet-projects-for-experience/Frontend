'use client';

import React, { useEffect, useState } from 'react';
import { useGetFavoriteProjectsQuery } from '@/services/ProjectService';
import { ProjectCardFull } from '@/widgets/project-card-full';
import { ProjectCardFullType } from '@/widgets/project-card-full/ui/types';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/entities';
import { InputSearch } from '@/shared/ui';
import { Tooltip } from '@/widgets/tooltip';
import styles from './profile-favorites-projects-page.module.scss';

export const FavoritesProjects = () => {
	const pageSize = 7;
	const [currentSettings, setCurrentSettings] = useState({
		currentPage: 1,
		query: '',
	});

	const { currentPage, query } = currentSettings;
	const { data: allFavoriteProjects, isLoading } = useGetFavoriteProjectsQuery({
		currentPage,
		query,
	});
	
	const [isVisibleSearch, setIsVisibleSearch] = useState(false);
	const [favoriteProjectsArray, setFavoriteProjectsArray] = useState<ProjectCardFullType[]>([]);

	const handleDeleteCard = (id: number) => {
		setFavoriteProjectsArray(favoriteProjectsArray.filter((item) => item.id !== id))
	}

	useEffect(() => {
		if (allFavoriteProjects?.results) {
			setFavoriteProjectsArray(allFavoriteProjects?.results)
		}
		if (allFavoriteProjects?.results.length > 0) {
			setIsVisibleSearch(true);
		}
		if (
			isVisibleSearch &&
			allFavoriteProjects?.results.length === 0 &&
			query.length === 0
		) {
			setIsVisibleSearch(false);
		}
	}, [query, allFavoriteProjects, isVisibleSearch]);


	return (
		<section className={styles.favoritesProjects}>
			{isVisibleSearch && (
				<div className={styles.inputSearch}>
					<Tooltip text="Введите не менее 3х символов">
						<div className={styles.input}>
							<InputSearch
								search={(query) =>
									setCurrentSettings({
										currentPage: currentSettings.currentPage,
										query,
									})
								}
							/>
						</div>
					</Tooltip>
				</div>
			)}

			{isLoading ? (
				<Loader />
			) : favoriteProjectsArray.length > 0 ? (
				favoriteProjectsArray.map((project: ProjectCardFullType) => {
					return (
						<ProjectCardFull
							id={project.id}
							description={project.description}
							ended={project.ended}
							started={project.started as string}
							name={project.name}
							directions={project.directions}
							project_status={project.project_status}
							key={project.id}
							recruitment_status={project.recruitment_status}
							project_specialists={project.project_specialists}
							busyness={project.busyness}
							link={project.link}
							phone_number={project.phone_number}
							telegram_nick={project.telegram_nick}
							email={project.email}
							is_favorite={project.is_favorite}
							handleDeleteCard={handleDeleteCard}
						/>
					);
				})
			) : query.length > 0 ? (
				<div className={styles.textContainer}>
					<p className={styles.text}>Ничего не найдено</p>
				</div>
			) : (
				<div className={styles.textContainer}>
					<p className={styles.text}>Здесь появятся избранные проекты</p>
					<span className={styles.subtitle}>
						Сохраните понравившиеся проекты из раздела «Проекты»
					</span>
				</div>
			)}

			<Pagination
				onPageChange={(page) =>
					setCurrentSettings({
						currentPage: Number(page),
						query: currentSettings.query,
					})
				}
				totalCount={allFavoriteProjects && allFavoriteProjects.count}
				currentPage={currentSettings.currentPage}
				pageSize={pageSize}
			/>
		</section>
	);
};
