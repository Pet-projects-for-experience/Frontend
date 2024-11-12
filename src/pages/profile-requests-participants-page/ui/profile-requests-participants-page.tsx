'use client';
import React, { useState } from 'react';
import {
	useGetAllRequestsParticipationQuery,
	useGetFilterRequestsParticipationQuery,
} from '@/services/ProjectService';
import { RequestParticipantCard } from '@/widgets/request-participant-card';
import { MainButton } from '@/shared/ui';
import { Loader } from '@/shared/ui';
import { RequestParticipantCardType } from '@/widgets/request-participant-card/ui/types';
import { Pagination } from '@/entities';
import styles from './profile-requests-participants-page.module.scss';

export const ProfileRequestsParticipants = () => {
	const pageSize = 7;
	const [isUnderConsiderationRequests, setIsUnderConsiderationRequests] =
		useState(false);
	const [isAcceptedRequests, setIsAcceptedRequests] = useState(false);
	const [isRejectedRequests, setIsRejectedRequests] = useState(false);
	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] = useState({
		currentPage: 1,
		query: '',
		role: 'participation',
	});
	const [currentSettingsFilterRequests, setCurrentSettingsFilterRequests] =
		useState({
			page: 1,
			queryValue: '',
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
			queryValue: '',
			roleStatus: 'participation',
			statusNumber: 2,
		});

	const { data: requestsRejectedParticipation } =
		useGetFilterRequestsParticipationQuery({
			page: 1,
			queryValue: '',
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
					isActive={isUnderConsiderationRequests}>
					На рассмотрении
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => setIsAcceptedRequests(!isAcceptedRequests)}
					isActive={isAcceptedRequests}>
					Приняты
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => setIsRejectedRequests(!isRejectedRequests)}
					isActive={isRejectedRequests}>
					Отклонены
				</MainButton>
			</div>
			<div className={styles.inputSearch}>
			</div>
			<div className={styles.cards}>
				{isLoading ? (
					<Loader />
				) : isUnderConsiderationRequests ? (
					requestsConsiderationParticipation?.results?.map(
						(card: RequestParticipantCardType) => (
							<RequestParticipantCard
								key={card.id}
								request_status={card.request_status}
								project={card.project}
								position={card.position}
								cover_letter={card.cover_letter}
							/>
						)
					)
				) : isRejectedRequests ? (
					requestsRejectedParticipation?.results?.map(
						(card: RequestParticipantCardType) => (
							<RequestParticipantCard
								key={card.id}
								request_status={card.request_status}
								project={card.project}
								position={card.position}
								cover_letter={card.cover_letter}
							/>
						)
					)
				) : isAcceptedRequests ? (
					requestsAcceptedParticipation?.results?.map(
						(card: RequestParticipantCardType) => (
							<RequestParticipantCard
								key={card.id}
								request_status={card.request_status}
								project={card.project}
								position={card.position}
								cover_letter={card.cover_letter}
							/>
						)
					)
				) : (
					requestsParticipation?.results?.map(
						(card: RequestParticipantCardType) => (
							<RequestParticipantCard
								key={card.id}
								request_status={card.request_status}
								project={card.project}
								position={card.position}
								cover_letter={card.cover_letter}
							/>
						)
					)
				)}
			</div>
			{isUnderConsiderationRequests ? (
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsFilterRequests({
							page: Number(page),
							queryValue: currentSettingsFilterRequests.queryValue,
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
							queryValue: currentSettingsFilterRequests.queryValue,
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
							queryValue: currentSettingsFilterRequests.queryValue,
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
							query: currentSettingsAllRequests.query,
							role: currentSettingsAllRequests.role,
						})
					}
					totalCount={requestsParticipation && requestsParticipation.count}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			)}
		</section>
	);
};
