import React from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { SideNav } from '@/entities/side-nav';
import styles from './profile-layout.module.scss';

export const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<Header isLoggedIn />
				<div className={styles.wrapper__title}>
					<h2 className={styles.wrapper__titleText}>Личный кабинет</h2>
				</div>

				<div className={styles.container}>
					<div className={styles.sideNav}>
						<SideNav />
					</div>
					<div>{children}</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
