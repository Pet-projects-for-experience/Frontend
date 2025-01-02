import { useMemo } from 'react';

type paginationProps = {
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	currentPage: number;
};

const range = (start: number, end: number) => {
	const length = end - start + 1;
	/*
  	Создаем массив определенной длины и задаем элементы внутри него от
    начального значения до конечного.
  */
	return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 0,
	currentPage,
}: paginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// Количество страниц определяется как siblingCount + FirstPage + LastPage + currentPage + 2*ТОЧКИ
		const totalPageNumbers = siblingCount + 5;

		/*
        Случай 1:
        Если количество страниц меньше номеров страниц, которые мы хотим отобразить в нашем
        paginationComponent, мы возвращаем диапазон [1..totalPageCount]
        */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		/*
        Рассчитаем индекс левого и правого родственных элементов и убеждаемся, что они находятся в пределах диапазона 1 и totalPageCount
        */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		/*
        Не показываем точки только тогда, когда между крайними значениями sibling и пределами страницы нужно вставить только один номер страницы, т.е. 1 и totalPageCount. Значит, используем leftSiblingIndex > 2 и rightSiblingIndex < totalPageCount - 2
        */
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		/*
        Случай 2: Левые точки не отображаются, но должны отображаться правые точки
        */
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 2 + 2 * siblingCount;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		/*
        Случай 3: Правые точки не отображаются, но должны отображаться левые точки
        */
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 2 + 2 * siblingCount;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		/*
        Случай 4: Должны быть показаны как левые, так и правые точки
        */
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
