/* eslint-disable prefer-arrow-callback */
'use client';
import React, { useState } from 'react';
import {
	useGetAllRequestsParticipationQuery,
	useLazyGetFilterRequestsParticipationQuery,
} from '@/services/ProjectService';
import { MainButton } from '@/shared/ui';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/entities';
import { NotificationToastContainer } from '@/widgets/notification-toast';
import { ListRequestsParticipants } from '@/widgets/list-requests-participants';
import styles from './profile-requests-participants-page.module.scss';

export const ProfileRequestsParticipants = () => {
	const pageSize = 7;

	const [isConsiderationRequests, setIsConsiderationRequests] = useState(false);
	const [isAcceptedRequests, setIsAcceptedRequests] = useState(false);
	const [isRejectedRequests, setIsRejectedRequests] = useState(false);

	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] = useState({
		currentPage: 1,
		role: 'participation',
	});

	const [settingsConsiderationRequests, setSettingsConsiderationRequests] =
		useState({
			page: 1,
			roleStatus: 'participation',
			statusNumber: 1,
		});

	const [settingsAcceptedRequests, /*setSettingsAcceptedRequests*/] = useState({
		page: 1,
		roleStatus: 'participation',
		statusNumber: 2,
	});

	const [settingsRejectedRequests, setSettingsRejectedRequests] = useState({
		page: 1,
		roleStatus: 'participation',
		statusNumber: 3,
	});

	const { data: allRequestsParticipation, isLoading } =
		useGetAllRequestsParticipationQuery(currentSettingsAllRequests);
	const [
		handleClickConsiderationRequests,
		{ data: requestsConsiderationParticipation },
	] = useLazyGetFilterRequestsParticipationQuery();
	const [handleClickAcceptedRequests, { data: requestsAcceptedParticipation }] =
		useLazyGetFilterRequestsParticipationQuery();
	const [handleClickRejectedRequests, { data: requestsRejectedParticipation }] =
		useLazyGetFilterRequestsParticipationQuery();

	return (
		<section className={styles.requests}>
			<div className={styles.buttons}>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => {
						if (!isConsiderationRequests) {
							handleClickConsiderationRequests(settingsConsiderationRequests);
							setIsConsiderationRequests(true);
						} else {
							setIsConsiderationRequests(false);
						}
					}}
					isActive={isConsiderationRequests}
					disabled={isAcceptedRequests === true || isRejectedRequests === true}>
					На рассмотрении
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => {
						if (!isAcceptedRequests) {
							handleClickAcceptedRequests(settingsAcceptedRequests);
							setIsAcceptedRequests(true);
						} else {
							setIsAcceptedRequests(false);
						}
					}}
					isActive={isAcceptedRequests}
					disabled={
						isRejectedRequests === true || isConsiderationRequests === true
					}>
					Приняты
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => {
						if (!isRejectedRequests) {
							handleClickRejectedRequests(settingsRejectedRequests);
							setIsRejectedRequests(true);
						} else {
							setIsRejectedRequests(false);
						}
					}}
					isActive={isRejectedRequests}
					disabled={
						isAcceptedRequests === true || isConsiderationRequests === true
					}>
					Отклонены
				</MainButton>
			</div>
			<div className={styles.cards}>
				{isLoading ? (
					<Loader />
				) : isConsiderationRequests ? (
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
			{isConsiderationRequests ? (
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
							statusNumber: settingsRejectedRequests.statusNumber,
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
						handleClickAcceptedRequests({
							page: Number(page),
							roleStatus: settingsRejectedRequests.roleStatus,
							statusNumber: 2,
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
