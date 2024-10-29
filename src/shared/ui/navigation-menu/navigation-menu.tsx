'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import styles from './navigation-menu.module.scss';

export const NavigationMenu = ({
	linksArray,
}: {
	linksArray: { name: string; href: string }[];
}) => {
	const pathname = usePathname();

	return (
		<div className={styles.linksContainer}>
			{linksArray.map((link) => {
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(styles.link, {
							[styles.linkActive]: pathname === link.href,
						})}>
						{link.name}
					</Link>
				);
			})}
		</div>
	);
};
