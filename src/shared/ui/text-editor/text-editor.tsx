import React, { FC, useEffect, useState } from 'react';
import { TextEditorProps } from './types';
import 'react-quill-new/dist/quill.snow.css';
import styles from './text-editor.module.scss';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import Quill from 'react-quill-new';

export const TextEditor: FC<TextEditorProps> = ({
	labelName,
	placeholder,
	desc,
	setCurrentText,
	currentText,
	...props
}) => {
	//const [value, setValue] = useState<string>('');
	const [isWindowLoaded, setIsWindowLoaded] = useState<boolean>(false);
	useEffect(() => {
		setIsWindowLoaded(true);
	}, []);
	const handleChange = (
		content: string,
		// eslint-disable-next-line
		delta: any,
		// eslint-disable-next-line
		source: any,
		editor: Quill.UnprivilegedEditor
	) => {
		if (typeof window === 'object') {
			if (editor.getLength() <= 751) {
				setCurrentText(content);
			} else {
				alert('Превышено количество символов.');
			}
		}
	};

	const myModule = {
		toolbar: {
			container: [
				['bold', 'italic', 'underline'], // toggled buttons
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				[{ color: [] }], // dropdown with defaults from theme
				[{ align: [] }],
			],
		},
	};

	return (
		<div className={styles.textEditor}>
			<div className={styles.container}>
				<p className={styles.title}>{labelName}</p>
				<div className={styles.editor}>
					{isWindowLoaded && (
						<ReactQuill
							placeholder={placeholder}
							modules={myModule}
							theme="snow"
							value={currentText}
							onChange={handleChange}
							className={styles.inputMain}
							{...props}
						/>
					)}
				</div>
				<p className={styles.desc}>{desc}</p>
			</div>
		</div>
	);
};
