'use client';

import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { CheckboxProps } from './types';
import styles from './checkbox.module.scss';

export const Checkbox: FC<CheckboxProps> = ({
	label,
	id,
	labelName,
	type,
	...props
}) => {
	const { register } = useFormContext();

	return (
		<div className={styles.checkboxContainer}>
			<input
				{...register(label)}
				className={clsx({
					[styles.checkbox]: type === 'checkbox',
					[styles.radio]: type === 'radio',
				})}
				id={id}
				type={type}
				{...props}
			/>
			<label
				className={clsx({
					[styles.label]: type === 'checkbox',
					[styles.labelForRadio]: type === 'radio',
				})}
				htmlFor={id}>
				{labelName}
			</label>
		</div>
	);
};
