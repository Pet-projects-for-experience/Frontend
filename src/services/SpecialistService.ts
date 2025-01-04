import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const specialistsApi = createApi({
	reducerPath: 'specilistsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${BASE_URL}/api/v1`,
	}),
	endpoints: (builder) => ({
		getAllSpecialistsData: builder.query({
			query: ({ currentPage, filters }) => {
				const query: Array<string> = [];

				if (filters.status !== undefined) {
					query.push(`ready_to_participate=${filters.status}`);
				}
				if (filters.specialists !== undefined) {
					query.push(`level=${filters.specialists}`);
				}
				if (filters.specialty !== undefined) {
					query.push(
						filters.specialty.map((item: number) => `&specialization=${item}`)
					);
				}
				if (filters.skills !== undefined) {
					query.push(filters.skills.map((item: number) => `&skills=${item}`));
				}
				if (filters.userSearch !== undefined) {
					query.push(`&user_search=${filters.userSearch}`);
				}

				return {
					url: `/profiles/${query.length === 0 ? `?page=${currentPage}` : `?${query.join('&')}`}`,
					method: 'GET',
					providerTags: 'allSpecialist',
				};
			},
		}),
	}),
});

export const { useGetAllSpecialistsDataQuery } = specialistsApi;
