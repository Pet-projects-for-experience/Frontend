import React from 'react';
import styles from './add-specialty.module.scss';
import { LEVEL } from '@/utils/constants';
import { TProfession, TSkills } from '@/shared/types/specialty';
import IconPlus from '@/shared/assets/icons/plus-large.svg';
import { AddSpecialtyProps } from './types';
import SelectWithSearch from '@/shared/ui/select-search/select-search';
import {
	getLevelName,
	getSkills,
	transformProfessions,
} from '@/utils/specialists-functions';
import { MainButton } from '@/shared/ui';
import { MultiSelectInput } from '@/shared/ui/multi-select-input/multi-select-input';

import {
	useForm,
	Controller,
} from 'react-hook-form';

export const AddProjectSpeciality: React.FC<AddSpecialtyProps> = ({
	professions,
	allSkills,
	handleAddSpecialty,
}) => {
	const { control, handleSubmit, reset, watch } = useForm({
		mode: 'onChange',
	});

	// Watching form fields for real-time values
	const selectedProfession = watch('profession');
	const selectedLevel = watch('level');
	const selectedSkills = watch('skills');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit: any = (data: {
		profession: TProfession;
		level: number;
		skills: TSkills[];
	}) => {
		const { profession, level, skills } = data;
		handleAddSpecialty({
			profession,
			level,
			skills,
		});
		reset({
			profession: null,
			level: null,
			skills: [],
		});
	};

	const handleResetForm = () => {
		reset({
			profession: null,
			level: null,
			skills: [],
		});
	};

	// Utilizing the watched values for field validation
	const isFieldsNotFill = () => {
		return (
			selectedProfession === null ||
			selectedLevel === null ||
			selectedSkills?.length === 0
		);
	};

	interface MultiSelectItem {
		label: string;
		value: number; // Adjust based on your actual value type
	}

	return (
		<div className={styles.addSpecialty}>
			<Controller
				name="profession"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<SelectWithSearch
						label="Специальность"
						options={transformProfessions(professions)}
						selectedValue={field.value?.specialization as unknown as string}
						onValueChange={(value) =>
							field.onChange(
								professions.find((p) => p.specialization === value)
							)
						}
					/>
				)}
			/>

			<Controller
				name="level"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<SelectWithSearch
						label="Уровень квалификации"
						options={LEVEL}
						selectedValue={getLevelName(field.value)}
						onValueChange={(value) =>
							field.onChange(
								LEVEL.find((lvl) => lvl.value === value)?.level as number
							)
						}
					/>
				)}
			/>

			<Controller
				name="skills"
				control={control}
				rules={{ validate: (value) => value.length > 0 }}
				render={({ field }) => (
					<MultiSelectInput
						width="100%"
						name="select-skills"
						label="Навыки"
						description="Выберите не более 15 навыков"
						maxSelections={15}
						isSearchable
						options={getSkills(allSkills)}
						values={getSkills(field.value)}
						onChange={(item: MultiSelectItem[]) =>
							field.onChange(
								item.map(({ label, value }) => ({
									name: label,
									id: value,
								}))
							)
						}
					/>
				)}
			/>

			<div className={styles.addSpecialty__buttons}>
				<MainButton
					IconLeft={IconPlus}
					variant="secondary"
					width="regular"
					onClick={handleSubmit(onSubmit)}
					type="button"
					disabled={isFieldsNotFill()}>
					Добавить
				</MainButton>

				<MainButton
					className={styles.addSpecialty__resetButton}
					type="reset"
					variant="trivial"
					onClick={handleResetForm}
					width="min">
					Сбросить
				</MainButton>
			</div>
		</div>
	);
};
