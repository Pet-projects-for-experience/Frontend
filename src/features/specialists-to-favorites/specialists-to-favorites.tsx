'use client';

import React from 'react';
import { LikeButton } from '@/shared/ui';
export const SpecialistsToFavoritesFeature = () => {
	return (
		<>
			<LikeButton
				variant="secondary"
				isActiveLike={false}
				isPopupOpen={false}
				handleLikeButton={(evt) => {evt.preventDefault()}}
				setIsActiveLike={() => {}}
				setIsPopupOpen={() => {}}
			/>
		</>
	);
};
