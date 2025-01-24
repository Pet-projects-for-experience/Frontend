export type AnswerRequestOrganizerType = {
	handleAnswerAccept: (arg: {
		id: number;
		request_status: number;
		participant_user_id: number;
	}) => void;
	handleAnswerReject: (arg: {
		id: number;
		request_status: number;
		participant_user_id: number;
	}) => void;
	id: number;
	request_status: number;
	participant_user_id: number;
};
