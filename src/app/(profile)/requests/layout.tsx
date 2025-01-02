import React from 'react';
import { RequestsLayout } from '@/shared/layouts';

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <RequestsLayout>{children}</RequestsLayout>;
};

export default Layout;
