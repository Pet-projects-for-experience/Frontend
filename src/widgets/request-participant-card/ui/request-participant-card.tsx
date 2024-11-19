/* eslint-disable camelcase */
import React, { FC, useState } from 'react';
import { CalendarIcon, ActivityIcon } from '@/shared/assets';
import IconUp from '@/shared/assets/icons/chevron-up.svg';
import IconDown from '@/shared/assets/icons/chevron-down.svg';
import clsx from 'clsx';
import { RequestParticipantCardType } from './types';
import { getDate } from '@/shared/utils';
import parse from 'html-react-parser';
import { DeleteRequestParticipantFeature } from '@/features';
import styles from './request-participant-card.module.scss';

export const RequestParticipantCard: FC<RequestParticipantCardType> = ({
	request_status,
	project,
	position,
	cover_letter,
	id,
}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const startDate = getDate(project.started);
	const endDate = getDate(project.ended);
	return (
		<article className={styles.cardContainer}>
			<div className={styles.topInfo}>
				<div className={styles.activeStateContainer}>
					<ActivityIcon
						className={clsx(
							styles.activeStateIcon,
							request_status === 'Принята' &&
								styles.activeStateIcon_type_active,
							request_status === 'В процессе' &&
								styles.activeStateIcon_type_progress,
							request_status === 'Отклонена' &&
								styles.activeStateIcon_type_inactive
						)}
					/>
					<div className={styles.activeStateText}>
						{request_status === 'Принята'
							? 'заявка принята'
							: request_status === 'В процессе'
								? 'заявка на рассмотрении'
								: 'заявка отклонена'}
					</div>
				</div>
				<DeleteRequestParticipantFeature id={Number(id)}/>
			</div>
			<div className={styles.calendarContainer}>
				<CalendarIcon className={styles.calendarIcon} />
				<div className={styles.calendarText}>{`${startDate}-${endDate}`}</div>
			</div>
			<h2 className={styles.title}>{project.name}</h2>
			<p className={styles.subtitle}>{project.directions[0].name}</p>
			<p className={styles.subtitlePosition}>{position}</p>
			<div className={styles.menu}>
				<div
					className={styles.menuTitle}
					onClick={() => {
						setIsOpenMenu(!isOpenMenu);
					}}>
					<h3 className={styles.titleCover}>Сопроводительное письмо</h3>
					{isOpenMenu ? (
						<IconUp className={styles.menuIcon} />
					) : (
						<IconDown className={styles.menuIcon} />
					)}
				</div>
				<div
					className={clsx(styles.menuCover, {
						[styles.menuCover_visible]: isOpenMenu,
					})}>
					<h4 className={styles.menuCover__text}>
						{cover_letter === null ? ' ' : parse(cover_letter)}
					</h4>
				</div>
			</div>
		</article>
	);
};
