'use client';
import React /*, { useEffect, useState }*/ from 'react';
import { DeleteRequestParticipant } from '@/entities/delete-request-participant';
import {
	useDeleteRequestsParticipationMutation,
	/*useGetAllRequestsParticipationQuery,*/
} from '@/services/ProjectService';
import { toaster } from '@/widgets/notification-toast';
export const DeleteRequestParticipantFeature = ({ id }: { id: number }) => {
	// type Requests = {
	// 	id: number;
	// 	request_status: string;
	// 	position: string;
	// 	cover_letter: string;
	// 	project: {
	// 		started: string;
	// 		ended: string;
	// 		name: string;
	// 		directions: [
	// 			{
	// 				id: number;
	// 				name: string;
	// 			},
	// 		];
	// 	};
	// };
	
	// const { data: allRequests } = useGetAllRequestsParticipationQuery({
	// 	currentPage: 1,
	// 	role: 'participation',
	// });
	// const [arrayRequests, setArrayRequests] = useState<Requests[]>([]);
	// console.log('allRequests', allRequests);
	// console.log('arrayRequests', arrayRequests);
	// useEffect(() => {
	// 	if (allRequests?.results) {
	// 		setArrayRequests(allRequests.results);
	// 	}
	// }, [allRequests.results, arrayRequests]);

	const [deleteRequestParticipant] = useDeleteRequestsParticipationMutation();
	const handleDeleteRequestParticipant = (id: number) => {
		deleteRequestParticipant(id)
			.unwrap()
			.then(() => {
				//setArrayRequests(arrayRequests.filter((item) => item.id !== id));
				toaster({
					status: 'success',
					title: 'Заявка удалена',
				});

				console.log('успех');
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
