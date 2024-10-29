'use client';

import React from 'react';
//import { InputSearch } from '@/shared/ui';
import styles from './profile-favorites-specialists-page.module.scss';

export const FavoritesSpecialists = () => {
	return (
		<>
			<section className={styles.favoritesSpecialists}>
				{/* <div className={styles.inputSearch}>
					<InputSearch search={() => {}} onChange={() => {}} />
				</div> */}
				<div className={styles.textContainer}>
					<p className={styles.text}>Здесь появятся избранные специалисты</p>
					<span className={styles.subtitle}>
						Сохраните понравившиеся проекты из раздела «Специалисты»
					</span>
				</div>
			</section>
		</>
	);
};
