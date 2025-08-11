import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type note = {
  title: string;
  content: string
  _id:string
};

type notesState = {
  notes: note[] | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: notesState = {
  notes: null,
  isLoading: false,
  isError: false,
};

export const getNotes = createAsyncThunk<note[], string>(
  'notes/getNotes',
  async (token: string) => {
    const { data } = await axios.get<{ notes: note[] }>(
      'https://note-sigma-black.vercel.app/api/v1/notes',
      {
        headers: {
          token: `3b8ny__${token}`,
        },
      }
    );
    return data.notes;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
          state.notes = action.payload; 
      })
      .addCase(getNotes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default notesSlice.reducer;
