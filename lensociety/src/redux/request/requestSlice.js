import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  error: null,
  loading: false,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    getRequestsStart: (state) => {
      state.loading = true;
    },
    getRequestsSuccess: (state, action) => {
      state.requests = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRequestsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createRequestStart: (state) => {
      state.loading = true;
    },
    createRequestSuccess: (state, action) => {
      state.requests.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateRequestStart: (state) => {
      state.loading = true;
    },
    updateRequestSuccess: (state, action) => {
      state.requests = state.requests.map(request =>
        request.id === action.payload.id ? action.payload : request
      );
      state.loading = false;
      state.error = null;
    },
    updateRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteRequestStart: (state) => {
      state.loading = true;
    },
    deleteRequestSuccess: (state, action) => {
      state.requests = state.requests.filter(request => request.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getRequestsStart,
  getRequestsSuccess,
  getRequestsFailure,
  createRequestStart,
  createRequestSuccess,
  createRequestFailure,
  updateRequestStart,
  updateRequestSuccess,
  updateRequestFailure,
  deleteRequestStart,
  deleteRequestSuccess,
  deleteRequestFailure,
} = requestSlice.actions;

export default requestSlice.reducer;
