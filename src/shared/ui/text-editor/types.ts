export type TextEditorProps = {
	labelName?: string;
	placeholder?: string;
	desc?: string;
	setCurrentText: (value: string) => void;
	currentText: string;
};
