'use client';
import React from 'react';
import { PersonIcon } from '@/shared/assets';
import styles from './person.module.scss';

export const Person = ({
	title,
	avatar,
	color,
}: {
	title: string;
	avatar?: string;
	color?: string;
}) => {
	return (
		<div className={styles.container}>
			{avatar ? (
				<div
					className={styles.iconLink}
					style={{ backgroundImage: `url(${avatar})` }}></div>
			) : (
				<PersonIcon className={styles.icon} />
			)}

			<p className={styles.tag} style={{ backgroundColor: `${color}` }}>
				{title}
			</p>
		</div>
	);
};