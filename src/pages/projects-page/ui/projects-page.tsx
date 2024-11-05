/* eslint-disable camelcase */
'use client';
import React, { useState, useEffect } from 'react';
import { ProjectCardFull } from '@/widgets/project-card-full';
import { statusOptions } from '@/shared/constants/status-options/status-options';
import { recruitmentStatus } from '@/shared/constants/recruitment-status/recruitment-status';
import { months2, professions } from '@/shared/constants';
import { ProjectFilter } from '@/entities/project-filter';
import { PopUp } from '@/shared/ui/pop-up/pop-up';
import { MainButton } from '@/shared/ui';
import { FilterIcon } from '@/shared/assets';
import { useMediaQuery } from '@/shared/hooks';
import { specialties } from '@/shared/constants/specialties/specialties';
import { skills } from '@/shared/constants/skills/skills';
import { Tooltip } from '@/widgets/tooltip';
import { InputSearch } from '@/shared/ui/input-search/input-search';
import { Pagination } from '@/entities';
import { SingleSelectButton } from '@/shared/ui/single-select-button/single-select-button';
import { MultiSelectButton } from '@/shared/ui/multi-select-button/multi-select-button';
import { ProjectCardFullType } from '@/widgets/project-card-full/ui/types';
import { CalendarButton } from '@/shared/ui/calendar-button/calendar-button';
import { getAllProjects } from '@/shared/api';
import { Option } from '@/shared/types/option';
import { Loader } from '@/shared/ui';
import styles from './projects-page.module.scss';

type TProjectsData = {
	count: number;
	next: string;
	previous: null | string;
	results: ProjectCardFullType[];
};

export const Projects = () => {
	const pageSize = 7;
	const [currentSettings, setCurrentSettings] = useState({
		currentPage: 1,
		query: '',
	});
	const [projectsData, setProjectsData] = useState({} as TProjectsData);
	const [isLoading, setIsLoading] = useState(false);

	const getAllProjectsData = async ({
		currentPage,
		query,
	}: {
		currentPage: number;
		query: string;
	}) => {
		setIsLoading(true);
		const res = await getAllProjects({
			currentPage,
			query,
		});

		const projectsData = await res.json();
		// console.log(projectsData);
		setProjectsData(projectsData);
		setIsLoading(false);
	};

	useEffect(() => {
		const { currentPage, query } = currentSettings;
		getAllProjectsData({ currentPage, query });
	}, [currentSettings]);

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			//behavior: "smooth",
		});
	}, [currentSettings]);

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width:779px)');

	const handleStatusProjectChange = (selectedOptions: Option[]) => {
		console.info('selected option: ', selectedOptions?.[0]);
	};

	const handleRecruitmentStatusChange = (
		selectedOptions: (string | object)[]
	) => {
		console.info('selected option: ', selectedOptions?.[0]);
	};

	const handleSpecialtiesChange = (selectedItems: object) => {
		console.info('selected options: ', selectedItems);
	};

	const handleSkillsChange = (selectedItems: object) => {
		console.info('selected options: ', selectedItems);
	};

	const handleDateChange = (date: Date | [Date, Date | null]) => {
		console.info('selected date: ', date);
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.projects__container}>
				<h1 className={styles.projects__title}>Проекты</h1>
				<Tooltip text="Введите не менее 3х символов">
					<div className={styles.projects__inputSearch}>
						<InputSearch
							search={(query) =>
								setCurrentSettings({
									currentPage: currentSettings.currentPage,
									query,
								})
							}
						/>
						<button
							className={styles.projects__filterButton}
							onClick={() => setIsPopupOpen(true)}>
							<FilterIcon />
						</button>
					</div>
				</Tooltip>
			</div>
			<PopUp
				visible={isPopupOpen}
				title=""
				onClose={() => setIsPopupOpen(false)}>
				<ProjectFilter
					isMobile={isMobile}
					months={months2}
					professions={professions}
				/>
			</PopUp>
			{(isMobile && !isPopupOpen) || !isMobile ? (
				<>
					<div className={styles.allFilterContainer}>
						<div className={styles.filterContainer}>
							<SingleSelectButton
								name="select-status"
								options={statusOptions}
								buttonLabel="Статус проекта"
								value={{ value: 1, label: 'Завершенный' }}
								onChange={handleStatusProjectChange}
							/>
							<CalendarButton
								name="select-date"
								caption="Дата"
								isSelectsRange={true}
								onChange={handleDateChange}
							/>
							<SingleSelectButton
								name="select-recruitment-status"
								options={recruitmentStatus}
								buttonLabel="Статус набора"
								value={undefined}
								onChange={handleRecruitmentStatusChange}
							/>
							<Tooltip text="Не более 2 специальностей">
								<MultiSelectButton
									name="select-specialties"
									caption="Специальность"
									options={specialties}
									values={[
										{
											value: 1,
											label: 'Десктоп разработчик / Software Developer',
										},
										{
											value: 2,
											label:
												'Инженер по нагрузочному тестированию / Performance Engineer',
										},
									]}
									onChange={handleSpecialtiesChange}
									maxSelections={2}
									buttonWidth={207}
									tooltip="Не более 2 специальностей"
								/>
							</Tooltip>
							<Tooltip text="Не более 5 навыков">
								<MultiSelectButton
									name="select-skills"
									caption="Навыки"
									options={skills}
									values={[]}
									onChange={handleSkillsChange}
									maxSelections={5}
									buttonWidth={131}
									isSearchable
									tooltip="Не более 5 навыков"
								/>
							</Tooltip>
						</div>
						{isMobile ? null : (
							<MainButton
								variant="primary"
								width="regular"
								onClick={() => setIsPopupOpen(true)}
								IconLeft={FilterIcon}>
								Фильтры
							</MainButton>
						)}
					</div>
					<div className={styles.projectsContainer}>
						{isLoading ? (
							<Loader />
						) : projectsData?.results?.length > 0 ? (
							projectsData?.results?.map((project: ProjectCardFullType) => {
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
									/>
								);
							})
						) : (
							currentSettings.query.length > 0 && (
								<p className={styles.projects__subtitle}>Ничего не найдено</p>
							)
						)}
					</div>
					<Pagination
						onPageChange={(page) =>
							setCurrentSettings({
								currentPage: Number(page),
								query: currentSettings.query,
							})
						}
						totalCount={projectsData && projectsData.count}
						currentPage={currentSettings.currentPage}
						pageSize={pageSize}
					/>
				</>
			) : null}
		</div>
	);
};
