import React, { FormEvent, useEffect, useState } from 'react';
import styles from './add-specialty.module.scss';
import SelectWithSearch from '../select-search/select-search';
import { MultiSelectInput } from '../multi-select-input/multi-select-input';
import { LEVEL } from '@/utils/constants';
import { TProfession, TSkills } from '@/shared/types/specialty';
import { AddSpecialtyProps } from './types';
import { Option } from '@/shared/types/option';
import { MainButton } from '../main-button/main-button';
import IconPlus from '@/shared/assets/icons/plus-large.svg';

export const AddSpecialty: React.FC<AddSpecialtyProps> = ({
	professions,
	allSkills,
	handleAddSpecialty,
	isLoadingAddSpecialty,
	isSuccessAddSpecialty,
}) => {
	const [profession, setProfession] = useState<TProfession | null>(null);
	const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
	const [skills, setSkills] = useState<TSkills[]>([]);

	const transformProfessions = (profList: TProfession[]) => {
		return profList?.map(({ id, specialization }) => ({
			label: specialization,
			value: specialization,
			id,
		}));
	};
	const handleProfessionChange = (value: string) => {
		setProfession(
			professions.find(
				(element) => element.specialization === value
			) as TProfession
		); // обновляем состояние выбранного значения
	};
	const handleLevelChange = (value: string) => {
		setSelectedLevel(
			LEVEL.find((element) => element.value === value)?.level as number
		); // обновляем состояние выбранного значения
	};

	const getSkills = (skills: TSkills[]) => {
		return skills.map(({ id, name }) => ({
			label: name,
			value: id,
		}));
	};

	const editSkills = (skills: Option[]) => {
		setSkills(
			skills.map(({ label, value }) => ({
				name: label,
				id: value,
			}))
		);
	};
	const getLevelName = (level: number) => {
		if (level > 0 && level < 5) {
			return LEVEL[level - 1].value;
		} else return '';
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleAddSpecialty({
			profession: profession as TProfession,
			level: selectedLevel as number,
			skills: skills as TSkills[],
		});
	};

	const handleResetForm = () => {
		setProfession(null);
		setSkills([]);
		setSelectedLevel(null);
	};
	const isFieldsNotFill = () => {
		return profession === null || selectedLevel === null || skills.length === 0;
	};
	useEffect(() => {
		if (isSuccessAddSpecialty) handleResetForm();
	}, [isSuccessAddSpecialty]);

	return (
		<form
			className={styles.addSpecialty}
			onSubmit={handleSubmit}
			onReset={handleResetForm}>
			<SelectWithSearch
				label="Специальность"
				options={transformProfessions(professions)}
				selectedValue={profession?.specialization as unknown as string}
				onValueChange={handleProfessionChange}
			/>
			<SelectWithSearch
				label="Уровень квалификации"
				options={LEVEL}
				selectedValue={getLevelName(selectedLevel as number)}
				onValueChange={handleLevelChange}
			/>
			<MultiSelectInput
				width="100%"
				name="select-skills"
				label="Навыки"
				description="Выберите не более 15 навыков"
				maxSelections={15}
				isSearchable
				options={getSkills(allSkills)}
				values={getSkills(skills)}
				onChange={(item) => {
					editSkills(item as Option[]);
				}}
			/>
			<div className={styles.addSpecialty__buttons}>
				<MainButton
					IconLeft={IconPlus}
					variant="secondary"
					width="regular"
					type="submit"
					disabled={isFieldsNotFill() || isLoadingAddSpecialty}>
					Добавить
				</MainButton>
				<MainButton
					className={styles.addSpecialty__resetButton}
					type="reset"
					variant="trivial"
					width="min">
					Сбросить
				</MainButton>
			</div>
		</form>
	);
};
