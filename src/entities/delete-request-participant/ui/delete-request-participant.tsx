'use client';

import React, { useState } from 'react';
import { MainButton } from '@/shared/ui';
import { PopUp } from '@/shared/ui';
import styles from './delete-request-participant.module.scss';
export const DeleteRequestParticipant = ({
    id,
	handleDeleteButton,
}: {
    id: number,
	handleDeleteButton: (id: number) => void;
}) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	return (
		<>
			<button
				name="delete-button"
				type="button"
				className={styles.topInfoButton}
				onClick={() => setIsPopupOpen(true)}
			/>
			<PopUp
				visible={isPopupOpen}
				title="Удаление заявки"
				onClose={() => setIsPopupOpen(false)}>
				<span className={styles.popupSubtitle}>
					Заявка на проект будет аннулирована и удалена у организатора
				</span>
				<div className={styles.popupButtons}>
					<MainButton
						variant="primary"
						width="regular"
						type="button"
						onClick={() => {
                            handleDeleteButton(id);
                            setIsPopupOpen(false)
                        }}>
						Удалить
					</MainButton>
					<MainButton
						variant="secondary"
						width="regular"
						type="button"
						onClick={() => setIsPopupOpen(false)}>
						Оставить
					</MainButton>
				</div>
			</PopUp>
		</>
	);
};
