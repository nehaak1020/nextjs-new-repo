'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
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

export default function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventType, setEventType] = useState<'event' | 'reminder' | ''>('');
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleAdd = () => {
    if (!eventType || !eventText) return;

    setEvents([
      ...events,
      {
        title: `${eventType === 'event' ? '🟨 Event' : '🔵 Reminder'}: ${eventText}`,
        start: selectedDate,
        backgroundColor: eventType === 'event' ? '#FFEB3B' : '#2196F3',
      },
    ]);

    setOpen(false);
    setEventType('');
    setEventText('');
  };

  const handleReset = () => {
    setEvents([]);
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
        events={events}
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
