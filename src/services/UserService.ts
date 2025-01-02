import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/services/models/IUser'; // const BASE_DEV_URL = process.env.NEXT_PUBLIC_BASE_DEV_URL;
import { Speciality } from '@/shared/types/specialty';

// const BASE_DEV_URL = process.env.NEXT_PUBLIC_BASE_DEV_URL;
// const BASE_TEST_URL = process.env.NEXT_PUBLIC_BASE_TEST_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${BASE_URL}/api/v1`,
		// process.env.NODE_ENV === 'production' ? BASE_TEST_URL : BASE_DEV_URL,
		prepareHeaders: async (headers) => {
			const accessToken = localStorage.getItem('token');
			if (accessToken) {
				headers.set('Authorization', `Token ${accessToken}`);
			}
			return headers;
		},
	}),
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
		logoutUser: builder.mutation({
			query: () => ({
				url: '/token/logout/',
				method: 'POST',
			}),
		}),
		resetPasswordUser: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: user,
			}),
		}),
		// не нужен
		getUserMe: builder.query({
			query: () => ({
				url: '/users/me/',
				method: 'GET',
			}),
		}),
		changePassword: builder.mutation<IUser, IUser>({
			query: ({ newPassword, password }) => ({
				url: '/users/set_password/',
				method: 'POST',
				body: {
					// eslint-disable-next-line camelcase
					new_password: newPassword,
					// eslint-disable-next-line camelcase
					current_password: password,
				},
			}),
		}),
		deleteAccount: builder.mutation({
			query: (password) => ({
				url: '/users/me/',
				method: 'DELETE',
				body: {
					// eslint-disable-next-line camelcase
					current_password: password,
				},
			}),
		}),
		getProfileSettings: builder.query({
			query: () => ({
				url: '/profiles/me/',
				method: 'GET',
			}),
		}),
		changeProfileSettings: builder.mutation<IUser, IUser>({
			query: (user) => ({
				url: '/profiles/me/',
				method: 'PATCH',
				body: user,
			}),
		}),

		changeSpecialty: builder.mutation<Speciality, Speciality>({
			query: ({ id, profession, level, skills }) => ({
				url: `/profiles/me/specialists/${id}/`,
				method: 'PATCH',
				body: {
					profession,
					level,
					skills,
				},
			}),
		}),
		deleteSpecialty: builder.mutation({
			query: (id: number) => ({
				url: `/profiles/me/specialists/${id}/`,
				method: 'DELETE',
			}),
		}),
		addSpecialty: builder.mutation({
			query: (specialty) => ({
				url: '/profiles/me/specialists/',
				method: 'POST',
				body: specialty,
			}),
		}),
	}),
});

export const {
	useCreateUserMutation,
	useAuthUserMutation,
	useLogoutUserMutation,
	useResetPasswordUserMutation,
	useGetUserMeQuery,
	useChangePasswordMutation,
	useDeleteAccountMutation,
	useGetProfileSettingsQuery,
	useChangeProfileSettingsMutation,
	useChangeSpecialtyMutation,
	useDeleteSpecialtyMutation,
	useAddSpecialtyMutation,
} = userApi;
