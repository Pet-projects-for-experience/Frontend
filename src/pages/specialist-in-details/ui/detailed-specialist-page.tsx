import React from 'react';
import { DetailedSpecialistCard } from '@/widgets/specialist-detailed-card';
import { axiosInstance } from '@/utils/axios-query/axiosInstance';
import { SpecialistInfoQueryType } from './types';
// import styles from './detailed-specialist-page.module.scss';
// import Link from 'next/link';
// import { ArrowLeftIcon } from '@/shared/assets';

export const DetailedSpecialistPage = async ({
	params,
}: {
	params: { params: { id: number } };
}) => {
	const response: SpecialistInfoQueryType = (
		await axiosInstance.get(`/profiles/${params.params.id}/`)
	).data;

	return (
		<>

			{/* <Link href="/specialists" className={styles.linkContainer}>
				<ArrowLeftIcon className={styles.arrow} />
				<p className={styles.link}>Специалисты</p>
			</Link> */}
			<>
				<DetailedSpecialistCard
					avatar={response?.avatar || ''}
					name={response?.name || 'Unknown'}
					userName={response?.username || 'Unknown'}
					readyToParticipate={response?.ready_to_participate || false}
					specialists={response?.specialists || 'Unknown'}
					about={response?.about || 'Unknown'}
					portfolioLink={response?.portfolio_link || 'Unknown'}
					birthday={response?.birthday || 0}
					country={response?.country}
					city={response?.city}
					phoneNumber={response?.phone_number || 'Unknown'}
					telegramNick={response?.telegram_nick || 'Unknown'}
					email={response?.email || 'Unknown'}
					projects={response?.projects || 'Unknown'}
				/>
			</>
		</>
	);
};
