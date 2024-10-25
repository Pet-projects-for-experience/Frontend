import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './speciality-card.module.scss';
import { LEVEL } from '@/utils/constants';
import { Option } from '@/shared/types/option';
import { SpecialityCardProps } from './types';
import { TProfession, TSkills } from '@/shared/types/specialty';
import { Counter, MainButton, Toggler } from '@/shared/ui';
import { MultiSelectInput } from '@/shared/ui/multi-select-input/multi-select-input';
import SelectWithSearch from '@/shared/ui/select-search/select-search';
import { SkillsList } from '@/shared/ui/skills-list/skills-list';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addProjectSpecialist } from '@/store/reducers/ProjectSpecialist';

export const ProjectSpecialitCard: FC<SpecialityCardProps> = ({
	data,
	professions,
	allSkills,
	isLoadingChangeSpecialty,
	isSuccessСhangeSpecialty,
	isLoadingDeleteSpecialty,
	handleSubmitChangeSpecialty,
	handleDeleteSpecialty,
}) => {
	const [isShowViewEdit, setIsShowViewEdit] = useState<boolean>(false);

	const [recruitmentIsOpen, setRecruitmentIsOpen] = useState<boolean>(false);
	const [profession, setProfession] = useState<TProfession>(data.profession);
	const [selectedLevel, setSelectedLevel] = useState<number>(data.level);
	const [skills, setSkills] = useState<TSkills[]>(data.skills);
	const [count, setCount] = useState<number>(1);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccessСhangeSpecialty) {
			setIsShowViewEdit(false);
		}
	}, [isSuccessСhangeSpecialty]);

	const toNum = (skills: TSkills[]) => {
		const nums = skills.map((skill) => skill.id);

		return nums;
	};

	const updateCounter = (num: number) => {
		setCount(num);
	};

	const transformProfessions = (profList: TProfession[]) => {
		return profList.map(({ id, specialization }) => ({
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

	const changeViewforEdit = () => {
		setIsShowViewEdit(true);
	};

	const getLevelName = (level: number) => {
		if (level > 0 && level < 5) {
			return LEVEL[level - 1].value;
		} else return 'Invalid level';
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

	const isSkillsNotAdded = () => {
		return skills.length === 0;
	};

	const handleSubmit = () => {
		handleSubmitChangeSpecialty({
			id: data.id,
			level: selectedLevel,
			profession: profession,
			skills: skills,
		});
	};

	const handleDelete = () => {
		handleDeleteSpecialty(data.id as number);
	};

	dispatch(
		addProjectSpecialist({
			profession: profession.id,
			skills: toNum(skills),
			count,
			level: selectedLevel,
			// eslint-disable-next-line camelcase
			is_required: recruitmentIsOpen,
		})
	);

	return (
		<div className={styles.specialityCard__wrapper}>
			{!isShowViewEdit ? (
				<div className={styles.specialityCard}>
					<button
						type="button"
						className={clsx(
							styles.specialityCard__button,
							styles.specialityCard__button_edit
						)}
						onClick={changeViewforEdit}>
						<Edit />
					</button>
					<h3 className={styles.specialityCard__title}>
						{profession.specialization} / {profession.specialty} ,{' '}
						{getLevelName(selectedLevel)}
					</h3>
					<SkillsList skills={skills} />
					<div className={styles.config}>
						<Counter state={updateCounter} disabled={!recruitmentIsOpen} />
						<div className={styles.config_toggle}>
							<span>Набор {recruitmentIsOpen ? 'открыт' : 'закрыт'}</span>
							<Toggler
								checked={recruitmentIsOpen as boolean}
								onChange={(evt) => setRecruitmentIsOpen(evt.target.checked)}
							/>
						</div>
					</div>

					{/* we shall try to cahnge the data in the value change, or something instead of onSubmit */}
				</div>
			) : (
				<div className={styles.specialityCard}>
					<button
						type="button"
						disabled={isLoadingDeleteSpecialty}
						className={clsx(
							styles.specialityCard__button,
							styles.specialityCard__button_delete
						)}
						onClick={handleDelete}>
						<Trash2 color="red" />
					</button>
					<h3 className={styles.specialityCard__title}>
						{data.profession.specialization}, {getLevelName(selectedLevel)}
					</h3>

					<SelectWithSearch
						label="Специальность"
						options={transformProfessions(professions)}
						selectedValue={profession.specialization as string}
						onValueChange={handleProfessionChange}
					/>
					<SelectWithSearch
						label="Уровень квалификации"
						options={LEVEL}
						selectedValue={getLevelName(selectedLevel)}
						onValueChange={handleLevelChange}
					/>
					<div className={styles.inputBlock}>
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
					</div>
					<MainButton
						variant="primary"
						width="regular"
						type="button"
						onClick={handleSubmit}
						disabled={isSkillsNotAdded() || isLoadingChangeSpecialty}>
						Сохранить
					</MainButton>
				</div>
			)}
		</div>
	);
};
