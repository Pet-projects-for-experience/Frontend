/* eslint-disable camelcase */
import React, { FC } from 'react';
import {CalendarIcon, ActivityIcon } from '@/shared/assets';
import clsx from 'clsx';
import { RequestParticipantCardType } from './types';
import { getDate } from '@/shared/utils';

import styles from './request-participant-card.module.scss';

export const RequestParticipantCard: FC<RequestParticipantCardType> = ({
	request_status,
    project,
}) => {
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
				<button type='button' className={styles.topInfoButton}/>

			</div>
            <div className={styles.calendarContainer}>
						<CalendarIcon className={styles.calendarIcon} />
						<div
							className={styles.calendarText}>{`${startDate}-${endDate}`}</div>
					</div>
					<h2 className={styles.title}>{project.name}</h2>
		</article>
	);
};
