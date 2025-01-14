import { ButtonHTMLAttributes } from 'react';

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: 'gmail' | 'vk' | 'yandex' | 'git';
	link: string;
};
