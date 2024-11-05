'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';

import type { InputProps } from './types';
import styles from './input.module.scss';
import { useFormContext } from 'react-hook-form';

export const Input: FC<InputProps> = ({
	name,
	labelName = 'labelName',
	error = null,
	link = null,
	className,
	type = 'text',
	description = false,
	descrText,
	...props
}) => {
	const [visible, setVisible] = useState(false);
	const handleVisible = () => {
		setVisible(!visible);
	};

	const { register, trigger } = useFormContext();

	const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.value = event.target.value.trim();
		await trigger(name);
	};

	return (
		<label className={clsx(className, styles.label)}>
			<span>{labelName}</span>
			<div className={styles.inputContainer}>
				<input
					{...register(`${name}`, { shouldUnregister: true })}
					type={type === 'password' ? (visible ? 'text' : 'password') : type}
					className={clsx({
						[styles.input]: true,
						[styles.input_typeSucces]: Boolean(error) === false,
						[styles.input_typeError]: Boolean(error) === true,
					})}
					{...props}
					onBlur={handleBlur}
				/>
				{type === 'password' && (
					<div className={styles.icon} onClick={handleVisible}>
						{visible ? <EyeOff color="#94a3b8" /> : <Eye color="#94a3b8" />}
					</div>
				)}
				{error && <p className={styles.inputError}>{error}</p>}
			</div>
			{!error && description && (
				<span className={styles.inputDescr}>{descrText}</span>
			)}
			{link && (
				<Link href={link.href} className={styles.inputLink}>
					{link.text}
				</Link>
			)}
		</label>
	);
};
