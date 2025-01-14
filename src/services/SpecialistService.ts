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
					const specialistsArray = filters.specialists
						.map((item: number) => `level=${item}`)
						.join('&');
					query.push(specialistsArray);
				}
				if (filters.specialty !== undefined) {
					const specialtyArray = filters.specialty
						.map((item: number) => `specialization=${item}`)
						.join('&');
					query.push(specialtyArray);
				}
				if (filters.skills !== undefined) {
					const skillsArray = filters.skills
						.map((item: number) => `skills=${item}`)
						.join('&');
					query.push(skillsArray);
				}
				if (
					filters.searchQuery !== undefined &&
					filters.searchQuery.length > 0
				) {
					query.push(`user_search=${filters.searchQuery}`);
				}
				const url = `/profiles/?page=${currentPage}${query.length > 0 ? `&${query.join('&')}` : ''}`;
				console.log(url);
				return {
					url,
					method: 'GET',
					providerTags: 'allSpecialist',
				};
			},
		}),
	}),
});

export const { useGetAllSpecialistsDataQuery } = specialistsApi;
