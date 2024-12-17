'use client';

import React, { useState } from 'react';
import IconUp from '@/shared/assets/icons/chevron-up.svg';
import IconDown from '@/shared/assets/icons/chevron-down.svg';
import clsx from 'clsx';
import { AvatarImage } from '@/entities/_avatar-image';
//import parse from 'html-react-parser';
import { ActivityIcon /*ActivityIconRed*/ } from '@/shared/assets';
import { SpecialistsToFavoritesFeature } from '@/features';
import styles from './request-organizer-card.module.scss';
import { MainButton } from '@/shared/ui';

export const RequestOrganizerCard = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<article className={styles.specialist}>
			<div className={styles.specialist__info}>
				<h1 className={styles.info__name}>Название проекта, UX/UI designer</h1>
				<div className={styles.info__person}>
					<AvatarImage
						imageURL={
							'https://avatars.mds.yandex.net/i?id=679720f2a94327342bb6a0e160ce7bb8_l-8497208-images-thumbs&n=13'
						}
					/>
					<div className={styles.info__personDescription}>
						<div className={styles.info__personStatus}>
							{/* {readyToParticipate ? (
									<>
										<ActivityIcon className={styles.info__icon}/>
										<p className={styles.info__statusTitle}>
											готов(а) к участию в проекте
										</p>
									</>
								) : (
									<>
										<ActivityIconRed />
										<p className={styles.info__statusTitle}>
											не готов(а) к участию в проекте
										</p>
									</>
								)} */}

							<>
								<ActivityIcon className={styles.info__icon} />
								<p className={styles.info__statusTitle}>
									готов(а) к участию в проектах
								</p>
							</>
						</div>
						<h2 className={styles.info__name}>{'Длиннофамильная Екатерина'}</h2>
						<p className={styles.info__nickname}>@{'nickname'}</p>
					</div>
					<div className={styles.info__likeContainer}>
						<SpecialistsToFavoritesFeature />
					</div>
				</div>

				<div className={styles.info__role}>
					<div>
						UX/UI designer / UX/UI дизайнер, Middle
						{/* {specialists[0] &&
								`${specialists[0].profession.specialization} \t/\t`}
							{clsx(
								specialists[0] && specialists[0].level === 1 && '\t Junior',
								specialists[0] && specialists[0].level === 2 && '\t Middle',
								specialists[0] && specialists[0].level === 3 && '\t Senior',
								specialists[0] && specialists[0].level === 4 && '\t Lead'
							)} */}
					</div>
					<ul className={styles.info__skillsList}>
						{/* {specialists[0]?.skills.map((skill) => {
							return (
								<li className={styles.info__skill} key={skill.id}>
									{skill.name}
								</li>
							);
						})} */}
						<li className={styles.info__skill}>Bootstrap</li>
						<li className={styles.info__skill}>Figma</li>
					</ul>
				</div>

				<div className={styles.info__role}>
					<div>
						UX/UI designer / UX/UI дизайнер, Middle
						{/* {specialists[1] &&
								`${specialists[1]?.profession?.specialization} \t/\t`}
							{clsx(
								specialists[1] && specialists[1].level === 1 && '\t Junior',
								specialists[1] && specialists[1].level === 2 && '\t Middle',
								specialists[1] && specialists[1].level === 3 && '\t Senior',
								specialists[1] && specialists[1].level === 4 && '\t Lead'
							)} */}
					</div>
					<ul className={styles.info__skillsList}>
						{/* {specialists[1]?.skills?.map((skill) => {
							return (
								<li className={styles.info__skill} key={skill.id}>
									{skill.name}
								</li>
							);
						})} */}
						<li className={styles.info__skill}>Bootstrap</li>
						<li className={styles.info__skill}>Figma</li>
					</ul>
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
						<h4 className={styles.menuCover__text}>yiyiy</h4>
					</div>
				</div>
				<div className={styles.buttons}>
					<MainButton variant='primary' width='regular'>Принять</MainButton>
					<MainButton variant='secondary' width='regular'>Отклонить</MainButton>
				</div>
			</div>
		</article>
	);
};
