import React, { useState, useEffect } from 'react';
import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
import styles from './list-requests-participants.module.scss';

export const ListRequestsParticipants = ({
	arrayRequests,
}: {
	arrayRequests: RequestParticipantCardType[];
}) => {
	const [requests, setRequests] = useState<RequestParticipantCardType[]>([]);
	useEffect(() => {
		if (arrayRequests) {
			setRequests(arrayRequests);
		}
	}, [arrayRequests]);

	const handleDeleteCard = (id: number) => {
		setRequests(requests.filter((item) => Number(item.id) !== id));
	};

	return (
		<>
			{requests?.length > 0 ? (
				requests?.map((card: RequestParticipantCardType) => (
					<RequestParticipantCard
						key={card.id}
						request_status={card.request_status}
						project={card.project}
						position={card.position}
						cover_letter={card.cover_letter}
						id={card.id}
						handleDeleteCard={handleDeleteCard}
					/>
				))
			) : (
				<div className={styles.textContainer}>
					<p className={styles.text}>Здесь появятся ваши заявки на проекты</p>
					<span className={styles.subtitle}>
						Откликнитесь на интересующие вас проекты
					</span>
				</div>
			)}
		</>
	);
};
