'use client';

import React, { FC, useEffect } from 'react';
import { Input, MainButton } from '@/shared/ui';
import { useFormContext } from 'react-hook-form';
import type { FormChangePasswordProps } from './types';
import styles from './form-change-password.module.scss';

export const FormChangePassword: FC<FormChangePasswordProps> = ({
	serverPasswordError,
	setServerPasswordError,
	isSubmitSuccessfulReset,
	isSubmitDisabled,
	setSubmitSuccessfulReset,
}) => {
	const {
		reset,
		formState: { isValid, errors },
	} = useFormContext();

	useEffect(() => {
		errors.password?.message && setServerPasswordError('');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors.password?.message]);

	useEffect(() => {
		if (isSubmitSuccessfulReset) {
			reset();
			setSubmitSuccessfulReset(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessfulReset]); //setIsSubmitDisabled

	return (
		<>
			<h2 className={styles.formSettings__title}>Смена пароля</h2>
			<div className={styles.formSettings__listPassword}>
				<Input
					className={styles.formSettings__input}
					name="password"
					type="password"
					labelName="Старый пароль"
					error={
						errors.password
							? `${errors.password?.message}`
							: serverPasswordError
					}
				/>
				<Input
					className={styles.formSettings__input}
					name="newPassword"
					type="password"
					labelName="Новый пароль"
					error={
						errors.newPassword
							? `${errors.newPassword?.message}`
							: serverPasswordError
					}
				/>
				<Input
					className={styles.formSettings__input}
					name="repeatNewPassword"
					type="password"
					labelName="Новый пароль еще раз"
					error={
						errors.repeatNewPassword
							? `${errors.repeatNewPassword?.message}`
							: serverPasswordError
					}
				/>
			</div>

			<div className={styles.formSettings__button}>
				<MainButton
					type="submit"
					variant={'primary'}
					width={'regular'}
					disabled={!isValid || isSubmitDisabled}>
					Сохранить
				</MainButton>
			</div>
		</>
	);
};
