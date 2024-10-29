'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import type { LikeButtonProps } from './types';
import { HeartIcon, HeartIconActive } from '@/shared/assets';
import { PopUp } from '../pop-up/pop-up';
import { MainButton } from '../main-button/main-button';
import clsx from 'clsx';
import styles from './like-button.module.scss';

export const LikeButton: FC<LikeButtonProps> = ({
	variant,
	disabled,
	isActiveLike,
	handleLikeButton,
	isPopupOpen,
	setIsPopupOpen,
}) => {
	const router = useRouter();
	const getClassnameForTypeLikeButton = (
		buttonType: 'primary' | 'secondary' | 'trivial'
	) => {
		switch (buttonType) {
			case 'primary':
				return clsx(styles.buttonLikePrimary, {
					[styles.buttonLikeActive]: isActiveLike,
				});
			case 'secondary':
				return clsx(styles.buttonLikeSecondary, {
					[styles.buttonLikeActive]: isActiveLike,
				});
			case 'trivial':
				return styles.buttonLikeTrivial;
			default:
				return '';
		}
	};

	const getClassnameForTypeHeartIcon = (
		buttonType: 'primary' | 'secondary' | 'trivial'
	) => {
		switch (buttonType) {
			case 'primary':
				return clsx(styles.iconHeartPrimary, {
					[styles.iconHeartPrimaryDisabled]: disabled,
				});
			case 'secondary':
				return clsx(styles.iconHeartSecondary, {
					[styles.iconHeartSecondaryDisabled]: disabled,
				});
			case 'trivial':
				return styles.iconHeartTrivial;
			default:
				return '';
		}
	};

	return (
		<>
			<button
				type="button"
				disabled={disabled}
				className={getClassnameForTypeLikeButton(variant)}
				onClick={handleLikeButton as () => void}>
				{isActiveLike ? (
					<HeartIconActive className={styles.iconActive} />
				) : (
					<HeartIcon className={getClassnameForTypeHeartIcon(variant)} />
				)}
			</button>
			<PopUp
				visible={isPopupOpen}
				title={'Вход в систему'}
				onClose={() => {
					setIsPopupOpen(false);
					}}>
				<span className={styles.popupSubtitle}>
					Чтобы совершить действие, необходимо войти в систему
				</span>
				<div className={styles.popupButton}>
					<MainButton
						variant="primary"
						width="regular"
						type="button"
						onClick={(evt: React.MouseEvent | React.TouchEvent) => {
							evt.preventDefault();
							router.push('/login');
						}}>
						Авторизоваться
					</MainButton>
				</div>
			</PopUp>
		</>
	);
};
