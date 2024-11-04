'use client';
import React from 'react';
import { useGetRequestsParticipationQuery } from '@/services/ProjectService';
import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { MainButton } from '@/shared/ui';
import { InputSearch } from '@/shared/ui';
import { Loader } from '@/shared/ui';
import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
import styles from './profile-requests-participants-page.module.scss';

export const ProfileRequestsParticipants = () => {
	const { data: requestsParticipation, isLoading } =
		useGetRequestsParticipationQuery([]);
	console.log(requestsParticipation);
	return (
		<section className={styles.requests}>
			<div className={styles.buttons}>
				<MainButton type="button" variant="secondary" width="regular">
					На рассмотрении
				</MainButton>
				<MainButton type="button" variant="secondary" width="regular">
					Отклонены
				</MainButton>
			</div>
			<div className={styles.inputSearch}>
				<InputSearch search={() => {}} />
			</div>
			<div className={styles.cards}>
				{isLoading ? (
					<Loader />
				) : (
					requestsParticipation.results.map(
						(card: RequestParticipantCardType) => (
							<RequestParticipantCard
								key={card.id}
								request_status={card.request_status}
								project={card.project}
							/>
						)
					)
				)}
			</div>
		</section>
	);
};
