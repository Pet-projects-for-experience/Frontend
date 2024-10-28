import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectService } from './models/IProject';
import { IProjectsRequests } from './models/IProjectsRequests';
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
			query: ({ currentPage }) => ({
				url: `/projects/?page=${currentPage}`,
				method: 'GET',
			}),
		}),
		getProjectById: builder.query({
			query: ({ id }) => ({
				url: `/projects/${id}/`,
				method: 'GET',
			}),
		}),

		postProject: builder.mutation<ProjectService, ProjectService>({
			query: (body) => ({
				url: `/projects/`,
				method: 'POST',
				body: body,
			}),
		}),
		requestParticipationInProjects: builder.mutation<IProjectsRequests,IProjectsRequests>({
			query: (projects) => ({
				url: `/projects/requests/`,
				method: 'POST',
				body: projects,
			}),
		}),
	}),
});

export const {
	useGetProjectsPreviewMainQuery,
	useGetAllProjectsQuery,
	useGetProjectByIdQuery,
	usePostProjectMutation,
	useRequestParticipationInProjectsMutation,
} = projectsApi;
