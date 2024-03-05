import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/services/models/IUser';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://89.23.117.80/api/v1' }),
	endpoints: (builder) => ({
		createUser: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: '/users/',
				method: 'POST',
				body: user,
			}),
		}),
		authUser: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: '/token/login/',
				method: 'POST',
				body: user,
			}),
		}),
		resetPasswordUser: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: 'users/reset_password/',
				method: 'POST',
				body: user,
			}),
		}),
	}),
});

export const {
	useCreateUserMutation,
	useAuthUserMutation,
	useResetPasswordUserMutation,
} = userApi;
