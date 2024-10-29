import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/shared/hooks';
import User from '@/shared/assets/icons/user.svg';
import Projects from '@/shared/assets/icons/my-projects.svg';
import Favorites from '@/shared/assets/icons/heart.svg';
import Exit from '@/shared/assets/icons/logout.svg';
import Xmark from '@/shared/assets/icons/close-icon.svg';

import styles from './menu-profile.module.scss';

export const MenuProfile = ({
	handleLogoutUser,
}: {
	handleLogoutUser: () => void;
}) => {
	const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
	const menuProfileRef = useRef(null);

	useClickOutside(menuProfileRef, () => {
		if (isMenuProfileOpen) setIsMenuProfileOpen(false);
	});
	const handleToggleOpenMenuProfile = () => {
		setIsMenuProfileOpen(!isMenuProfileOpen);
	};

	return (
		<div className={styles.menuProfile}>
			<button
				type="button"
				className={styles.menuProfile__buttonProfile}
				onClick={handleToggleOpenMenuProfile}>
				{isMenuProfileOpen ? (
					<Xmark className={styles.menuProfile__linkProfile} />
				) : (
					<User className={styles.menuProfile__linkProfile} />
				)}
			</button>
			<ul
				className={`${styles.menuProfile__list} ${isMenuProfileOpen ? styles.menuProfile__list_opened : ''}`}
				ref={menuProfileRef}>
				<li className={styles.menuProfile__item}>
					<Link href="/profile" className={styles.menuProfile__link}>
						<User className={styles.menuProfile__item_icon} />
						Личный кабинет
					</Link>
				</li>
				<li className={styles.menuProfile__item}>
					<Link href="/my-projects" className={styles.menuProfile__link}>
						<Projects className={styles.menuProfile__item_icon} />
						Moи проекты
					</Link>
				</li>
				<li className={styles.menuProfile__item}>
					<Link href="/favorites/projects" className={styles.menuProfile__link}>
						<Favorites className={styles.menuProfile__item_icon} />
						Избранные проекты
					</Link>
				</li>
				<li className={styles.menuProfile__item}>
					<button
						className={styles.menuProfile__link}
						onClick={handleLogoutUser}>
						<Exit className={styles.menuProfile__item_icon} />
						Выход
					</button>
				</li>
			</ul>
		</div>
	);
};
