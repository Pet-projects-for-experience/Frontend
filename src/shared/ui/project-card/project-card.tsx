/* eslint-disable camelcase */
'use client';
import React from 'react';
import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CardProps } from './types';
import CalendarIcon from '@/shared/assets/icons/calender.svg';
import { getColorTag, getStartDate, getEndDate } from '@/shared/utils';
import { MainButton } from '../main-button/main-button';
import { InviteToProjectFeature } from '@/features';
import { PopUp } from '@/shared/ui';
import styles from './project-card.module.scss';

export const ProjectCard: FC<CardProps> = ({
	started,
	ended,
	name,
	directions,
	project_specialists,
	id,
}) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const startDate = getStartDate(started);
	const endDate = getEndDate(ended);
	const token = localStorage.getItem('token');
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Link
				href={`projects/${id}`}
				target="_blank"
				className={styles.linkProject}>
				<div className={styles.date}>
					<CalendarIcon width="24" height="24" />
					<p className={styles.datetext}>{`${startDate}-${endDate}`}</p>
				</div>
				<p className={styles.title}>{name}</p>
				{directions?.map((item) => {
					return (
						<p key={item.id} className={styles.direction}>
							{item.name}
						</p>
					);
				})}
				<ul className={styles.tags}>
					{project_specialists?.map((item) => {
						return (
							<li
								key={item.id}
								className={styles.tag}
								style={{
									backgroundColor: `${getColorTag(item.profession.speciality)}`,
								}}>
								{item.profession?.specialization}
							</li>
						);
					})}
				</ul>
			</Link>
			{project_specialists.length ? (
				<MainButton
					variant="trivial"
					width="min"
					onClick={() => setIsPopupOpen(true)}>
					Откликнуться
				</MainButton>
			) : null}

			{token ? (
				<PopUp
					visible={isPopupOpen}
					title={name}
					onClose={() => setIsPopupOpen(false)}>
					<InviteToProjectFeature
						projectId={id}
						project_specialists={project_specialists}
					/>
				</PopUp>
			) : (
				<PopUp
					visible={isPopupOpen}
					title={'Вход в систему'}
					onClose={() => setIsPopupOpen(false)}>
					<span className={styles.popupSubtitle}>
						Чтобы совершить действие, необходимо войти в систему
					</span>
					<div className={styles.popupButton}>
						<MainButton
							variant="primary"
							width="regular"
							type="button"
							onClick={() => router.push('/login')}>
							Авторизоваться
						</MainButton>
					</div>
				</PopUp>
			)}
		</div>
	);
};
