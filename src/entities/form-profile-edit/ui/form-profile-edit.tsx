'use client';

import React, { FC, useEffect, useState } from 'react';
import { MainButton, Input, Form } from '@/shared/ui';
import { ProfileLink } from '@/shared/ui/profile-link/profile-link';
import { Toggler } from '@/shared/ui/toggler/toggler';
import { TextEditor } from '@/shared/ui/text-editor/text-editor';
import Plus from '@/shared/assets/icons/plus-large.svg';
import styles from './form-profile-edit.module.scss';
import {
	FormProfileEditProps,
	TDataErrorChangeProfile,
	TOption,
} from './types';
import { TContact } from '@/shared/ui/contact-card/types';
import { CONTACTS } from '@/utils/constants';
import {
	generalEmailRegex,
	nickNameRegex,
	phoneRegex,
	urlRegex,
} from '@/utils/regex-consts';
import { COUNTRIES } from '@/shared/constants/countries/countries';
import SelectWithSearch from '@/shared/ui/select-search/select-search';
import { Calendar } from '@/shared/ui/calendar/calendar';
import { IUser } from '@/services/models/IUser';
import { ContactsList } from '@/entities/contact-list/contact-list';
import { ProfileAvatarEditor } from '@/entities/profile-avatar-editor/ui/profile-avatar-editor';

