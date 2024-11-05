import { Option } from '@/shared/types/option';

export type MultiSelectInputProps = {
	name: string;
	options: Option[];
	values: Option[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: any;
	selectedAll?: boolean;
	maxSelections?: number;
	width?: string;
	isSearchable?: boolean;
	tooltip?: string;
	label?: string;
	description?: string;
	selectedItemsType?: 'list' | 'items';
};
