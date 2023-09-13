import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaginationOption } from '@interfaces/pagination.interface';
import { DEFAULT_PAGINATION_OPTIONS } from '@/constants';

type InitialState = {
  paginationOptions: IPaginationOption;
};

const initialState: InitialState = {
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
};

const paginationSlice = createSlice({
  name: 'paginationOptions',
  initialState,
  reducers: {
    setPaginationOptions: (state, action: PayloadAction<IPaginationOption>) => {
      state.paginationOptions = { ...action.payload };
    },
  },
});

export const { setPaginationOptions } = paginationSlice.actions;

export default paginationSlice.reducer;
