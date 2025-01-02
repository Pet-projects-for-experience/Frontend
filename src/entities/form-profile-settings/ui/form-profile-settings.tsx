'use client';

import React, { FC, useState } from 'react';
import { MainButton } from '@/shared/ui';
import { Form } from '@/shared/ui';
import IconUp from '@/shared/assets/icons/chevron-up.svg';
import IconDown from '@/shared/assets/icons/chevron-down.svg';
import styles from './form-profile-settings.module.scss';
import { MenuForVisible } from '@/entities/menu-for-visible';
import { ProfileLink } from '@/shared/ui/profile-link/profile-link';
import { FormProfileSettingsProps } from './types';
import { Toggler } from '@/shared/ui/toggler/toggler';

export const FormProfileSettings: FC<FormProfileSettingsProps> = ({
	handleSubmitForm,
	userData,
	isLoadingChangeProfileSettings,
}) => {
	const [isSendNotification, setIsSendNotification] = useState(
		userData.allow_notifications
	);
	const [isSubscriptionProjects, setIsSubscriptionProjects] = useState(
		userData.subscribe_to_projects
	);
	const [visibleStatus, setVisibleStatus] = useState(userData.visible_status);
	const [visibleStatusContacts, setVisibleStatusContacts] = useState(
		userData.visible_status_contacts
	);

	const [showVisibleProfileMenu, setShowVisibleProfileMenu] = useState(false);
	const [showVisibleContactsMenu, setShowVisibleContactsMenu] = useState(false);

	return (
		<section className={styles.profileSettings}>
			<div className={styles.profileSettings__profileLink}>
				<ProfileLink title="Управление аккаунтом" />
			</div>
			<Form onSubmit={handleSubmitForm} className={styles.formSettings}>
				<h2 className={styles.formSettings__title}>Настройка аккаунта</h2>

				<div className={styles.formSettings__list}>
					<div className={styles.formSettings__listItem}>
						<div
							className={styles.formSettings__item}
							onClick={() =>
								setShowVisibleProfileMenu(!showVisibleProfileMenu)
							}>
							<p className={styles.formSettings__subtitle}>Видимость профиля</p>
							{showVisibleProfileMenu ? (
								<IconUp className={styles.formSettings__icon} />
							) : (
								<IconDown className={styles.formSettings__icon} />
							)}
						</div>
						<MenuForVisible
							isOpen={showVisibleProfileMenu}
							settings={visibleStatus}
							changeVisibleStatus={(e) => {
								setVisibleStatus(e.target.value as unknown as number);
							}}
							nameSettings={'visible_status'}
						/>
					</div>
					<div className={styles.formSettings__listItem}>
						<div
							className={styles.formSettings__item}
							onClick={() =>
								setShowVisibleContactsMenu(!showVisibleContactsMenu)
							}>
							<p className={styles.formSettings__subtitle}>
								Видимость контактов
							</p>
							{showVisibleContactsMenu ? (
								<IconUp className={styles.formSettings__icon} />
							) : (
								<IconDown className={styles.formSettings__icon} />
							)}
						</div>
						<MenuForVisible
							isOpen={showVisibleContactsMenu}
							settings={visibleStatusContacts}
							nameSettings={'visible_status_contacts'}
							changeVisibleStatus={(e) => {
								setVisibleStatusContacts(e.target.value as unknown as number);
								// console.log('visible_status_contacts', e.target.value);
							}}
						/>
					</div>
					<div className={styles.formSettings__listItem}>
						<div className={styles.formSettings__item}>
							<label className={styles.formSettings__subtitle} htmlFor="notify">
								Отправка уведомлений
							</label>
							<div className={styles.formSettings__checkbox}>
								<Toggler
									// variant={'default'}
									checked={isSendNotification as boolean}
									name={'allow_notifications'}
									id={'allow_notifications'}
									onChange={(evt) => setIsSendNotification(evt.target.checked)}
								/>
							</div>
						</div>
					</div>
					<div className={styles.formSettings__listItem}>
						<div className={styles.formSettings__item}>
							<label
								className={styles.formSettings__subtitle}
								htmlFor="subscription">
								Подписка на проекты
							</label>
							<div className={styles.formSettings__checkbox}>
								<Toggler
									// variant={'default'}
									checked={isSubscriptionProjects as boolean}
									name={'subscribe_to_projects'}
									id={'subscribe_to_projects'}
									onChange={(evt) =>
										setIsSubscriptionProjects(evt.target.checked)
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<MainButton
					// type="button"
					variant={'primary'}
					width={'regular'}
					disabled={isLoadingChangeProfileSettings}
					// onClick={handleSubmit()}
				>
					Сохранить настройки
				</MainButton>
			</Form>
		</section>
	);
};
