import React, { FC } from 'react';

import type { MainButtonProps } from './types';
import styles from './main-button.module.scss';

export const MainButton: FC<MainButtonProps> = ({
	children,
	IconLeft,
	IconRight,
	variant,
	width,
	...props
}) => {
	const getClassnameForType = (
		buttonType: 'primary' | 'secondary' | 'trivial' | 'inverse'
	) => {
		switch (buttonType) {
			case 'primary':
				return styles.buttonPrimary;
			case 'secondary':
				return styles.buttonSecondary;
			case 'trivial':
				return styles.buttonTrivial;
			case 'inverse':
				return styles.buttonInverse;
			default:
				return '';
		}
	};

	// this should be separated into different file with styles functions 
	// check 

	const getClassNameForWidth = (buttonWidth: 'regular' | 'max' | 'min') => {
		switch (buttonWidth) {
			case 'regular':
				return styles.buttonDimensionsRegular;
			case 'max':
				return styles.buttonDimensionsMax;
			case 'min':
				return styles.buttonDimensionsMin;
			default:
				return '';
		}
	};

	return (
		<button
			className={`${getClassnameForType(variant)} ${getClassNameForWidth(width)}`}
			{...props}>
			<div className={styles.buttonContainer}>
				{IconLeft && <IconLeft className={styles.icon} />}
				{children}
				{IconRight && <IconRight className={styles.icon} />}
			</div>
		</button>
	);
};
