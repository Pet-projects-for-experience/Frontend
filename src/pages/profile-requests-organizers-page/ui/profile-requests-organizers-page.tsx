'use client';
import React, { useState } from 'react';
import { RequestOrganizerCard } from '@/widgets/request-organizer-card';
import { useGetAllRequestsParticipationQuery } from '@/services/ProjectService';
import { Loader } from '@/shared/ui';
import { RequestOrganizerCardType } from '@/widgets/request-organizer-card/ui/types';
import styles from './profile-requests-organizers-page.module.scss';

export const ProfileRequestsOrganizers = () => {
	type CurrentSettingsType = {
		currentPage: number;
		role: string;
		statusNumber: null | number;
	};
	//const pageSize = 7;

	const [currentSettingsAllRequests /*setCurrentSettingsAllRequests*/] =
		useState<CurrentSettingsType>({
			currentPage: 1,
			role: 'owner',
			statusNumber: null,
		});

	const { data: allRequestsOwner, isLoading } =
		useGetAllRequestsParticipationQuery(currentSettingsAllRequests);

	return (
		<section className={styles.container}>
			{isLoading ? (
				<Loader />
			) : allRequestsOwner.results.length > 0 ? (
				allRequestsOwner.results.map((card: RequestOrganizerCardType) => (
					<RequestOrganizerCard
						key={card.id}
						cover_letter={card.cover_letter}
						request_participants={card.request_participants}
						position={card.position}
						project={card.project}
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
		</section>
	);
};
