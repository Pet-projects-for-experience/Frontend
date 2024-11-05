'use client';

import React from 'react';
import { TogglerProps } from './types';
import styles from './toggler.module.scss';
import { useFormContext } from 'react-hook-form';

export const Toggler = ({ checked, name, onChange }: TogglerProps) => {
	const { register } = useFormContext();

	return (
		<label className={styles.toggleCheckbox}>
			<input
				className={styles.toggleCheckbox__input}
				{...(name ? register(name as string) : {})}
				type="checkbox"
				checked={checked}
				name={name}
				onChange={onChange}
			/>
			<span className={styles.toggleCheckbox__default} />
		</label>
	);
};
