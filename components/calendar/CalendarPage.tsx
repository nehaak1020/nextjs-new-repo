'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  MenuItem,
  Select,
  TextField,
  Box,
} from '@mui/material';
import {
  loadCalendarEvents,
  saveCalendarEvent,
  resetCalendarEvents,
} from '@/redux/actions/calendarActions';
import type { RootState, AppDispatch } from '@/redux/store';

export default function CalendarPage() {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendar.events);

  const calendarEvents = useSelector((state: RootState) => state.calendar.events);

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventType, setEventType] = useState<'event' | 'reminder' | ''>('');
  const [eventText, setEventText] = useState('');

  useEffect(() => {
    dispatch(loadCalendarEvents());
  }, [dispatch]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleAdd = () => {
    if (!eventType || !eventText) return;

    dispatch(
      saveCalendarEvent({
        title: `${eventType === 'event' ? '🟨 Event' : '🔵 Reminder'}: ${eventText}`,
        start: selectedDate,
        backgroundColor: eventType === 'event' ? '#FFEB3B' : '#2196F3',
      })
    );

    setOpen(false);
    setEventType('');
    setEventText('');
  };

  const handleReset = () => {
    dispatch(resetCalendarEvents());
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" color="error" onClick={handleReset}>
          Reset All
        </Button>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={calendarEvents.map(ev => ({ ...ev, id: ev.id.toString() }))}
        height="auto"
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Type</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={eventType}
            onChange={(e) => setEventType(e.target.value as 'event' | 'reminder')}
            sx={{ mt: 1 }}
          >
            <MenuItem value="event">Add Event</MenuItem>
            <MenuItem value="reminder">Add Reminder</MenuItem>
          </Select>

          <TextField
            fullWidth
            label="Enter Description"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            onClick={handleAdd}
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
