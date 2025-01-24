/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProjectsRequests } from './models/IProjectsRequests';
import { FavoriteProjectType } from './models/IFavoriteProject';
import { AnswerOnRequestType } from './models/IAnswerOnRequest';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
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
			keepUnusedDataFor: 1,
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
		requestParticipationInProjects: builder.mutation<IProjectsRequests, IProjectsRequests>({
			query: (projects) => ({
				url: `/projects/requests/`,
				method: 'POST',
				body: projects,
			}),
		}),
		answerOrganizerOnRequest: builder.mutation<AnswerOnRequestType, AnswerOnRequestType> ({
				query: ({
					answer,
					request_status,
					id,
					participant_user_id,
				}
			) => ({
					url: `/projects/requests/${id}/${participant_user_id}/`,
					method: 'PATCH',
					body: { answer, request_status },
				}),
			}
		),
		addFavoriteProject: builder.mutation<FavoriteProjectType, FavoriteProjectType>({
			query: (project) => ({
				url: `/projects/${project.id}/favorite/`,
				method: 'POST',
				body: project,
			}),
		}),
		deleteFavoriteProject: builder.mutation({
			query: (id) => ({
				url: `/projects/${id}/favorite/`,
				method: 'DELETE',
			}),
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
	useAnswerOrganizerOnRequestMutation,
} = projectsApi;
