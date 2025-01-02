import { Option } from '@/shared/types/option';
export type IProjectsRequests = {
	project: number;
	position: number | Option;
	cover_letter?: string;
	answer?: string;
};
