'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-links.module.scss';

const links = [
	{ name: 'Профиль', href: '/profile' },
	{ name: 'Управление аккаунтом', href: '/settings' },
	{ name: 'Проекты', href: '/my-projects' },
	{ name: 'Избранные проекты', href: '/selected-projects' },
	{ name: 'Заявки', href: '/' },
	{ name: 'Создать проекты', href: '/' },
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
							[styles.linkActive]: pathname === link.href,
						})}
						>
						{link.name}
					</Link>
				);
			})}
		</>
	);
};
