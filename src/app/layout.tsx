'use client';

import './globals.css';
import React from 'react';
import { MainLayout } from '@/shared/layouts';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="ru">
			<body>
				<Provider store={store}>
					<MainLayout>{children}</MainLayout>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
