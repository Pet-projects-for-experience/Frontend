import React from 'react';
import { FavoritesLayout } from '@/shared/layouts';

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <FavoritesLayout>{children}</FavoritesLayout>;
};

export default Layout;