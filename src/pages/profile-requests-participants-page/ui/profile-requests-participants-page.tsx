'use client';
import React, { useState } from 'react';
import {
	useGetAllRequestsParticipationQuery,
	useGetFilterRequestsParticipationQuery,
} from '@/services/ProjectService';
import { MainButton } from '@/shared/ui';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/entities';
import { NotificationToastContainer } from '@/widgets/notification-toast';
import { ListRequestsParticipants } from '@/widgets/list-requests-participants';
import styles from './profile-requests-participants-page.module.scss';

export const ProfileRequestsParticipants = () => {
	const pageSize = 7;
	const [isUnderConsiderationRequests, setIsUnderConsiderationRequests] = useState(false);
	const [isAcceptedRequests, setIsAcceptedRequests] = useState(false);
	const [isRejectedRequests, setIsRejectedRequests] = useState(false);
	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] = useState({
		currentPage: 1,
		role: 'participation',
	});
	const [currentSettingsFilterRequests, setCurrentSettingsFilterRequests] =
		useState({
			page: 1,
			roleStatus: 'participation',
			statusNumber: 1,
		});

	const { data: allRequestsParticipation, isLoading } =
		useGetAllRequestsParticipationQuery(currentSettingsAllRequests);

	const { data: requestsConsiderationParticipation } =
		useGetFilterRequestsParticipationQuery(currentSettingsFilterRequests);

	const { data: requestsAcceptedParticipation } =
		useGetFilterRequestsParticipationQuery({
			page: 1,
			roleStatus: 'participation',
			statusNumber: 2,
		});

	const { data: requestsRejectedParticipation } =
		useGetFilterRequestsParticipationQuery({
			page: 1,
			roleStatus: 'participation',
			statusNumber: 3,
		});

	//console.log(allRequestsParticipation);
	return (
		<section className={styles.requests}>
			<div className={styles.buttons}>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() =>
						setIsUnderConsiderationRequests(!isUnderConsiderationRequests)
					}
					isActive={isUnderConsiderationRequests}
					disabled={isAcceptedRequests === true || isRejectedRequests === true}>
					На рассмотрении
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => setIsAcceptedRequests(!isAcceptedRequests)}
					isActive={isAcceptedRequests}
					disabled={
						isRejectedRequests === true || isUnderConsiderationRequests === true
					}>
					Приняты
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => setIsRejectedRequests(!isRejectedRequests)}
					isActive={isRejectedRequests}
					disabled={
						isAcceptedRequests === true || isUnderConsiderationRequests === true
					}>
					Отклонены
				</MainButton>
			</div>
			<div className={styles.cards}>
				{isLoading ? (
					<Loader />
				) : isUnderConsiderationRequests ? (
					<ListRequestsParticipants
						arrayRequests={requestsConsiderationParticipation?.results}
					/>
				) : isRejectedRequests ? (
					<ListRequestsParticipants
						arrayRequests={requestsRejectedParticipation?.results}
					/>
				) : isAcceptedRequests ? (
					<ListRequestsParticipants
						arrayRequests={requestsAcceptedParticipation?.results}
					/>
				) : (
					<ListRequestsParticipants
						arrayRequests={allRequestsParticipation?.results}
					/>
				)}
			</div>
			{isUnderConsiderationRequests ? (
				<Pagination
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
				/>
			) : isRejectedRequests ? (
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsFilterRequests({
							page: Number(page),
							roleStatus: currentSettingsFilterRequests.roleStatus,
							statusNumber: currentSettingsFilterRequests.statusNumber,
						})
					}
					totalCount={
						requestsRejectedParticipation && requestsRejectedParticipation.count
					}
					currentPage={currentSettingsFilterRequests.page}
					pageSize={pageSize}
				/>
			) : isAcceptedRequests ? (
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsFilterRequests({
							page: Number(page),
							roleStatus: currentSettingsFilterRequests.roleStatus,
							statusNumber: currentSettingsFilterRequests.statusNumber,
						})
					}
					totalCount={
						requestsAcceptedParticipation && requestsAcceptedParticipation.count
					}
					currentPage={currentSettingsFilterRequests.page}
					pageSize={pageSize}
				/>
			) : (
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsAllRequests({
							currentPage: Number(page),
							role: currentSettingsAllRequests.role,
						})
					}
					totalCount={allRequestsParticipation && allRequestsParticipation.count}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			)}
			<NotificationToastContainer />
		</section>
	);
};
