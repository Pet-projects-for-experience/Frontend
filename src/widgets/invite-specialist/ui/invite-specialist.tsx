'use client';
import { MainButton, PopUp, SingleSelectButton } from '@/shared/ui';
import styles from './invite-specialist.module.scss';
import React, { useState } from 'react';
import { TextEditor } from '@/shared/ui/text-editor/text-editor';

export const InviteSpecialist = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleStatusProjectChange = (selectedOptions: (string | object)[]) => {
		console.info('selected option: ', selectedOptions?.[0]);
	};

	const statusOptions = [
		{ value: 1, label: 'Активный' },
		{ value: 2, label: 'Завершенный' },
	];
	const speciality = [
		{ value: 1, label: 'Some Text' },
		{ value: 2, label: 'Some Text' },
		{ value: 3, label: 'Some Text' },
		{ value: 4, label: 'Some Text' },
		{ value: 5, label: 'Some Text' },
	];

	return (
		<>
			<MainButton
				onClick={() => setIsOpen(!isOpen)}
				variant="primary"
				width="regular">
				Пригласить в проект
			</MainButton>
			<PopUp
				visible={isOpen}
				title="Приглашение в проект"
				onClose={() => setIsOpen(!isOpen)}>
				<div className={styles.button__wrapper}>
					<SingleSelectButton
						name={'project-name'}
						buttonLabel={'Название проекта'}
						options={statusOptions}
						onChange={handleStatusProjectChange}
					/>
					<SingleSelectButton
						name={'speciality'}
						buttonLabel={'Специальность'}
						options={speciality}
						onChange={handleStatusProjectChange}
					/>
				</div>
				<div className={styles.letter__wrapper}>
					<h2>Несколько слов о проекте</h2>
					<>
						<TextEditor
							labelName={''}
							currentText=" "
							setCurrentText={() => {}}
						/>
						<MainButton variant={'primary'} width={'regular'}>
							Пригласить
						</MainButton>
					</>
				</div>
			</PopUp>
		</>
	);
};
