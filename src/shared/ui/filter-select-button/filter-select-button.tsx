'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FilterSelectButtonProps, Option } from './type';
import CheckIcon from '@/shared/assets/icons/check-icon.svg';
import styles from './filter-select-button.module.scss';
import clsx from 'clsx';

export const FilterSelectButton: FC<FilterSelectButtonProps> = ({
	options,
	value,
	label,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<Option | undefined>(value);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleClickButton = () => {
		setIsOpen((prev) => !prev);
	};
	const handleClickItem = (option: Option) => {
		const newSelectedItem =
			selectedItem && selectedItem.value === option.value ? undefined : option;
		setSelectedItem(newSelectedItem);
		onChange(newSelectedItem);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const Item: FC<{ option: Option }> = ({ option }) => {
		return (
			<li
				key={option.value}
				className={styles.filterItem}
				onClick={() => handleClickItem(option)}>
				{option.label}
				{selectedItem && selectedItem.value === option.value && (
					<CheckIcon width="24px" height="24px" />
				)}
			</li>
		);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.filterContainer} ref={containerRef}>
			<div
				className={clsx(
					styles.filterButton,
					selectedItem !== undefined && styles.filterButtonSelectedItem,
					isOpen && styles.filterButtonIsActive
				)}
				onClick={handleClickButton}>
				{label}
			</div>
			{isOpen && (
				<ul className={styles.filterList}>
					{options.map((option) => (
						<Item option={option} key={option.value} />
					))}
				</ul>
			)}
		</div>
	);
};
