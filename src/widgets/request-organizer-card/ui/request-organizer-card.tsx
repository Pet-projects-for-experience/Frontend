/* eslint-disable camelcase */
'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import IconUp from '@/shared/assets/icons/chevron-up.svg';
import IconDown from '@/shared/assets/icons/chevron-down.svg';
import clsx from 'clsx';
import { AvatarImage } from '@/entities/_avatar-image';
import parse from 'html-react-parser';
import { SpecialistsToFavoritesFeature } from '@/features';
import { AnswerRequestOrganizerFeature } from '@/features';
import { RequestOrganizerCardType } from './types';
import { Tooltip } from '@/shared/assets';
import styles from './request-organizer-card.module.scss';

export const RequestOrganizerCard: FC<RequestOrganizerCardType> = ({
	cover_letter,
	position,
	project,
	request_participants,
	visible_status,
	participation_request_id,
	request_status,
}) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<article className={styles.specialist}>
			<div className={styles.specialist__info}>
				<h1 className={styles.info__name}>
					{project.name}, {position.profession.specialization}
				</h1>
				<div className={styles.info__person}>
					<div className={styles.info__personData}>
						<AvatarImage imageURL={request_participants.avatar} />
						<div className={styles.info__personDescription}>
							<h2 className={styles.info__name}>{request_participants.name}</h2>
							<p className={styles.info__nickname}>
								@{request_participants.username}
							</p>
						</div>
						{visible_status === 1 ? (
							<Link
								className={styles.info__personLink}
								href={`/specialists/${request_participants.user_id}`}
							/>
						) : (
							<div className={styles.hint}>
								<div className={styles.hintOverlay}>
									<span className={styles.hintSpan}>Профиль скрыт</span>
									<Tooltip className={styles.hintImage} />
								</div>
							</div>
						)}
					</div>

					<div className={styles.info__likeContainer}>
						<SpecialistsToFavoritesFeature />
					</div>
				</div>

				<div className={styles.menu}>
					<div
						className={styles.menuTitle}
						onClick={() => {
							setIsOpenMenu(!isOpenMenu);
						}}>
						<h3 className={styles.titleCover}>Сопроводительное письмо</h3>
						{isOpenMenu ? (
							<IconUp className={styles.menuIcon} />
						) : (
							<IconDown className={styles.menuIcon} />
						)}
					</div>
					<div
						className={clsx(styles.menuCover, {
							[styles.menuCover_visible]: isOpenMenu,
						})}>
						<h4 className={styles.menuCover__text}>{parse(cover_letter)}</h4>
					</div>
				</div>
				<AnswerRequestOrganizerFeature
					id={participation_request_id}
					participant_user_id={request_participants.user_id}
					request_status={request_status as number}
				/>
			</div>
		</article>
	);
};
