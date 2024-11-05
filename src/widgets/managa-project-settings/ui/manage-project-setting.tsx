// 'use client';
// import React from 'react';
// import styles from './manage-project-setting.module.scss';
// import { CheckboxAndRadio, Form, Input, MainButton } from '@/shared/ui';
// import { CONTACTS, DEVELOPING, EMPLOYMENT } from '@/utils/constants';
// import { DatePickerRHF } from '@/shared/ui/date-picker-rhf/date-picker-rhf';
// import { useForm } from 'react-hook-form';
// import { SingleSelectInput } from '@/shared/ui/single-select-input/single-select-input';
// import { Plus } from 'lucide-react';

// export const ManageProjectsSetting = () => {
// 	const { control } = useForm();

// 	const onSubmit = (data: unknown) => {
// 		console.table(data);
// 	};
// 	return (
// 		<Form className={styles.container} onSubmit={onSubmit}>
// 			<div className={styles.specialists}>
// 				<h1 className={styles.specialists_master_title}>Название проекта</h1>
// 				<div className={styles.input_list}>
// 					<Input
// 						name="name"
// 						labelName="Название проекта"
// 						className={styles.input_extra}
// 					/>
// 					{/* <TextEditor
// 						labelName={'Описание проекта'}
// 						desc={
// 							'Расскажите о проекте и его цели используя не более 750 символов'
// 						}
// 						setCurrentText={function (value: string): void {
// 							throw new Error('Function not implemented.');
// 						}}
// 						currentText={''}
// 					/> */}
// 				</div>

// 				<div className={styles.directions}>
// 					<h3 className={styles.input_list_title}>Направление разработки</h3>
// 					<ul className={styles.directions_list}>
// 						{DEVELOPING?.map((profession) => (
// 							<li className={styles.directions_item} key={profession.id}>
// 								<CheckboxAndRadio
// 									labelName={profession.field}
// 									label={`professions`}
// 									type={'checkbox'}
// 									id={`professions_${profession.id}`}
// 									name={'professions'}
// 								/>
// 							</li>
// 						))}
// 					</ul>
// 				</div>

// 				<div className={styles.employment}>
// 					<h3 className={styles.input_list_title}>Занятость</h3>
// 					<ul className={styles.employment_list}>
// 						{EMPLOYMENT.map((busyness) => (
// 							<li className={styles.directions_item} key={busyness.id}>
// 								<CheckboxAndRadio
// 									labelName={busyness.name}
// 									label={`busyness`}
// 									type={'checkbox'}
// 									id={`busyness_${busyness.id}.`}
// 									name={'busyness'}
// 								/>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 				<div className={styles.dates}>
// 					<h3 className={styles.input_list_title}>Сроки проекты</h3>
// 					<div className={styles.dates_inputs}>
// 						<div className={styles.dates_input}>
// 							<p className={styles.dates_text}>Начало</p>
// 							<DatePickerRHF control={control} name="start" />
// 						</div>
// 						<div className={styles.dates_input}>
// 							<p className={styles.dates_text}>Окончание</p>
// 							<DatePickerRHF control={control} name="end" />
// 						</div>
// 					</div>
// 				</div>

// 				<div className={styles.contacts}>
// 					<h3 className={styles.input_list_title}>Контакты для связи</h3>
// 					<div className={styles.contacts_selects}>
// 						<SingleSelectInput
// 							name={`project_specialists`}
// 							onChange={() => {}}
// 							options={CONTACTS}
// 							description={'Выберите ресурс'}
// 						/>
// 						<Input labelName="" name="name" className={styles.input_extra} />
// 					</div>
// 				</div>

// 				<div className={styles.specialists_buttons}>
// 					<MainButton
// 						variant="secondary"
// 						width="regular"
// 						IconLeft={
// 							Plus as React.ComponentType<React.HTMLAttributes<HTMLElement>>
// 						}
// 						onClick={() => ({})}>
// 						Добавить
// 					</MainButton>
// 					<MainButton variant="trivial" width="regular" onClick={() => ({})}>
// 						Сбросить
// 					</MainButton>
// 				</div>

// 				<Input
// 					name="link"
// 					labelName="Ссылка на проект"
// 					className={styles.input_extra}
// 					description={true}
// 					descrText={
// 						'Добавьте ссылку на ваш проект, например: GitHub, приложение, веб страница и др.'
// 					}
// 				/>

// 				<MainButton variant={'trivial'} width={'min'} disabled={false}>
// 					{'Очистить'}
// 				</MainButton>
// 			</div>
// 		</Form>
// 	);
// };
