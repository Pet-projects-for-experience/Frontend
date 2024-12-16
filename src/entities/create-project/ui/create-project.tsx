'use client';

import React, { useState } from 'react';
import styles from './create-project.module.scss';
import { Form, Input } from '@/shared/ui';
import { TextEditor } from '@/shared/ui/text-editor/text-editor';

export const CreateProject: React.FC = () => {
	const [projectName, setProjectName] = useState<string | undefined>('');
	const [projectDescription, setProjectDescription] = useState<string | undefined>('');


	return (
		<Form
			className={styles.createProject}
			onSubmit={() => console.log('saveproject')}>
			<section className={styles.createProject__details}>
				<h2 className={styles.projectDetails__title}>Детали проекта</h2>
				<Input
					// onBlurCapture={validateFields}
					className={styles.fields__nameInput}
					name="nick_name"
					labelName="Название проекта"
					// description
					value={projectName}
					// onChange={(event) => handleInputChange(event, 'nickName')}
					// error={nickNameErrorText}
				/>
			
				<TextEditor
					currentText={projectDescription as string}
					setCurrentText={setProjectDescription}
					labelName="Описание проекта"
					desc="Расскажите о проекте и его цели используя не более 750 символов"
				/>
			</section>
		</Form>
	);
};
// })
