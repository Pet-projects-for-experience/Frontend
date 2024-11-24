import React from 'react';
import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
import styles from './list-requests-participants.module.scss';

export const ListRequestsParticipants = ({
	arrayRequests,
}: {
	arrayRequests: [];
}) => {
	return (
		<>
			{arrayRequests?.length > 0 ? (
				arrayRequests?.map((card: RequestParticipantCardType) => (
					<RequestParticipantCard
						key={card.id}
						request_status={card.request_status}
						project={card.project}
						position={card.position}
						cover_letter={card.cover_letter}
						id={card.id}
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
