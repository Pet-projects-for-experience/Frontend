'use client';
import React from 'react';
import { ProfileLink } from '@/shared/ui/profile-link/profile-link';
import { NavigationMenu } from '@/shared/ui';
import styles from './favorites-layout.module.scss';

export const FavoritesLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			<ProfileLink title="Избранные" />
			<div className={styles.favorites}>
				<NavigationMenu
					linksArray={[
						{ name: 'Специалисты', href: '/favorites/specialists' },
						{ name: 'Проекты', href: '/favorites/projects' },
					]}
				/>
				{children}
			</div>
		</>
	);
};
