export type FilterSelectButtonProps = {
	options: Option[];
	value?: Option;
	label: string;
	onChange: (options: Option | undefined) => void;
};

export type Option = {
	value: number | string;
	label: string;
};
