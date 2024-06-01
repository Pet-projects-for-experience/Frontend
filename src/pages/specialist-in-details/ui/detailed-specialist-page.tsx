import { DetailedSpecialistPageType } from './types';
// import styles from './detailed-specialist-page.module.scss';
import React, { FC } from 'react';
import { DetailedSpecialistCard } from '@/widgets/specialist-detailed-card';
export const DetailedSpecialistPage: FC<DetailedSpecialistPageType> = () => {
	//fetch of the data from the api should be in this compoentn

	return (
		<>
			<div>
				<DetailedSpecialistCard
					name={''}
					specialty={''}
					specialization={''}
					socials={[]}
					skills={[]}
					image={''}
				/>
			</div>
		</>
	);
};
