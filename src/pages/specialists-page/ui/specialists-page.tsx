'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { SpecialistCard } from '@/widgets/specialist-card';
import { InputSearch } from '@/shared/ui/input-search/input-search';
import { statusSpecialist } from '@/shared/constants/status-specialist/status-specialist';
// import { qualification } from '@/shared/constants/qualification/qualification';
// import { Tooltip } from '@/widgets/tooltip';
// import { specialties } from '@/shared/constants/specialties/specialties';
// import { skills } from '@/shared/constants/skills/skills';
import FilterIcon from '@/shared/assets/icons/filter-icon.svg';
import { PopUp } from '@/shared/ui/pop-up/pop-up';
import { Pagination } from '@/entities/pagination/ui/pagination';
import { SpecialistsFilter } from '@/entities/specialists-filter';
import { useMediaQuery } from '@/shared/hooks';
import styles from './specialists-page.module.scss';
// import { SingleSelectButton } from '@/shared/ui/single-select-button/single-select-button';
// import { MultiSelectButton } from '@/shared/ui/multi-select-button/multi-select-button';
import { useGetAllSpecialistsDataQuery } from '@/services/SpecialistService';
import { SpecialistType } from './types';
import { Loader } from '@/shared/ui';
import { FilterSelectButton } from '@/shared/ui/filter-select-button/filter-select-button';
import { Option } from '@/shared/ui/filter-select-button/type';

export const Specialists = () => {
	type Filters = {
		status?: boolean; // Статус специалиста
		specialists?: number[]; // Уровень квалификации
		specialty?: number[]; // Специальность
		skills?: number[]; // Навыки
		searchQuery?: string; // Поиск по фразе
	};

	const pageSize = 7;

	const [currentPage, setCurrentPage] = useState(1);

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const [filters, setFilters] = useState<Filters>({
		status: undefined,
		specialists: undefined,
		specialty: undefined,
		skills: undefined,
		searchQuery: undefined,
	});

	const { data: specialistArray } = useGetAllSpecialistsDataQuery({
		currentPage,
		filters,
	});

	const handleStatusChange = (selectedOption: Option | undefined) => {
		let selectedOptionValue = undefined;
		if (selectedOption !== undefined) {
			selectedOptionValue = selectedOption.value === 1 ? true : false;
		}
		setFilters({
			...filters,
			status: selectedOptionValue,
		});
		console.info('selected status: ', selectedOption);
	};

	// const handleQualificationChange = (selectedOptions: (string | Option)[]) => {
	// 	// console.info('selected options: ', selectedOptions);
	// 	if (selectedOptions) {
	// 		const values = selectedOptions.map((option) => option.value);
	// 		setFilters({ ...filters, specialists: values });
	// 		console.info('selected levels: ', values);
	// 		// selectedOptions.forEach((element) => {
	// 		// 	console.log('label: ', element.label, 'value: ', element.value);
	// 		// });
	// 	}
	// };

	// const handleSpecialtiesChange = (selectedOptions: (string | Option)[]) => {
	// 	if (selectedOptions) {
	// 		const values = selectedOptions.map((option) => option.value);
	// 		setFilters({ ...filters, specialty: values });
	// 		console.info('selected specializations: ', values);
	// 	}
	// };

	// const handleSkillsChange = (selectedOptions: (string | Option)[]) => {
	// 	if (selectedOptions) {
	// 		const values = selectedOptions.map((option) => option.value);
	// 		setFilters({ ...filters, skills: values });
	// 		console.info('selected skills: ', values);
	// 	}
	// };

	const currentData = useMemo(() => {
		return specialistArray && specialistArray.results;
	}, [specialistArray]);

	const isMobile = useMediaQuery('(max-width:779px)');

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
		});
	}, [currentPage]);

	return (
		<section className={styles.specialists}>
			<div className={styles.specialists__wrapper}>
				<div className={styles.specialists__container}>
					<h1 className={styles.specialists__title}>Специалисты</h1>
					<div className={styles.specialists__item}>
						<div className={styles.specialists__inputSearch}>
							<InputSearch search={() => {}} onChange={() => {}} />
						</div>
						<button
							className={styles.specialists__filterButton}
							type="button"
							onClick={() => setIsPopupOpen(true)}>
							<FilterIcon />
						</button>
						{isMobile ? (
							<PopUp
								visible={isPopupOpen}
								title=""
								onClose={() => setIsPopupOpen(false)}>
								<SpecialistsFilter />
							</PopUp>
						) : null}
					</div>
				</div>
				<div className={styles.specialists__filterContainer}>
					<FilterSelectButton
						options={statusSpecialist}
						value={
							filters.status === true ? { value: 1, label: '' } : undefined
						}
						label="Статус специалиста"
						onChange={handleStatusChange}
					/>

					{/* <SingleSelectButton
						name="select-status"
						options={statusSpecialist}
						buttonLabel="Статус специалиста"
						// value={{ value: 'ready', label: 'Готов(а) к участию в проектах' }}
						onChange={handleStatusChange}
					/>

					<MultiSelectButton
						name="select-months"
						caption="Уровень квалификации"
						options={qualification}
						values={[]}
						onChange={handleQualificationChange}
						selectedAll={true}
						buttonWidth={114}
					/>

					<Tooltip text="Не более 2 специальностей">
						<MultiSelectButton
							name="select-specialties"
							caption="Специальность"
							options={specialties}
							values={[]}
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
					</Tooltip> */}
				</div>
			</div>
			<div className={styles.specialists__cards}>
				{currentData ? (
					currentData.map((res: SpecialistType) => (
						<SpecialistCard
							key={res?.user_id}
							userId={res?.user_id}
							specialists={res?.specialists}
							avatar={res?.avatar ? res?.avatar : ''}
							name={res?.name}
							userName={res?.username}
							readyToParticipate={res?.ready_to_participate}
						/>
					))
				) : (
					<Loader />
				)}
			</div>

			<Pagination
				onPageChange={(page) => setCurrentPage(Number(page))}
				totalCount={specialistArray?.count}
				currentPage={currentPage}
				pageSize={pageSize}
			/>
		</section>
	);
};
