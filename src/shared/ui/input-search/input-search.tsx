'use client';

import React, { FC, useRef, useEffect /*useState*/ } from 'react';
import { clsx } from 'clsx';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import type { InputSearchProps } from './types';
import styles from './input-search.module.scss';

export const InputSearch: FC<InputSearchProps> = ({
	search,
	delay = 500,
	className,
	type = 'search',
	...props
}) => {
	const debouncedSearch = useRef(debounce(search, delay)).current;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2 || e.target.value.length === 0) {
			debouncedSearch(e.target.value.toLowerCase());
		}
	};

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	return (
		<div className={clsx(className, styles.inputContainer)}>
			<input
				className={clsx(styles.input)}
				type={type}
				onChange={handleChange}
				{...props}
			/>

			<div className={styles.icon}>
				<Search color="#94A3B8" />
			</div>
		</div>
	);
};
