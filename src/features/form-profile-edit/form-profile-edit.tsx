'use client';

import React, { FC, useEffect, useState } from 'react';
import { FormProfileEdit } from '@/entities/form-profile-edit';
import { toaster } from '@/widgets/notification-toast/';
import { IUser } from '@/services/models/IUser';
import {
	useAddSpecialtyMutation,
	useChangeProfileSettingsMutation,
	useChangeSpecialtyMutation,
	useDeleteSpecialtyMutation,
	useGetProfileSettingsQuery,
} from '@/services/UserService';
import {
	useGetProfessionsQuery,
	useGetSkillsQuery,
} from '@/services/GeneralService';
import { Loader } from '@/shared/ui';
// import { DoesLookProfile } from '@/entities/does-look-profile/ui/does-look-profile';
import { Specialties } from '@/entities/specialties';
import { Speciality, TSpeciality } from '@/shared/types/specialty';

export const FormProfileEditFeature: FC = () => {
	const { data: professions, isLoading: isLoadingProfessions } =
		useGetProfessionsQuery([]);

	const { data: allSkills, isLoading: isLoadingSkills } = useGetSkillsQuery([]);

	const {
		data: userData,
		isLoading: isLoadingGetProfileSettings,
		isError: isErrorGetProfileSettings,
	} = useGetProfileSettingsQuery(null);

	const [changeProfileSettings, { isLoading: isLoadingChangeProfileSettings }] =
		useChangeProfileSettingsMutation();
	const [
		changeSpecialty,
		{
			isLoading: isLoadingChangeSpecialty,
			isSuccess: isSuccessСhangeSpecialty,
		},
	] = useChangeSpecialtyMutation();

	const [
		deleteSpecialty,
		{
			isSuccess: isSuccessDeleteSpecialty,
			isLoading: isLoadingDeleteSpecialty,
		},
	] = useDeleteSpecialtyMutation();

	const [
		addSpecialty,
		{ isLoading: isLoadingAddSpecialty, isSuccess: isSuccessAddSpecialty },
	] = useAddSpecialtyMutation();

	const [dataErrorChangeProfile, setDataErrorChangeProfile] = useState({});

	const [specialties, setSpecialties] = useState<TSpeciality[]>([]);
	useEffect(() => {
		if (userData?.specialists) {
			setSpecialties(userData.specialists);
		}
	}, [userData]);

	const handleSubmitFormProfileEdit = (newData: IUser) => {
		changeProfileSettings(newData)
			.unwrap()
			.then(() => {
				toaster({
					status: 'success',
					title: 'Настройки успешно сохранены',
				});
			})
			.catch((error) => {
				if (error.data) {
					setDataErrorChangeProfile(error.data);
				}
				toaster({
					status: 'error',
					title: 'Ошибка сохранения настроек',
					subtitle: 'Попробуйте еще раз',
				});
			});
	};

	const handleSubmitChangeSpecialty = (data: Speciality) => {
		changeSpecialty(data)
			.unwrap()
			.then(() => {
				toaster({
					status: 'success',
					title: 'Настройки специальности успешно сохранены',
				});
			})
			.catch((error) => {
				toaster({
					status: 'error',
					title: 'Ошибка сохранения',
					subtitle: 'Попробуйте еще раз',
				});
				console.log(error);
			});
	};
	const handleDeleteSpecialty = (id: number) => {
		deleteSpecialty(id)
			.unwrap()
			.then(() => {
				setSpecialties(specialties.filter((item) => item.id !== id));
				toaster({
					status: 'success',
					title: 'Спецаильность успешно удалена',
				});
			})
			.catch(() => {
				toaster({
					status: 'error',
					title: 'Ошибка удаления',
					subtitle: 'Попробуйте еще раз',
				});
			});
	};

	const handleAddSpecialty = ({ level, profession, skills }: TSpeciality) => {
		addSpecialty({
			level,
			profession: profession.id,
			skills: skills.map((item) => item.id),
		})
			.unwrap()
			.then(({ id }) => {
				setSpecialties([
					{
						id,
						level,
						profession,
						skills,
					},
					...specialties,
				]);

				toaster({
					status: 'success',
					title: 'Спецаильность успешно добавлена',
				});
			})
			.catch(() => {
				toaster({
					status: 'error',
					title: 'Ошибка добавления',
					subtitle: 'Попробуйте еще раз',
				});
			});
	};

	return (
		<>
			{isLoadingGetProfileSettings ||
			isLoadingProfessions ||
			isLoadingSkills ? (
				<div style={{ minWidth: '816px' }}>
					<Loader />
				</div>
			) : (
				<>
					<FormProfileEdit
						dataErrorChangeProfile={dataErrorChangeProfile}
						userData={userData}
						handleSubmitForm={handleSubmitFormProfileEdit}
						isLoadingChangeProfileSettings={isLoadingChangeProfileSettings}
					/>
					<Specialties
						professions={professions}
						allSkills={allSkills}
						specialists={specialties}
						handleSubmitChangeSpecialty={handleSubmitChangeSpecialty}
						isLoadingChangeSpecialty={isLoadingChangeSpecialty}
						isSuccessСhangeSpecialty={isSuccessСhangeSpecialty}
						handleDeleteSpecialty={handleDeleteSpecialty}
						isSuccessDeleteSpecialty={isSuccessDeleteSpecialty}
						isLoadingDeleteSpecialty={isLoadingDeleteSpecialty}
						handleAddSpecialty={handleAddSpecialty}
						isLoadingAddSpecialty={isLoadingAddSpecialty}
						isSuccessAddSpecialty={isSuccessAddSpecialty}
					/>
					{/* <DoesLookProfile id={userData.user_id} /> */}
				</>
			)}
			{isErrorGetProfileSettings && <span>Ошибка получения настроек</span>}
		</>
	);
};
