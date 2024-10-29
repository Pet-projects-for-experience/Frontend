/* eslint-disable camelcase */
'use client';
import React, { useState, FC } from 'react';
import { LikeButton } from '@/shared/ui';
import { useAddFavoriteProjectMutation } from '@/services/ProjectService';
import { useDeleteFavoriteProjectMutation } from '@/services/ProjectService';
import { LikeButtonType } from '@/shared/types/like-button';

export const ProjectsToFavoritesFeature: FC<LikeButtonType> = ({
	id,
	name,
	description,
	started,
	ended,
	busyness,
	directions,
	link,
	phone_number,
	telegram_nick,
	email,
	project_specialists,
	status,
	variant,
	disabled,
	favorite,
}) => {
	const [isActiveLike, setIsActiveLike] = useState(favorite);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [addFavoriteProject] = useAddFavoriteProjectMutation();
	const [deleteFavoriteProject] = useDeleteFavoriteProjectMutation();
	const token = localStorage.getItem('token');
	const handleOpenPopup = () => {
		setIsPopupOpen(true);
	};

	const handleActiveLikeButton =
		(/*evt: React.MouseEvent | React.TouchEvent*/) => {
			//evt.preventDefault();
			if (token) {
				addFavoriteProject({
					id,
					name,
					description,
					started,
					ended,
					busyness,
					directions,
					link,
					phone_number,
					telegram_nick,
					email,
					project_specialists,
					status,
				})
					.unwrap()
					.then(() => {
						setIsActiveLike(true);
						//console.log('like');
					})
					.catch((error) => {
						console.log('errorCatch', error);
					});
			} else {
				handleOpenPopup();
			}
		};

	const handleRemoveProject = (id: number) => {
		deleteFavoriteProject(id)
			.unwrap()
			.then(() => {
				setIsActiveLike(false);
			})
			.catch((error) => {
				console.log('errorCatch', error);
			});
	};

	const toggleButtonLike = () => {
		if (isActiveLike) {
			handleRemoveProject(id);
		} else {
			handleActiveLikeButton();
		}
	};
	return (
		<LikeButton
			variant={variant}
			disabled={disabled}
			handleLikeButton={toggleButtonLike}
			isActiveLike={isActiveLike}
			setIsActiveLike={setIsActiveLike}
			isPopupOpen={isPopupOpen}
			setIsPopupOpen={setIsPopupOpen}
		/>
	);
};
