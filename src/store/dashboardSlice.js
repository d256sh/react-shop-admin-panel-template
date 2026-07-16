import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardService } from "../services/dashboardService";

const initialState = {
  widgets: {
    user: { amount: 0, diff: 0, isPositive: true },
    order: { amount: 0, diff: 0, isPositive: true },
    earning: { amount: 0, diff: 0, isPositive: true, isMoney: true },
    balance: { amount: 0, diff: 0, isPositive: true, isMoney: true },
  },
  featured: {
    progress: 0,
    todaySales: 0,
    target: 0,
    lastWeek: 0,
    lastMonth: 0,
    targetPositive: true,
    lastWeekPositive: false,
    lastMonthPositive: true,
  },
  chart: [],
  transactions: [],
  updatedAt: null,
  status: "idle",
  error: null,
};

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async () => {
    return dashboardService.fetchDashboardData();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.widgets = action.payload.widgets;
        state.featured = action.payload.featured;
        state.chart = action.payload.chart;
        state.transactions = action.payload.transactions;
        state.updatedAt = action.payload.updatedAt;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectDashboardWidgets = (state) => state.dashboard.widgets;
export const selectDashboardFeatured = (state) => state.dashboard.featured;
export const selectDashboardChart = (state) => state.dashboard.chart;
export const selectDashboardTransactions = (state) => state.dashboard.transactions;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectDashboardUpdatedAt = (state) => state.dashboard.updatedAt;

export default dashboardSlice.reducer;
