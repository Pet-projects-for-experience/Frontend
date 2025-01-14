export type FilterMultiSelectButtonProps = {
	options: Option[];
	value?: Option[];
	label: string;
	onChange: (options: Option[] | undefined) => void;
};

export type Option = {
	value: number;
	label: string;
};
