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

// Create New Leave
export const createNewLeave = createAsyncThunk(
  'leave/createNewLeave',
  async (newLeave) => {
    const response = await axios.post('http://localhost:3001/leaveData', newLeave);
    return response.data; // Return the newly created leave
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
      // Fetch leave data
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
      // Approve leave
      .addCase(approveLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Approved';
        }
      })
      // Reject leave
      .addCase(rejectLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Rejected';
        }
      })
      // Cancel leave
      .addCase(cancelLeave.fulfilled, (state, action) => {
        const leaveId = action.payload;
        const leave = state.data.find((item) => item.id === leaveId);
        if (leave) {
          leave.status = 'Canceled';
        }
      })
      // Create new leave
      .addCase(createNewLeave.fulfilled, (state, action) => {
        state.data.push(action.payload); 
      })
      .addCase(createNewLeave.rejected, (state, action) => {
        state.error = action.error.message; 
      });
  },
});

export default leaveSlice.reducer;
