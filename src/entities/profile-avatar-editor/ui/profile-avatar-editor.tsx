import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { ProfileAvatarEditorProps, ProfileAvatarEditorState } from './types';
import AvatarEditor, { type Position } from 'react-avatar-editor';
import styles from './profile-avatar-editor.module.scss';
import { MainButton, PopUp } from '@/shared/ui';
import Edit from '@/shared/assets/icons/edit-icon.svg';
import Image from 'next/image';

export const ProfileAvatarEditor: FC<ProfileAvatarEditorProps> = ({
	image,
	width,
	height,
	onSubmit,
}) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const [state, setState] = useState<ProfileAvatarEditorState>({
		image: image !== '' ? `https://${BASE_URL}${image}` : '',
		allowZoomOut: false,
		position: { x: 0.5, y: 0.5 },
		scale: 1,
		rotate: 0,
		borderRadius: 50,
		preview: undefined,
		width: width,
		height: height,
		disableCanvasRotation: false,
		isTransparent: false,
		backgroundColor: undefined,
		showGrid: false,
	});
	const [isShowEditAvatarPopup, setIsShowEditAvatarPopup] =
		useState<boolean>(false);
	const editorRef = useRef<AvatarEditor>(null);

	const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setState({ ...state, image: e.target.files[0] });
		}
	};

	const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
		const scale = parseFloat(e.target.value);
		setState({ ...state, scale });
	};

	const handlePositionChange = (position: Position) => {
		setState({ ...state, position });
	};

	const saveAvatar = () => {
		setIsShowEditAvatarPopup(false);

		if (editorRef !== null && editorRef.current !== null) {
			const dataUrl = editorRef.current.getImageScaledToCanvas().toDataURL(); // convert to base64 string

			setState({ ...state, image: dataUrl });
			onSubmit({
				avatar: dataUrl,
			});
		}
	};

	return (
		<div className={styles.fields_photo}>
			<div className={styles.fields_avatar}>
				{state.image !== '' && typeof state.image === 'string' ? (
					<Image
						src={state.image}
						alt="avatar"
						priority={true}
						width={136}
						height={136}
					/>
				) : (
					<div className={styles.fields_text}>A</div>
				)}
			</div>
			<button
				type="button"
				className={styles.fields_edit}
				onClick={() => setIsShowEditAvatarPopup(true)}>
				<Edit />
			</button>
			<PopUp
				visible={isShowEditAvatarPopup}
				title="Изменить фото"
				onClose={() => setIsShowEditAvatarPopup(false)}>
				<div className={styles.container}>
					{state.image !== '' && (
						<>
							<AvatarEditor
								ref={editorRef}
								scale={state.scale}
								width={state.width}
								height={state.height}
								position={state.position}
								onPositionChange={handlePositionChange}
								rotate={state.rotate}
								borderRadius={state.width / (100 / state.borderRadius)}
								backgroundColor={state.backgroundColor}
								image={state.image}
								disableCanvasRotation={state.disableCanvasRotation}
								color={[255, 255, 255, 0.6]} // RGBA
							/>
							<label htmlFor="scale" className={styles.scaleLabel}>
								Масштаб:{' '}
								<input
									name="scale"
									type="range"
									onChange={handleScale}
									min={state.allowZoomOut ? '0.1' : '1'}
									max="2"
									step="0.01"
									defaultValue="1"
								/>
							</label>
						</>
					)}
					<input
						name="newImage"
						className={styles.selectImageInput}
						type="file"
						onChange={handleNewImage}
					/>
				</div>

				<MainButton variant="primary" width="regular" onClick={saveAvatar}>
					Сохранить
				</MainButton>
			</PopUp>
			<div className={styles.fields_photo_descr}>
				Загрузите файл в формате: JPEG, PNG, размером не более 10 Мбайт
			</div>
		</div>
	);
};
