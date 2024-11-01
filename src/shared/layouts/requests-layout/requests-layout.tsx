'use client';
import React from 'react';
import { ProfileLink } from '@/shared/ui/profile-link/profile-link';
import { NavigationMenu } from '@/shared/ui';
import styles from './requests-layout.module.scss';

export const RequestsLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			<ProfileLink title="Избранные" />
			<div className={styles.requests}>
				<NavigationMenu
					linksArray={[
						{ name: 'Участник', href: '/requests/participant' },
						{ name: 'Организатор', href: '/requests/organizer' },
					]}
				/>
				{children}
			</div>
		</>
	);
};
