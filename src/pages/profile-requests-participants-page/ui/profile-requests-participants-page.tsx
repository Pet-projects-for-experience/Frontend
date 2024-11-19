'use client';
import React, { useState /*useEffect*/ } from 'react';
import {
	useGetAllRequestsParticipationQuery,
	useGetFilterRequestsParticipationQuery,
} from '@/services/ProjectService';
//import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { MainButton } from '@/shared/ui';
import { Loader } from '@/shared/ui';
//import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
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
	const [currentSettingsFilterRequests, setCurrentSettingsFilterRequests] =
		useState({
			page: 1,
			roleStatus: 'participation',
			statusNumber: 1,
		});

	const { data: requestsParticipation, isLoading } =
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

	//console.log(requestsParticipation);
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
					// requestsConsiderationParticipation?.results?.map(
					// 	(card: RequestParticipantCardType) => (
					// 		<RequestParticipantCard
					// 			key={card.id}
					// 			request_status={card.request_status}
					// 			project={card.project}
					// 			position={card.position}
					// 			cover_letter={card.cover_letter}
					// 			id={card.id}
					// 		/>
					// 	)
					// )
					<ListRequestsParticipants
						array={requestsConsiderationParticipation?.results}
					/>
				) : isRejectedRequests ? (
					// requestsRejectedParticipation?.results?.map(
					// 	(card: RequestParticipantCardType) => (
					// 		<RequestParticipantCard
					// 			key={card.id}
					// 			request_status={card.request_status}
					// 			project={card.project}
					// 			position={card.position}
					// 			cover_letter={card.cover_letter}
					// 			id={card.id}
					// 		/>
					// 	)
					// )
					<ListRequestsParticipants
						array={requestsRejectedParticipation?.results}
					/>
				) : isAcceptedRequests ? (
					// requestsAcceptedParticipation?.results?.map(
					// 	(card: RequestParticipantCardType) => (
					// 		<RequestParticipantCard
					// 			key={card.id}
					// 			request_status={card.request_status}
					// 			project={card.project}
					// 			position={card.position}
					// 			cover_letter={card.cover_letter}
					// 			id={card.id}
					// 		/>
					// 	)
					// )
					<ListRequestsParticipants
						array={requestsAcceptedParticipation?.results}
					/>
				) : (
					// requestsParticipation?.results?.map(
					// 	(card: RequestParticipantCardType) => (
					// 		<RequestParticipantCard
					// 			key={card.id}
					// 			request_status={card.request_status}
					// 			project={card.project}
					// 			position={card.position}
					// 			cover_letter={card.cover_letter}
					// 			id={card.id}
					// 		/>
					// 	)
					// )
					<ListRequestsParticipants array={requestsParticipation?.results} />
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
					totalCount={requestsParticipation && requestsParticipation.count}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			)}
			<NotificationToastContainer />
		</section>
	);
};
