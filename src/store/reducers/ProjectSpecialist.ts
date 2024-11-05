import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Specialist {
	profession: number;
	skills: number[];
	count: number;
	level: number;
	is_required: boolean;
}

interface ProjectSpecialistsState {
	project_specialists: Specialist[];
}

const initialState: ProjectSpecialistsState = {
	// eslint-disable-next-line camelcase
	project_specialists: [], // Start with an empty array
};
const projectSpecialistsSlice = createSlice({
	name: 'projectSpecialists',
	initialState,
	reducers: {

		updateProjectSpecialist: (
			state,
			action: PayloadAction<{ index: number; specialist: Specialist }>
		) => {
			const { index, specialist } = action.payload;
			if (state.project_specialists[index]) {
				state.project_specialists[index] = {
					...state.project_specialists[index],
					...specialist,
				};
			}
		},
		addProjectSpecialist: (state, action: PayloadAction<Specialist>) => {
			state.project_specialists.push(action.payload); // Add new specialist to the array
		},
	},
});

export const { updateProjectSpecialist, addProjectSpecialist } =
	projectSpecialistsSlice.actions;
export default projectSpecialistsSlice.reducer;
