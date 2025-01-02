import clsx from 'clsx';
import styles from './blank-card.module.scss';
import React from 'react';

export const BlankCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <section className={clsx(styles.card, className)}>{children}</section>;
};
