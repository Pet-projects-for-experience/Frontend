/* eslint-disable prefer-arrow-callback */
'use client';
import React, { useState } from 'react';
import { useGetAllRequestsParticipationQuery } from '@/services/ProjectService';
import { MainButton } from '@/shared/ui';
import { Loader } from '@/shared/ui';
import { Pagination } from '@/entities';
import { NotificationToastContainer } from '@/widgets/notification-toast';
import { ListRequestsParticipants } from '@/widgets/list-requests-participants';
import styles from './profile-requests-participants-page.module.scss';

export const ProfileRequestsParticipants = () => {
	type CurrentSettingsType = {
		currentPage: number;
		role: string;
		statusNumber: null | number;
	};
	const pageSize = 7;

	const [currentSettingsAllRequests, setCurrentSettingsAllRequests] =
		useState<CurrentSettingsType>({
			currentPage: 1,
			role: 'participation',
			statusNumber: null,
		});

	const { data: allRequestsParticipation, isLoading } =
		useGetAllRequestsParticipationQuery(currentSettingsAllRequests);

	const isButtonActive = (n: number) => {
		return currentSettingsAllRequests.statusNumber === n;
	};

	const handleChangeFilterButton = (n: number) => {
		if (currentSettingsAllRequests.statusNumber !== n) {
			setCurrentSettingsAllRequests({
				currentPage: 1,
				role: 'participation',
				statusNumber: n,
			});
		} else {
			setCurrentSettingsAllRequests({
				currentPage: 1,
				role: 'participation',
				statusNumber: null,
			});
		}
	};

	return (
		<section className={styles.requests}>
			<div className={styles.buttons}>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => handleChangeFilterButton(1)}
					isActive={isButtonActive(1)}>
					На рассмотрении
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => handleChangeFilterButton(2)}
					isActive={isButtonActive(2)}>
					Приняты
				</MainButton>
				<MainButton
					type="button"
					variant="secondary"
					width="regular"
					onClick={() => handleChangeFilterButton(3)}
					isActive={isButtonActive(3)}>
					Отклонены
				</MainButton>
			</div>
			<div className={styles.cards}>
				{isLoading ? (
					<Loader />
				) : (
					<ListRequestsParticipants
						arrayRequests={allRequestsParticipation?.results}
					/>
				)}
			</div>
			<div className={styles.pagination}>
				<Pagination
					onPageChange={(page) =>
						setCurrentSettingsAllRequests({
							currentPage: Number(page),
							role: currentSettingsAllRequests.role,
							statusNumber: currentSettingsAllRequests.statusNumber,
						})
					}
					totalCount={
						allRequestsParticipation && allRequestsParticipation.count
					}
					currentPage={currentSettingsAllRequests.currentPage}
					pageSize={pageSize}
				/>
			</div>
			<NotificationToastContainer />
		</section>
	);
};
