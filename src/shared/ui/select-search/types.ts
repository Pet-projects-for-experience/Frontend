import { TOption } from '@/entities/form-profile-edit/ui/types';

export type SelectWithSearchProps = {
	options: TOption[];
	label?: string;
	selectedValue?: string | null;
	onValueChange: (value: string) => void;
};
