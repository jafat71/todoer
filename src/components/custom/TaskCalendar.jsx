import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog"; // Shadcn Alert Dialog

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // To store the event to delete

  // Function to add a new event to the calendar
  const addEvent = () => {
    console.log('Adding event:', newEvent); // Debug: check event data
    if (newEvent.title && newEvent.date) {
      const newEventWithId = {
        id: new Date().getTime(), // Use a timestamp as unique ID
        title: newEvent.title,
        date: newEvent.date,
      };
      console.log('Event added:', newEventWithId); // Debug: check the added event
      setEvents([...events, newEventWithId]); // Add the event to the calendar
      setNewEvent({ title: '', date: '' }); // Clear the form
      setOpenDialog(false); // Close the dialog
    } else {
      alert('Please enter a title and a date');
    }
  };

  // Function to handle dateClick event
  const handleDateClick = (info) => {
    console.log('Date clicked:', info.dateStr); // Debug: log the clicked date
    setNewEvent({
      title: '',
      date: info.dateStr, // Use the clicked date
    });
    setOpenDialog(true); // Open the dialog
  };

  // Function to handle eventClick event for deleting
  const handleEventClick = (info) => {
    console.log('Event clicked:', info.event); // Debug: log the clicked event
    const eventToDelete = info.event;
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el evento "${eventToDelete.title}"?`);
    if (confirmDelete) {
      // Remove event from state
      setEvents(events.filter(event => event.id !== eventToDelete.id));
    }
  };

  return (
    <div className="col-span-2 p-4 border rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Calendario</h2>

      {/* AlertDialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <h3 className="text-lg font-semibold">Nuevo Evento</h3>
          </AlertDialogHeader>

          <AlertDialogDescription>
            {/* Form inside the Alert Dialog */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Título del evento"
                value={newEvent.title}
                onChange={(e) => {
                  console.log('Title changed:', e.target.value); // Debug: log title change
                  setNewEvent({ ...newEvent, title: e.target.value });
                }}
              />
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => {
                  console.log('Date changed:', e.target.value); // Debug: log date change
                  setNewEvent({ ...newEvent, date: e.target.value });
                }}
              />
            </div>
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogAction onClick={addEvent}>Agregar Evento</AlertDialogAction>
            <Button onClick={() => setOpenDialog(false)} variant="outline">Cancelar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* FullCalendar with events */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // Display the events
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        height="auto"
        dateClick={handleDateClick} // Use the dateClick handler
        eventClick={handleEventClick} // Handle event click to delete
        themeSystem="bootstrap"
      />
    </div>
  );
};

export default TaskCalendar;
