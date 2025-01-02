import React, { FC } from 'react';

import type { MainButtonProps } from './types';
import styles from './main-button.module.scss';
import clsx from 'clsx';

export const MainButton: FC<MainButtonProps> = ({
	children,
	IconLeft,
	IconRight,
	variant,
	width,
	isActive,
	...props
}) => {
	const getClassnameForType = (
		buttonType: 'primary' | 'secondary' | 'trivial' | 'inverse'
	) => {
		switch (buttonType) {
			case 'primary':
				return styles.buttonPrimary;
			case 'secondary':
				return clsx(styles.buttonSecondary, {
					[styles.buttonSecondary_type_active]: isActive,
				});
			case 'trivial':
				return styles.buttonTrivial;
			case 'inverse':
				return styles.buttonInverse;
			default:
				return '';
		}
	};

	const getClassNameForWidth = clsx(
		width === 'min' && styles.buttonDimensionsMin,
		width === 'regular' && styles.buttonDimensionsRegular,
		width === 'max' && styles.buttonDimensionsMax
	);

	return (
		<button
			className={`${getClassnameForType(variant)} ${getClassNameForWidth}`}
			{...props}>
			<div className={styles.buttonContainer}>
				{IconLeft && <IconLeft className={styles.icon} />}
				{children}
				{IconRight && <IconRight className={styles.icon} />}
			</div>
		</button>
	);
};
