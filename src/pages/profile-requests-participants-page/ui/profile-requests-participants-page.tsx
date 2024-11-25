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
	const [isUnderConsiderationRequests, setIsUnderConsiderationRequests] =
		useState(false);
	const [isAcceptedRequests, setIsAcceptedRequests] = useState(false);
	const [isRejectedRequests, setIsRejectedRequests] = useState(false);
	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] = useState({
		currentPage: 1,
		role: 'participation',
	});

	const { data: allRequestsParticipation, isLoading } = useGetAllRequestsParticipationQuery(currentSettingsAllRequests);

	const [settingsConsiderationRequests, setSettingsConsiderationRequests] = useState({
		page: 1,
		roleStatus: 'participation',
		statusNumber: 1,
	});

	const [settingsAcceptedRequests, setSettingsAcceptedRequests] = useState({
		page: 1,
		roleStatus: 'participation',
		statusNumber: 2,
	});

	const [settingsRejectedRequests, setSettingsRejectedRequests] = useState({
		page: 1,
		roleStatus: 'participation',
		statusNumber: 3,
	});

	const { data: requestsConsiderationParticipation } = useGetFilterRequestsParticipationQuery(settingsConsiderationRequests);
	const { data: requestsAcceptedParticipation } = useGetFilterRequestsParticipationQuery(settingsAcceptedRequests);
	const { data: requestsRejectedParticipation } = useGetFilterRequestsParticipationQuery(settingsRejectedRequests);

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
						setSettingsConsiderationRequests({
							page: Number(page),
							roleStatus: settingsConsiderationRequests.roleStatus,
							statusNumber: settingsConsiderationRequests.statusNumber,
						})
					}
					totalCount={
						requestsConsiderationParticipation &&
						requestsConsiderationParticipation.count
					}
					currentPage={settingsConsiderationRequests.page}
					pageSize={pageSize}
				/>
			) : isRejectedRequests ? (
				<Pagination
					onPageChange={(page) =>
						setSettingsRejectedRequests({
							page: Number(page),
							roleStatus: settingsRejectedRequests.roleStatus,
							statusNumber: (settingsRejectedRequests.statusNumber = 2),
						})
					}
					totalCount={
						requestsRejectedParticipation && requestsRejectedParticipation.count
					}
					currentPage={settingsRejectedRequests.page}
					pageSize={pageSize}
				/>
			) : isAcceptedRequests ? (
				<Pagination
					onPageChange={(page) =>
						setSettingsAcceptedRequests({
							page: Number(page),
							roleStatus: settingsAcceptedRequests.roleStatus,
							statusNumber: settingsAcceptedRequests.statusNumber,
						})
					}
					totalCount={
						requestsAcceptedParticipation && requestsAcceptedParticipation.count
					}
					currentPage={settingsAcceptedRequests.page}
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
					totalCount={
						allRequestsParticipation && allRequestsParticipation.count
					}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			)}
			<NotificationToastContainer />
		</section>
	);
};
