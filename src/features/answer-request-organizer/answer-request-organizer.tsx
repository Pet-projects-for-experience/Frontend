/* eslint-disable camelcase */
'use client';
import React from 'react';
import { AnswerRequestOrganizer } from '@/entities';
import { useAnswerOrganizerOnRequestMutation } from '@/services/ProjectService';
import { toaster } from '@/widgets/notification-toast';

export const AnswerRequestOrganizerFeature = ({
	id,
	participant_user_id,
	request_status,
}: {
	id: number;
	participant_user_id: number;
	request_status: number;
}) => {
	const [answerOnRequest] = useAnswerOrganizerOnRequestMutation();

	const handleAnswerOnRequestAccept =
		(/*{id, request_status}: {id: number, request_status: number}*/) => {
			answerOnRequest({ id, request_status: 2, participant_user_id })
				.unwrap()
				.then(() => {
					toaster({
						status: 'success',
						title: 'Заявка принята',
						subtitle: 'Участник приглашëн в проект',
					});
				})
				.catch((error) => {
					toaster({
						status: 'error',
						title: 'Ошибка отправки ответа',
						subtitle: `${error.data?.already || 'Попробуй отправить ещё раз'}`,
					});
					console.log('errorCatch', error);
				});
		};
	const handleAnswerOnRequestReject =
		(/*{id, request_status}: {id: number, request_status: number}*/) => {
			answerOnRequest({ id, request_status: 3, participant_user_id })
				.unwrap()
				.then(() => {
					toaster({
						status: 'success',
						title: 'Заявка отклонена',
						subtitle: 'Участник не присоединится к проекту',
					});
				})
				.catch((error) => {
					toaster({
						status: 'error',
						title: 'Ошибка отправки ответа',
						subtitle: 'Попробуй отправить ещё раз',
					});
					console.log('errorCatch', error);
				});
		};
	return (
		<AnswerRequestOrganizer
			handleAnswerAccept={handleAnswerOnRequestAccept}
			handleAnswerReject={handleAnswerOnRequestReject}
			id={id}
			participant_user_id={participant_user_id}
			request_status={request_status}
		/>
	);
};
