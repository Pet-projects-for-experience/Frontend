'use client';
import React, { useState, useEffect } from 'react';
import { RequestOrganizerCard } from '@/widgets/request-organizer-card';
import { useGetAllRequestsParticipationQuery } from '@/services/ProjectService';
import { Loader } from '@/shared/ui';
import { RequestOrganizerCardType } from '@/widgets/request-organizer-card/ui/types';
import { Pagination } from '@/entities';
import { NotificationToastContainer } from '@/widgets/notification-toast';
import styles from './profile-requests-organizers-page.module.scss';

export const ProfileRequestsOrganizers = () => {
	type CurrentSettingsType = {
		currentPage: number;
		role: string;
		statusNumber: null | number;
	};
	const pageSize = 7;

	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] =
		useState<CurrentSettingsType>({
			currentPage: 1,
			role: 'owner',
			statusNumber: null,
		});

	const { data: allRequestsOwner, isLoading } =
		useGetAllRequestsParticipationQuery(currentSettingsAllRequests);

	const [requests, setRequests] = useState<RequestOrganizerCardType[]>([]);

	useEffect(() => {
		if (allRequestsOwner?.results) {
			setRequests(allRequestsOwner?.results);
		}
	}, [allRequestsOwner?.results]);

	const handleDeleteCard = (id: number) => {
		setRequests(
			requests.filter((item) => item.participation_request_id !== id)
		);
	};

	return (
		<section className={styles.container}>
			{isLoading ? (
				<Loader />
			) : requests?.length > 0 ? (
				requests?.map((card: RequestOrganizerCardType) => (
					<RequestOrganizerCard
						key={card.participation_request_id}
						cover_letter={card.cover_letter}
						request_participants={card.request_participants}
						position={card.position}
						project={card.project}
						visible_status={card.visible_status}
						participation_request_id={card.participation_request_id}
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
			<div className={styles.pagination}>
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsAllRequests({
							currentPage: Number(page),
							role: currentSettingsAllRequests.role,
							statusNumber: currentSettingsAllRequests.statusNumber,
						})
					}
					totalCount={allRequestsOwner && allRequestsOwner.count}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			</div>
			<NotificationToastContainer />
		</section>
	);
};
