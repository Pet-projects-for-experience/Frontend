import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProjectsRequests } from './models/IProjectsRequests';
import { FavoriteProjectType } from './models/IFavoriteProject';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	tagTypes: ['FavoritesProjects'],
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${BASE_URL}/api/v1`,
		prepareHeaders: async (headers) => {
			const accessToken = localStorage.getItem('token');
			if (accessToken) {
				headers.set('Authorization', `Token ${accessToken}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getProjectsPreviewMain: builder.query({
			query: () => ({
				url: '/projects/preview_main/',
				method: 'GET',
			}),
		}),
		getAllProjects: builder.query({
			query: ({ currentPage, query }) => ({
				url: `/projects/?page=${currentPage}&search=${query}`,
				method: 'GET',
			}),
		}),
		getFavoriteProjects: builder.query({
			query: ({ currentPage, query }) => ({
				url: `/projects/?is_favorite=1&page=${currentPage}&search=${query}`,
				method: 'GET',
			}),
			providesTags: ['FavoritesProjects'],
		}),
		getProjectById: builder.query({
			query: ({ id }) => ({
				url: `/projects/${id}/`,
				method: 'GET',
			}),
		}),
		getAllRequestsParticipation: builder.query({
			query: ({ role, currentPage, statusNumber }) =>
				statusNumber === null
					? {
							url: `/projects/requests/?role=${role}&page=${currentPage}`,
							method: 'GET',
						}
					: {
							url: `/projects/requests/?role=${role}&page=${currentPage}&request_status=${statusNumber}`,
							method: 'GET',
						},
			keepUnusedDataFor: 1,
		}),
		deleteRequestsParticipation: builder.mutation({
			query: (id) => ({
				url: `/projects/requests/${id}/`,
				method: 'DELETE',
			}),
		}),
		requestParticipationInProjects: builder.mutation<IProjectsRequests,IProjectsRequests>({
			query: (projects) => ({
				url: `/projects/requests/`,
				method: 'POST',
				body: projects,
			}),
		}),
		addFavoriteProject: builder.mutation<FavoriteProjectType,FavoriteProjectType>({
			query: (project) => ({
				url: `/projects/${project.id}/favorite/`,
				method: 'POST',
				body: project,
			}),
			invalidatesTags: ['FavoritesProjects'],
		}),
		deleteFavoriteProject: builder.mutation({
			query: (id) => ({
				url: `/projects/${id}/favorite/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['FavoritesProjects'],
		}),
	}),
});

export const {
	useGetProjectsPreviewMainQuery,
	useGetAllProjectsQuery,
	useGetProjectByIdQuery,
	useGetAllRequestsParticipationQuery,
	useDeleteRequestsParticipationMutation,
	useRequestParticipationInProjectsMutation,
	useAddFavoriteProjectMutation,
	useDeleteFavoriteProjectMutation,
	useGetFavoriteProjectsQuery,
} = projectsApi;
