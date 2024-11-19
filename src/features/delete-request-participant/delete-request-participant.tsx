'use client';
import React from 'react';
import { DeleteRequestParticipant } from '@/entities/delete-request-participant';
import { useDeleteRequestsParticipationMutation } from '@/services/ProjectService';
import { toaster } from '@/widgets/notification-toast';
export const DeleteRequestParticipantFeature = ({ id }: { id: number }) => {
	const [deleteRequestParticipant] = useDeleteRequestsParticipationMutation();
	const handleDeleteRequestParticipant = (id: number) => {
		deleteRequestParticipant(id)
			.unwrap()
			.then(() => {
				toaster({
					status: 'success',
					title: 'Заявка удалена'
				});
		
				console.log('успех');
			})
			.catch((error) => {
				console.log('errorCatch', error);
			});
	};
	return (
		<DeleteRequestParticipant
			handleDeleteButton={() => handleDeleteRequestParticipant(id)}
			id={id}
			
		/>
	);
};
