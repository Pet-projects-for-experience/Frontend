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
  project_specialists: [
    {
      profession: 0,
      skills: [0],
      count: 1,
      level: 1,
      // eslint-disable-next-line camelcase
      is_required: true,
    },
  ],
};
const projectSpecialistsSlice = createSlice({
  name: 'projectSpecialists',
  initialState,
  reducers: {
    // Existing update action
    updateProjectSpecialist: (state, action: PayloadAction<{ index: number; specialist: Specialist }>) => {
      const { index, specialist } = action.payload;
      if (state.project_specialists[index]) {
        state.project_specialists[index] = {
          ...state.project_specialists[index],
          ...specialist,
        };
      }
    },
    // New action to add a specialist
    addProjectSpecialist: (state, action: PayloadAction<Specialist>) => {
      state.project_specialists.push(action.payload); // Add new specialist to the array
    },
  },
});

export const { updateProjectSpecialist, addProjectSpecialist } = projectSpecialistsSlice.actions;
export default projectSpecialistsSlice.reducer;

