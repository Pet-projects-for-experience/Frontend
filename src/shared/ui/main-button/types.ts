import { ButtonHTMLAttributes, ReactNode } from 'react';

export type MainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant: 'primary' | 'secondary' | 'trivial' | 'inverse';
	width: 'regular' | 'max' | 'min';
	IconLeft?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
	IconRight?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
	isActive?: boolean;
};
