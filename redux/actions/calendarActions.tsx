import { AppDispatch, RootState } from '../store';
import { CalendarEvent, setEvents, addEvent, resetEvents } from '../slices/calendarSlice';

const getNextCalendarEventId = (): number => {
  const current = localStorage.getItem('nextCalendarEventId');
  const nextId = current ? parseInt(current, 10) + 1 : 1;
  localStorage.setItem('nextCalendarEventId', nextId.toString());
  return nextId;
};

export const loadCalendarEvents = () => {
  return (dispatch: AppDispatch) => {
    const stored = localStorage.getItem('calendarEvents');
    if (stored) {
      dispatch(setEvents(JSON.parse(stored)));
    }
  };
};

export const saveCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const newEvent: CalendarEvent = { ...event, id: getNextCalendarEventId() };
    dispatch(addEvent(newEvent));

    const updatedEvents = getState().calendar.events;
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };
};

export const resetCalendarEvents = () => {
  return (dispatch: AppDispatch) => {
    dispatch(resetEvents());
    localStorage.removeItem('calendarEvents');
    localStorage.removeItem('nextCalendarEventId');
  };
};
