import React from 'react';
import { RequestOrganizerCard } from '@/widgets/request-organizer-card';
import styles from './profile-requests-organizers-page.module.scss';

export const ProfileRequestsOrganizers = () => {
	return (
		<section className={styles.container}>
			<RequestOrganizerCard/>
			<RequestOrganizerCard/>
		</section>
	);
};
