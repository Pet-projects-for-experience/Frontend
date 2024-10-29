'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-links.module.scss';
import IconRight from '@/shared/assets/icons/chevron-right-icon.svg';

const links = [
	{ name: 'Профиль', href: '/profile' },
	{ name: 'Управление аккаунтом', href: '/settings' },
	{ name: 'Мои проекты', href: '/my-projects' },
	{ name: 'Избранные', href: '/favorites'},
	{ name: 'Заявки', href: '/application' },
	{ name: 'Создать проект', href: '/create-project' },
];

export const NavLinks = () => {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(styles.link, {
							[styles.linkActive]: pathname?.includes(link.href),
						})}>
						{link.name}
						<IconRight className={styles.link__iconRight} />
					</Link>
				);
			})}
		</>
	);
};
