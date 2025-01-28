/* eslint-disable camelcase */
'use client';
import React, { FC } from 'react';
import { MainButton } from '@/shared/ui';
import { AnswerRequestOrganizerType } from './types';
import styles from './answer-request-organizer.module.scss';

export const AnswerRequestOrganizer: FC<AnswerRequestOrganizerType> = ({
	handleAnswerAccept,
	handleAnswerReject,
	id,
	request_status,
	participant_user_id,
}) => {
	const handleAccept = () => {
		handleAnswerAccept({ id, request_status, participant_user_id });
	};
	const handleReject = () => {
		handleAnswerReject({ id, request_status, participant_user_id });
	};
	return (
		<div className={styles.buttons}>
			<MainButton variant="primary" width="regular" onClick={handleAccept}>
				Принять
			</MainButton>
			<MainButton variant="secondary" width="regular" onClick={handleReject}>
				Отклонить
			</MainButton>
		</div>
	);
};
