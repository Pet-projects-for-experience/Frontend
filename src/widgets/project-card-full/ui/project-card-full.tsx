/* eslint-disable camelcase */
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import parse from 'html-react-parser';
import { CalendarIcon, ActivityIcon } from '@/shared/assets'; // ,
import { MainButton } from '@/shared/ui';
import { useMediaQuery } from '@/shared/hooks';
import { ProjectCardFullType } from './types';
import { ProjectsToFavoritesFeature } from '@/features';
import { getColorTag, getStartDate, getEndDate } from '@/shared/utils';
import Link from 'next/link';
import { InviteToProjectFeature } from '@/features';
import { PopUp } from '@/shared/ui';
import styles from './project-card-full.module.scss';

export const ProjectCardFull: FC<ProjectCardFullType> = ({
	id,
	description,
	started,
	ended,
	name,
	directions,
	project_status,
	recruitment_status,
	project_specialists,
	busyness,
	link,
	phone_number,
	telegram_nick,
	email,
	is_favorite,
}) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width:779px)');
	const startDate = getStartDate(started);
	const endDate = getEndDate(ended);
	const token = localStorage.getItem('token');
	const router = useRouter();

	return (
		<article className={styles.container}>
			{/* <Link
				href={`projects/${id}`}
				target="_blank"
				className={styles.linkProject}> */}
				
			<div className={styles.topInfo}>
				<div className={styles.activeStateContainer}>
					<ActivityIcon
						className={clsx(
							styles.activeStateIcon,
							project_status === 'Активен' && styles.activeStateIcon_type_active,
							project_status === 'Завершен' && styles.activeStateIcon_type_inactive
						)}
					/>
					<div className={styles.activeStateText}>
						{project_status === 'Активен' ? 'активный' : 'завершенный'}
					</div>
				</div>
				<div className={styles.like}>
					<ProjectsToFavoritesFeature
						variant="secondary"
						id={id}
						name={name}
						description={description}
						started={started}
						ended={ended}
						busyness={busyness as number}
						directions={directions}
						link={link}
						phone_number={phone_number}
						telegram_nick={telegram_nick}
						email={email}
						project_specialists={project_specialists}
						project_status={project_status}
						favorite={is_favorite}
					/>
				</div>
			</div>
			<div>
				<Link
					href={`../projects/${id}`}
					target="_blank"
					className={styles.linkProject}>
					<div className={styles.calendarContainer}>
						<CalendarIcon className={styles.calendarIcon} />
						<div
							className={styles.calendarText}>{`${startDate}-${endDate}`}</div>
					</div>
					<h2 className={styles.title}>{name}</h2>
					{directions?.map((item) => {
						return (
							<h3 key={item.id} className={styles.subtitle}>
								{item.name}
							</h3>
						);
					})}

					{!isMobile && <span className={styles.mainText}>{parse(description)}</span>}
					{project_specialists.length > 0 ? (
						<p className={styles.groupName}>Специальности</p>
					) : null}
					<ul className={styles.professionsList}>
						{project_specialists?.map((item) => (
							<li
								className={styles.profession}
								style={{
									backgroundColor: `${getColorTag(item.profession.speciality)}`,
								}}
								key={item.id}>
								{item.profession?.specialization}
							</li>
						))}
					</ul>
					{project_specialists.length > 0 ? (
						<p className={styles.groupName}>Навыки</p>
					) : null}
					<ul className={styles.skillsList}>
						{project_specialists.map((item) =>
							item.skills.map((skill) => (
								<li className={styles.skill} key={skill.id}>
									{skill.name}
								</li>
							))
						)}
					</ul>
				</Link>
			</div>
			{/* </Link>  */}
			{recruitment_status === 'Набор открыт' && (
				<div className={styles.buttonRespond}>
					<MainButton
						variant="primary"
						width="regular"
						type="button"
						onClick={() => setIsPopupOpen(true)}>
						Откликнуться
					</MainButton>
				</div>
			)}
			{token ? (
				<PopUp
					visible={isPopupOpen}
					title={name}
					onClose={() => setIsPopupOpen(false)}>
					<InviteToProjectFeature
						projectId={id}
						project_specialists={project_specialists}
					/>
				</PopUp>
			) : (
				<PopUp
					visible={isPopupOpen}
					title={'Вход в систему'}
					onClose={() => setIsPopupOpen(false)}>
					<span className={styles.popupSubtitle}>
						Чтобы совершить действие, необходимо войти в систему
					</span>
					<div className={styles.popupButton}>
						<MainButton
							variant="primary"
							width="regular"
							type="button"
							onClick={(evt: React.MouseEvent | React.TouchEvent) => {
								evt.preventDefault();
								router.push('/login');
							}}>
							Авторизоваться
						</MainButton>
					</div>
				</PopUp>
			)}
		</article>
	);
};
