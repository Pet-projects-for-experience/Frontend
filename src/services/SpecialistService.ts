import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const specialistsApi = createApi({
	reducerPath: 'specilistsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${BASE_URL}/api/v1`,
	}),
	endpoints: (builder) => ({
		getAllSpecialistsData: builder.query({
			query: ({
				currentPage,
				readyToParticipate,
				level,
				specialization,
				skills,
			}) => {
				return {
					url: `/profiles/?page=${currentPage}
				${
					readyToParticipate !== undefined
						? `&ready_to_participate=${readyToParticipate}`
						: ''
				}
				${level !== undefined ? `&level=${level}` : ''}
				${
					specialization !== undefined
						? specialization.map((item) => `&specialization=${item}`)
						: ''
				}
				${skills !== undefined ? skills.map((item) => `&skills=${item}`) : ''}`,
					method: 'GET',
					providerTags: 'allSpecialist',
				};
			},
		}),
	}),
});

export const { useGetAllSpecialistsDataQuery } = specialistsApi;
