import { IUser } from '@/services/models/IUser';
import { type Position } from 'react-avatar-editor';

export type ProfileAvatarEditorProps = {
	image: string | File;
	width: number;
	height: number;
	onSubmit: (user: IUser) => void;
};

export type ProfileAvatarEditorState = {
	image: string | File;
	allowZoomOut: boolean;
	position: Position;
	scale: number;
	rotate: number;
	borderRadius: number;
	preview?: {
		img: string;
		rect: {
			x: number;
			y: number;
			width: number;
			height: number;
		};
		scale: number;
		width: number;
		height: number;
		borderRadius: number;
	};
	width: number;
	height: number;
	disableCanvasRotation: boolean;
	isTransparent: boolean;
	backgroundColor?: string;
	showGrid: boolean;
};
