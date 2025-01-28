/* eslint-disable camelcase */
'use client';
import React, { FC } from 'react';
import { AnswerRequestOrganizer } from '@/entities';
import { useAnswerOrganizerOnRequestMutation } from '@/services/ProjectService';
import { toaster } from '@/widgets/notification-toast';

type AnswerRequestOrganizerFeatureType = {
	id: number;
	participant_user_id: number;
	request_status: number;
	handleDeleteCard: (arg: number) => void;
};
type HandleAnswerOnRequestType = {
	id: number;
	participant_user_id: number;
	request_status: number;
};

export const AnswerRequestOrganizerFeature: FC<
	AnswerRequestOrganizerFeatureType
> = ({ id, participant_user_id, request_status, handleDeleteCard }) => {
	
	const [answerOnRequest] = useAnswerOrganizerOnRequestMutation();

	const handleAnswerOnRequestAccept = ({
		id,
		request_status,
		participant_user_id,
	}: HandleAnswerOnRequestType) => {
		answerOnRequest({ id, request_status, participant_user_id })
			.unwrap()
			.then(() => {
				handleDeleteCard(id);
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
	const handleAnswerOnRequestReject = ({
		id,
		request_status,
		participant_user_id,
	}: HandleAnswerOnRequestType) => {
		answerOnRequest({ id, request_status, participant_user_id })
			.unwrap()
			.then(() => {
				handleDeleteCard(id);
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
			handleAnswerAccept={() =>
				handleAnswerOnRequestAccept({
					id,
					request_status: 2,
					participant_user_id,
				})
			}
			handleAnswerReject={() =>
				handleAnswerOnRequestReject({
					id,
					request_status: 3,
					participant_user_id,
				})
			}
			id={id}
			participant_user_id={participant_user_id}
			request_status={request_status}
		/>
	);
};
