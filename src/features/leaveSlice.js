import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Leave data
export const fetchLeaveData = createAsyncThunk(
  'leave/fetchLeaveData',
  async () => {
    const response = await axios.get('http://localhost:3001/leaveData');
    return response.data;
  }
);

// Approve leave
export const approveLeave = createAsyncThunk(
  'leave/approveLeave',
  async (leaveId, { getState }) => {
    const state = getState();
    const leave = state.leave.data.find((item) => item.id === leaveId);
    const updatedLeave = { ...leave, status: 'Approved' };

    await axios.put(`http://localhost:3001/leaveData/${leaveId}`, updatedLeave);

    return leaveId;
  }
);

// Reject leave
export const rejectLeave = createAsyncThunk(
  'leave/rejectLeave',
  async (leaveId, { getState }) => {
    const state = getState();
    const leave = state.leave.data.find((item) => item.id === leaveId);
    const updatedLeave = { ...leave, status: 'Rejected' };

    await axios.put(`http://localhost:3001/leaveData/${leaveId}`, updatedLeave);

    return leaveId;
  }
);

// Cancel Leave
export const cancelLeave = createAsyncThunk(
  'leave/cancelLeave',
  async (leaveId, { getState }) => {
    const state = getState();
    const leave = state.leave.data.find((item) => item.id === leaveId);
    const updatedLeave = { ...leave, status: 'Canceled' };

    await axios.put(`http://localhost:3001/leaveData/${leaveId}`, updatedLeave);

    return leaveId;
  }
);

const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeaveData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaveData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLeaveData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(approveLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Approved';
        }
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Rejected';
        }
      })
      .addCase(cancelLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Canceled';
        }
      });
  },
});

export default leaveSlice.reducer;