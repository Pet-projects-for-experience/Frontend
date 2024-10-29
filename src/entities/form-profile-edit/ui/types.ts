import { IUser } from '@/services/models/IUser';
import { TSpeciality } from '@/shared/types/specialty';

export type TDataErrorChangeProfile = {
	username?: string[];
	name?: string[];
	about?: string[];
	portfolio_link?: string[];
};

export type FormProfileEditProps = {
	handleSubmitForm: (data: IUser) => void;
	userData: {
		user_id?: number;
		username?: string;
		name?: string;
		about?: string;
		portfolio_link?: string;
		phone_number?: string;
		telegram_nick?: string;
		email?: string;
		birthday?: string;
		country?: string;
		city?: string;
		ready_to_participate?: boolean;
		specialists?: TSpeciality[];
		avatar?: string;
	};
	isLoadingChangeProfileSettings: boolean;
	dataErrorChangeProfile: TDataErrorChangeProfile;
};
export type TOption = {
	label: string;
	value: string;
	id?: number;
};
