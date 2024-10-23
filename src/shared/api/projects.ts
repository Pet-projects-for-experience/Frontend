const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllProjects = ({ currentPage, query }: { currentPage: number, query: string }) => {
	function setHeaders(headers: { 'Content-Type': string }) {
		if (accessToken) {
			return {
				...headers,
				Authorization: `Token ${accessToken}`,
			};
		} else {
			return headers;
		}
	}
	const accessToken = localStorage.getItem('token');
	const res = fetch(
		`https://${BASE_URL}/api/v1/projects/?page=${currentPage}&search=${query}`,
		{
			cache: 'no-cache',
			next: { revalidate: 0 },
			headers: setHeaders({
				'Content-Type': 'application/json',
			}),
		}
	);
	return res;
};
