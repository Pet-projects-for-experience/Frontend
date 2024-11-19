import React from 'react';
//import { Pagination } from '@/entities';
import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
import styles from './list-requests-participants.module.scss';

export const ListRequestsParticipants = ({ array }: { array: [] }) => {
	return (
		<>
			{array?.length > 0 ? (
				array?.map((card: RequestParticipantCardType) => (
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
			{/* <Pagination
				onPageChange={(page) =>
					setCurrentSettingsFilterRequests({
						page: Number(page),
						roleStatus: currentSettingsFilterRequests.roleStatus,
						statusNumber: currentSettingsFilterRequests.statusNumber,
					})
				}
				totalCount={
					requestsConsiderationParticipation &&
					requestsConsiderationParticipation.count
				}
				currentPage={currentSettingsFilterRequests.page}
				pageSize={pageSize}
			/> */}
		</>
	);
};
