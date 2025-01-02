/* eslint-disable camelcase */
'use client';
import React, { FC } from 'react';
import { PetIcon } from '@/shared/assets';
import Link from 'next/link';
import { PersonType } from './type';
import styles from './person.module.scss';
import Image from 'next/image';
import { Tooltip } from '@/shared/assets';

export const Person: FC<PersonType> = ({
	title,
	avatar,
	color,
	id,
	visible_status,
}) => {
	return (
		<div className={styles.container}>
			{avatar ? (
				<div
					className={styles.iconLink}
					style={{
						backgroundImage: `url('${avatar}')`,
					}}></div>
			) : (
				<div className={styles.iconLink}>
					<Image src={PetIcon} className={styles.icon} alt="pet-icon" />
				</div>
			)}

			{visible_status === 1 ? (
				<Link className={styles.link} href={`/specialists/${id}`} />
			) : (
				<div className={styles.hint}>
					<div className={styles.hintOverlay}>
						<span className={styles.hintSpan}>Профиль скрыт</span>
						<Tooltip className={styles.hintImage} />
					</div>
				</div>
			)}

			<p
				className={styles.tag}
				style={
					color
						? { backgroundColor: `${color}` }
						: { border: '1px solid #e2e8f0' }
				}>
				{title}
			</p>
		</div>
	);
};
