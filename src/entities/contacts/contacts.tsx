import { Input, MainButton } from '@/shared/ui';
import { Plus } from 'lucide-react';
import React, {
	ComponentType,
	HTMLAttributes,
	useEffect,
	useState,
} from 'react';
import styles from './contacts.module.scss';
import { CONTACTS } from '@/utils/constants';
import { ContactsList } from '../contact-list/contact-list';
import { TContact } from '@/shared/ui/contact-card/types';
import { TOption } from '../form-profile-edit/ui/types';
import { generalEmailRegex, phoneRegex } from '@/utils/regex-consts';
import { useDispatch } from 'react-redux';
import { updateContact } from '@/store/reducers/ProjectOptionalReducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Contacts = () => {
	const [contacts, setContacts] = useState<TContact[]>([]);
	const [selectedOptionContactType, setSelectedOptionContactType] =
		useState<TOption | null>(null);
	const [addContactErrorText, setAddContactErrorText] = useState<string>('');
	const [inputValueContact, setInputValueContact] = useState<string>('');

	const handleOptionSelect = (option: TOption) => {
		setSelectedOptionContactType(option);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueContact(event.target.value);
	};

	const dispatch = useDispatch();

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

	useEffect(() => {
		if (contacts.length > 0) {
			// eslint-disable-next-line prefer-destructuring, camelcase
			const { email, telegram_nick, phone_number } = contacts[0];

			dispatch(
				updateContact({
					email,
					// eslint-disable-next-line camelcase
					telegram_nick,
					// eslint-disable-next-line camelcase
					phone_number,
				})
			);
		}
	}, [contacts, dispatch]);

	return (
		<>
			<span className={styles.contactsTitle}>Контакты для связи</span>
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
						}>
						{CONTACTS.map((option) => (
							<option
								className={styles.fields__addContactTypeListItem}
								key={option.value}
								value={option.value}>
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
						onChange={(event) => handleInputChange(event)}
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
						onChange={(event) => handleInputChange(event)}
					/>
				)}
			</div>
			<MainButton
				type="button"
				onClick={handleAddContact}
				variant="secondary"
				width="regular"
				IconLeft={
					Plus as ComponentType<HTMLAttributes<HTMLElement>> | undefined
				}>
				Добавить
			</MainButton>
		</>
	);
};
