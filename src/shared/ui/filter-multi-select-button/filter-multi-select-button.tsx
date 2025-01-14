'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FilterMultiSelectButtonProps, Option } from './type';
import styles from './filter-multi-select-button.module.scss';
import clsx from 'clsx';

export const FilterMultiSelectButton: FC<FilterMultiSelectButtonProps> = ({
	options,
	value = [],
	label,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

	const handleClickButton = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleOptionChange = (option: Option) => {
		// if (option.value === 0) {
		// 	// Если выбрана опция "Все", добавляем все остальные опции
		// 	if (selectedOptions.length === options.length) {
		// 		setSelectedOptions([]);
		// 	} else {
		// 		setSelectedOptions(options);
		// 	}
		// } else {
		// 	// Отменяем или добавляем опцию
		// 	if (selectedOptions.find((o) => o.value === option.value)) {
		// 		if (selectedOptions.length === 1) {
		// 			// Если снимаем последнюю опцию, то снимаем выделение с "Все"
		// 			setSelectedOptions([]);
		// 		} else {
		// 			setSelectedOptions((prev) =>
		// 				prev.filter((o) => o.value !== option.value)
		// 			);
		// 		}
		// 	} else {
		// 		setSelectedOptions((prev) => [...prev, option]);
		// 		if (
		// 			selectedOptions.length === 0 &&
		// 			selectedOptions.some((o) => o.value === 0)
		// 		) {
		// 			// Если выбран "Все", то снимаем выделение с "Все"
		// 			setSelectedOptions((prev) => prev.filter((o) => o.value !== 0));
		// 		}
		// 	}
		// }

		if (selectedOptions.find((o) => o.value === option.value)) {
			if (isAllChecked && selectedOptions.length === options.length) {
				setIsAllChecked(false);
			}
			setSelectedOptions((prev) =>
				prev.filter((o) => o.value !== option.value)
			);
		} else {
			setSelectedOptions((prev) => [...prev, option]);
			if (!isAllChecked && selectedOptions.length === options.length) {
				setIsAllChecked(true);
			}
		}
		setIsOpen(false);
	};

	const handleAllOptionChange = () => {
		if (isAllChecked) {
			setSelectedOptions([]);
		} else {
			setSelectedOptions(options);
		}
		setIsAllChecked((prev) => !prev);
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		setSelectedOptions(value);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		onChange(selectedOptions);
	}, [selectedOptions]);

	return (
		<div className={styles.filterContainer} ref={containerRef}>
			<div
				className={clsx(
					styles.filterButton,
					isOpen && styles.filterButtonIsActive,
					selectedOptions.length > 0 && styles.filterButtonSelectedItem
				)}
				onClick={handleClickButton}>
				{label}
			</div>
			{isOpen && (
				<ul className={styles.filterList}>
					<li
						className={styles.filterItem}
						onClick={() => handleAllOptionChange()}>
						<input
							className={styles.customCheckbox}
							type="checkbox"
							checked={isAllChecked}
							onChange={(option) => {
								console.log(`selected option all checked: ${option}`);
							}}
						/>
						<label>Все</label>
					</li>
					{options.map((option) => (
						<li
							key={option.value}
							className={styles.filterItem}
							onClick={() => handleOptionChange(option)}>
							<input
								className={styles.customCheckbox}
								type="checkbox"
								checked={selectedOptions.some((o) => o.value === option.value)}
								onChange={(option) => {
									console.log(`selected option: ${option}`);
								}}
							/>
							<label>{option.label}</label>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
