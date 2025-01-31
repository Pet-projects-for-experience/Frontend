import React from 'react';
import { TContactCardProps } from './types';
import styles from './contact-card.module.scss';
import { MailIcon, MobileIcon, TelegramIcon } from '@/shared/assets';

export const ContactCard: React.FC<TContactCardProps> = ({
	data,
	index,
	onDelete,
}) => {
	return (
		<>
			{data.email && (
				<div className={styles.field}>
					<MailIcon className={styles.field__icon} />
					<div className={styles.field__text}>{data.email}</div>
				</div>
			)}
			{data.telegram_nick && (
				<div className={styles.field}>
					<TelegramIcon className={styles.field__icon} />
					<div className={styles.field__text}>{data.telegram_nick}</div>
				</div>
			)}
			{data.phone_number && (
				<div className={styles.field}>
					<MobileIcon className={styles.field__icon} />
					<div className={styles.field__text}>{data.phone_number}</div>
				</div>
			)}
			<button
				type="button"
				className={styles.deleteButton}
				onClick={() => onDelete(index)}
			/>
		</>
	);
};
