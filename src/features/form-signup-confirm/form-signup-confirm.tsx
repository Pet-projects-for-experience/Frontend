'use client';

import React, { FC, useEffect, useState } from 'react';
import { SignupConfirm } from '@/entities/form-signup-confirm';
import { IUser } from '@/services/models/IUser';
import { useCreateUserMutation } from '@/services/UserService';
import { Form } from '@/shared/ui';

export const FormSignupConfirmFeature: FC = () => {
	const [createUser, { error }] = useCreateUserMutation();
	const [secondsRemaining, setSecondsRemaining] = useState(10);

	const handleSubmit = () => {
		if (typeof window !== 'undefined') {
			const userData = localStorage.getItem('userData');
			createUser(userData as IUser)
				.unwrap()
				.then((payload) => console.log('fulfilled', payload))
				.catch((error) => {
					console.log(error.data);
				});
			setSecondsRemaining(10);
		} else {
			console.error('localStorage is not available on the server side.');
		}

		console.log('createUser error', error);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (secondsRemaining > 0) {
				setSecondsRemaining(secondsRemaining - 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [secondsRemaining]);

	return (
		<Form onSubmit={handleSubmit}>
			<SignupConfirm secondsRemaining={secondsRemaining} />
		</Form>
	);
};
