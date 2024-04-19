import React, { FC, useEffect, useState } from 'react';
import { TextEditorProps } from './types';
import 'react-quill/dist/quill.snow.css';
import styles from './text-editor.module.scss';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Quill from 'react-quill';

export const TextEditor: FC<TextEditorProps> = ({
	labelName,
	placeholder,
	desc,
	...props
}) => {
	const [value, setValue] = useState<string>('');
	const [isWindowLoaded, setIsWindowLoaded] = useState<boolean>(false);

	useEffect(() => {
		setIsWindowLoaded(true);
	}, []);
	// eslint-disable-next-line
	const handleChange = (content: string,delta: any,source: any,editor: Quill.UnprivilegedEditor) => {
		if (typeof window === 'object') {
			if (editor.getLength() <= 751) {
				setValue(content);
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
				[{ background: [] }], // dropdown with defaults from theme
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
							value={value}
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