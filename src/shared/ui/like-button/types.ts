import { ButtonHTMLAttributes } from 'react';

export type LikeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: 'primary' | 'secondary' | 'trivial';
	disabled?: boolean;
	isActiveLike: boolean;
	isPopupOpen: boolean;
	handleLikeButton: (evt: React.MouseEvent | React.TouchEvent) => void;
	setIsActiveLike: (arg: boolean) => void;
	setIsPopupOpen: (arg: boolean) => void;
};
