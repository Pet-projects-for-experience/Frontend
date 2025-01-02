'use client';
import React from 'react';

import clsx from 'clsx';
import { usePagination, DOTS } from '../lib/use-pagination';
import styles from './pagination.module.scss';
import Left from '@/shared/assets/icons/chevron-left.svg';
import Right from '@/shared/assets/icons/chevron-right-icon.svg';
//import { useRouter } from 'next/navigation';

type PaginationProps = {
	onPageChange: (pageNumber: string | number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
};

export const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
}: PaginationProps) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});
	//const router = useRouter();

	//Если в диапазоне нумерации страниц меньше 2-х, мы не будем отображать компонент
	if (!paginationRange) {
		return null;
	} else {
		if (currentPage === 0 || paginationRange.length < 2) {
			return null;
		}

		const onNext = () => {
			//router.push(`/projects/?page=${currentPage + 1}`)
			onPageChange(currentPage + 1);
		};

		const onPrevious = () => {
			//router.push(`/projects/?page=${currentPage - 1}`)
			onPageChange(currentPage - 1);
		};

		const lastPage = paginationRange[paginationRange.length - 1];

		return (
			<ul className={styles.paginator}>
				{/* Левая навигационная стрелка */}
				<li
					className={clsx(styles.paginator__item, {
						[styles.disabled]: currentPage === 1,
					})}
					onClick={onPrevious}>
					<div className={styles.paginator__item_arrow}>
						<Left />
					</div>
				</li>
				{paginationRange.map((pageNumber, i) => {
					// Если PageItem является точкой, отображаем точки символом unicode
					if (pageNumber === DOTS) {
						return (
							<span className={styles.pagination__item_dots} key={i}>
								&#8230;
							</span>
						);
					}

					// Рендерим страницу по номерам
					return (
						<li
							key={i}
							className={clsx(styles.paginator__item, {
								[styles.selected]: pageNumber === currentPage,
							})}
							// onClick={() => {onPageChange(pageNumber);
							// 	router.push(`/projects/?page=${pageNumber}`)}
							// }
							onClick={() => onPageChange(pageNumber)}>
							<span>{pageNumber}</span>
						</li>
					);
				})}
				{/*  Правая навигационная стрелка */}
				<li
					className={clsx(styles.paginator__item, {
						[styles.disabled]: currentPage === lastPage,
					})}
					onClick={onNext}>
					<div className={clsx(styles.paginator__item_arrow, styles.right)}>
						<Right />
					</div>
				</li>
			</ul>
		);
	}
};
