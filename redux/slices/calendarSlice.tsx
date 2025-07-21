import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  backgroundColor: string;
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    resetEvents: (state) => {
      state.events = [];
    },
  },
});

export const { setEvents, addEvent, resetEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
