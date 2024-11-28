'use client';
import React from 'react';
import { DeleteRequestParticipant } from '@/entities/delete-request-participant';
import { useDeleteRequestsParticipationMutation } from '@/services/ProjectService';
import { toaster } from '@/widgets/notification-toast';
export const DeleteRequestParticipantFeature = ({
	id,
	handleDeleteCard,
}: {
	id: number;
	handleDeleteCard: (arg: number) => void;
}) => {
	const [deleteRequestParticipant] = useDeleteRequestsParticipationMutation();

	const handleDeleteRequestParticipant = (id: number) => {
		deleteRequestParticipant(id)
			.unwrap()
			.then(() => {
				handleDeleteCard(id);
				toaster({
					status: 'success',
					title: 'Заявка удалена',
				});
			})
			.catch((error) => {
				toaster({
					status: 'error',
					title: 'Ошибка удаления заявки',
					subtitle: `${error.data?.detail || 'Попробуйте еще раз'}`,
				});
				console.log(error);
			});
	};
	return (
		<DeleteRequestParticipant
			handleDeleteButton={() => handleDeleteRequestParticipant(id)}
			id={id}
		/>
	);
};
