/* eslint-disable camelcase */
'use client';
import React from 'react';
import { MainButton } from '@/shared/ui';
import styles from './answer-request-organizer.module.scss';

export const AnswerRequestOrganizer = ({
	handleAnswerAccept,
	handleAnswerReject,
	id,
	request_status,
	participant_user_id,
}: {
	handleAnswerAccept: (arg: {
		id: number;
		request_status: number;
		participant_user_id: number;
	}) => void;
	handleAnswerReject: (arg: {
		id: number;
		request_status: number;
		participant_user_id: number;
	}) => void;
	id: number;
	request_status: number;
	participant_user_id: number;
}) => {
	return (
		<div className={styles.buttons}>
			<MainButton
				variant="primary"
				width="regular"
				onClick={() =>
					handleAnswerAccept({ id, request_status, participant_user_id })
				}>
				Принять
			</MainButton>
			<MainButton
				variant="secondary"
				width="regular"
				onClick={() =>
					handleAnswerReject({ id, request_status, participant_user_id })
				}>
				Отклонить
			</MainButton>
		</div>
	);
};