export const FormProfileEdit: FC<FormProfileEditProps> = ({
	handleSubmitForm,
	userData,
	isLoadingChangeProfileSettings,
	dataErrorChangeProfile,
}) => {
	const [isParticipation, setIsParticipation] = useState<boolean>(
		userData.ready_to_participate as boolean
	);
	const [nickName, setNickName] = useState<string | undefined>(
		userData.username
	);
	const [name, setName] = useState<string | undefined>(userData.name);
	const [aboutText, setAboutText] = useState<string | undefined>(
		userData.about
	);
	const [portfolioLink, setPortfolioLink] = useState<string | undefined>(
		userData.portfolio_link
	);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [country, setCountry] = useState<string | undefined>(userData.country);
	const [city, setCity] = useState<string | undefined>(userData.city);
	const [contacts, setContacts] = useState<TContact[]>([]);
	const [
		selectedOptionContactType,
		setSelectedOptionContactType,
	] = useState<TOption | null>(null);
	const [inputValueContact, setInputValueContact] = useState<string>('');

	const [nickNameErrorText, setNickNameErrorText] = useState<string>();
	const [nameErrorText, setNameErrorText] = useState<string>();
	const [portfolioLinkErrorText, setPortfolioLinkErrorText] = useState<
		string
	>();
	const [isNameValid, setIsNameValid] = useState<boolean>(true);
	const [isNickNameValid, setIsNickNameValid] = useState<boolean>(true);
	const [isPortfolioLinkValid, setIsPortfolioLinkValid] = useState<boolean>(
		true
	);
	const [isReadySubmit, setIsReadySubmit] = useState<boolean>(true);
	const [addContactErrorText, setAddContactErrorText] = useState<string>('');

	useEffect(() => {
		const newContacts: TContact[] = [];
		if (userData.phone_number) {
			// eslint-disable-next-line camelcase
			newContacts.push({ phone_number: userData.phone_number });
		}
		if (userData.telegram_nick) {
			// eslint-disable-next-line camelcase
			newContacts.push({ telegram_nick: userData.telegram_nick });
		}
		if (userData.email) {
			newContacts.push({ email: userData.email });
		}
		setContacts(newContacts);
	}, [userData]);

	useEffect(() => {
		setAddContactErrorText('');
	}, [contacts]);

	const checkObjectFields = (obj: TDataErrorChangeProfile): void => {
		for (const [key] of Object.entries(obj)) {
			if (key === 'name' && obj.name) {
				setIsNameValid(false);
				setNameErrorText(obj.name[0]);
			} else if (key === 'username' && obj.username) {
				setIsNickNameValid(false);
				setNickNameErrorText(obj.username[0]);
			} else if (key === 'portfolio_link' && obj.portfolio_link) {
				setPortfolioLinkErrorText(obj.portfolio_link[0]);
				setIsPortfolioLinkValid(false);
			}
		}
	};

	useEffect(() => {
		checkObjectFields(dataErrorChangeProfile);
	}, [dataErrorChangeProfile]);

	useEffect(() => {
		setIsReadySubmit(
			isNameValid &&
				isNickNameValid &&
				isPortfolioLinkValid &&
				!isLoadingChangeProfileSettings
		);
	}, [
		isNameValid,
		isNickNameValid,
		isPortfolioLinkValid,
		isLoadingChangeProfileSettings,
	]);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		switch (fieldName) {
			case 'nickName':
				setIsNickNameValid(true);
				setNickName(event.target.value);
				if (nickNameErrorText) setNickNameErrorText('');
				break;
			case 'name':
				setIsNameValid(true);
				setName(event.target.value);
				if (nameErrorText) setNameErrorText('');
				break;
			case 'portfolioLink':
				setIsPortfolioLinkValid(true);
				setPortfolioLink(event.target.value);
				if (portfolioLinkErrorText) setPortfolioLinkErrorText('');
				break;
			case 'country':
				setCountry(event.target.value);
				break;
			case 'city':
				setCity(event.target.value);
				break;
			case 'inputValueContact':
				if (addContactErrorText !== '') setAddContactErrorText('');
				setInputValueContact(event.target.value);
				break;
			default:
		}
	};

	const mergeContacts = (
		contacts: Record<string, string>[]
	): Record<string, string> => {
		const result: Record<string, string> = {};

		for (const contact of contacts) {
			for (const [key, value] of Object.entries(contact)) {
				if (!(key in result)) {
					result[key] = value;
				}
			}
		}
		return result;
	};

	const formatDate = (dateObj: Date) => {
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, '0');
		const day = String(dateObj.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const validateFields = () => {
		if (typeof name !== 'string' || name.length < 2 || name.length > 30) {
			setNameErrorText('Длина поля должна быть от 2 до 30 символов');
			setIsNameValid(false);
		}
		if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(name as string)) {
			setNameErrorText(
				'Поле должно содержать только кириллические буквы, латинские буквы, пробел и дефис'
			);
			setIsNameValid(false);
		}
		if (
			typeof nickName !== 'string' ||
			nickName.length < 2 ||
			nickName.length > 30
		) {
			setNickNameErrorText('Длина поля от 2 до 30 символов');
			setIsNickNameValid(false);
		}
		if (!nickNameRegex.test(nickName as string)) {
			setNickNameErrorText(
				'Поле может содержать только кириллические буквы, латинские буквы, цифры, дефис, нижнее подчёркивание и точку'
			);
			setIsNickNameValid(false);
		}
		if (/\s/.test(nickName as string)) {
			setNickNameErrorText('Поле не должно содержать пробелы');
			setIsNickNameValid(false);
		}

		if (
			typeof portfolioLink !== 'string' ||
			portfolioLink.length < 5 ||
			portfolioLink.length > 256
		) {
			setPortfolioLinkErrorText('Длина поля  от 5 до 256 символов');
			setIsPortfolioLinkValid(false);
		}
		if (!urlRegex.test(portfolioLink as string)) {
			setPortfolioLinkErrorText('Введите правильный URL');
			setIsPortfolioLinkValid(false);
		}
	};

	const handleSubmit = () => {
		let userDataNew: IUser = {
			...mergeContacts(contacts),
			username: nickName,
			name: name,
			// eslint-disable-next-line camelcase
			portfolio_link: portfolioLink,
			about: aboutText,
			// eslint-disable-next-line camelcase
			ready_to_participate: isParticipation,
		};
		if (selectedDate) {
			userDataNew = {
				...userDataNew,
				birthday: formatDate(selectedDate as Date),
			};
		}
		if (country) {
			userDataNew = {
				...userDataNew,
				country: country,
			};
		}
		if (city) {
			userDataNew = {
				...userDataNew,
				city: city,
			};
		}
		handleSubmitForm(userDataNew);
	};

	const handleOptionSelect = (option: TOption) => {
		setSelectedOptionContactType(option);
	};

	const handleAddContact = () => {
		if (selectedOptionContactType && inputValueContact) {
			let isValid = true;
			const newContact: TContact = {
				[selectedOptionContactType.value]: inputValueContact,
			};

			// Проверка формата email
			if (selectedOptionContactType.value === 'email') {
				if (!generalEmailRegex.test(inputValueContact)) {
					setAddContactErrorText('Пожалуйста, введите корректный email адрес.');
					isValid = false;
				}
			}
			// Проверка формата телефона
			if (selectedOptionContactType.value === 'phone') {
				if (!phoneRegex.test(inputValueContact)) {
					setAddContactErrorText(
						'Допустимый формат +7XXXXXXXXXX, где X - цифры.'
					);
					isValid = false;
				}
			}
			// Проверяем, что контакт такого же типа не существует уже
			if (
				isValid &&
				!contacts.some((contact) =>
					Object.prototype.hasOwnProperty.call(
						contact,
						selectedOptionContactType.value
					)
				)
			) {
				setContacts([...contacts, newContact]);
				// setSelectedOptionContactType(null);
				setInputValueContact('');
			} else if (!isValid) {
				// Если данные не валидны, выходим из функции
				return;
			} else {
				setAddContactErrorText(
					`Контакт типа "${selectedOptionContactType.label}" уже существует.`
				);
			}
		}
	};

	const initialDate = userData.birthday
		? new Date(userData.birthday.split('/').reverse().join('/'))
		: null;

	const handleValueChange = (value: string) => {
		setCountry(value); // обновляем состояние выбранного значения
	};

	return (
		<section className={styles.profileEdit}>
			<div className={styles.profileEdit__profileLink}>
				<ProfileLink title="Профиль" />
			</div>
			<Form onSubmit={handleSubmit} className={styles.fields}>
				<ProfileAvatarEditor
					image={userData.avatar || ''}
					width={250}
					height={250}
					onSubmit={handleSubmitForm}
				/>
				<div className={styles.fields__nameWrapper}>
					<Input
						onBlurCapture={validateFields}
						className={styles.fields__nameInput}
						name="nick_name"
						labelName="Никнейм"
						description
						value={nickName}
						onChange={(event) => handleInputChange(event, 'nickName')}
						error={nickNameErrorText}
					/>
					<Input
						onBlurCapture={validateFields}
						className={styles.fields__nameInput}
						name="name"
						labelName="Имя"
						description={true}
						descrText="Укажите свое настоящее имя и фамилию"
						value={name}
						onChange={(event) => handleInputChange(event, 'name')}
						error={nameErrorText}
					/>
				</div>
				<TextEditor
					currentText={aboutText as string}
					setCurrentText={setAboutText}
					labelName="О себе"
					desc="Не более 750 символов"
				/>
				<Input
					onBlurCapture={validateFields}
					className={styles.fields__portfolioLinkTextValue}
					name="portfolioLink"
					labelName="Ссылка на портфолио"
					placeholder="http..."
					description={true}
					descrText="Добавьте ссылку на любую платформу, где размещено ваше портфолио"
					value={portfolioLink}
					onChange={(event) => handleInputChange(event, 'portfolioLink')}
					error={portfolioLinkErrorText}
				/>

				<span className={styles.fields__contactsTitle}>Контакты для связи</span>
				<ContactsList contacts={contacts} setContacts={setContacts} />
				<div className={styles.fields__addContactWrapper}>
					<label className={styles.fields__addContactTypeWrapper}>
						<select
							className={styles.fields__addContactType}
							value={selectedOptionContactType?.value || ''}
							onChange={(event) =>
								handleOptionSelect(
									CONTACTS.find(
										(contact) => contact.value === event.target.value
									)!
								)
							}
						>
							{CONTACTS.map((option) => (
								<option
									className={styles.fields__addContactTypeListItem}
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							))}
						</select>
						<span className={styles.fields__addContactTypeLabel}>
							Выберите ресурс
						</span>
					</label>
					{selectedOptionContactType?.value === 'phone_number' ? (
						<Input
							placeholder="+7XXXXXXXXXX"
							className={styles.fields__addContactTextValue}
							name="inputValueContact"
							labelName=""
							// type="text"
							description={false}
							value={inputValueContact}
							error={addContactErrorText}
							onChange={(event) =>
								handleInputChange(event, 'inputValueContact')
							}
						/>
					) : (
						<Input
							className={styles.fields__addContactTextValue}
							name="inputValueContact"
							labelName=""
							// type="text"
							description={false}
							value={inputValueContact}
							error={addContactErrorText}
							onChange={(event) =>
								handleInputChange(event, 'inputValueContact')
							}
						/>
					)}
				</div>
				<MainButton
					type="button"
					onClick={handleAddContact}
					variant="secondary"
					width="regular"
					IconLeft={Plus}
				>
					Добавить
				</MainButton>
				<div className={styles.fields__datePickerWrapper}>
					<label className={styles.fields__datePickerTitle}>
						Дата рождения
					</label>
					<Calendar
						name="birthdate"
						selectedDate={selectedDate || initialDate}
						setSelectedDate={setSelectedDate}
					/>
				</div>
				<div className={styles.fields__locationWrapper}>
					<SelectWithSearch
						label="Страна"
						options={COUNTRIES}
						selectedValue={country as string}
						onValueChange={handleValueChange}
					/>
					<Input
						className={styles.fields__locationCity}
						name="city"
						labelName="Город"
						value={city}
						onChange={(event) => handleInputChange(event, 'city')}
					/>
				</div>
				<div className={styles.fields__participate}>
					<span className={styles.fields__participateTitle}>
						Готовность к участию в проектах
					</span>
					<div className={styles.fields__checkboxItem}>
						<Toggler
							checked={isParticipation as boolean}
							name={'ready_to_participate'}
							id={'ready_to_participate'}
							onChange={(evt) => {
								setIsParticipation(evt.target.checked);
							}}
						/>
					</div>
				</div>
				<div className={styles.fields_buttonsContainer}>
					<MainButton
						// type="button"
						variant={'primary'}
						width={'regular'}
						disabled={!isReadySubmit}
					>
						Сохранить
					</MainButton>
				</div>
			</Form>
		</section>
	);
};
