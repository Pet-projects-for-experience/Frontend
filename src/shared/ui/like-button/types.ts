import { ButtonHTMLAttributes } from 'react';

export type LikeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: 'primary' | 'secondary' | 'trivial';
	disabled?: boolean;
	isActive: boolean;
	handleActiveLikeButton: () => void;
	setIsActive: (arg: boolean) => void;
};