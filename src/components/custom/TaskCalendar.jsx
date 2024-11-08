import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid'; 
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

  useEffect(() => {
    console.log(events)
  }, [events]);

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      const newEventWithId = {
        id: uuidv4(), 
        title: newEvent.title,
        date: newEvent.date,
      };
      setEvents([...events, newEventWithId]); 
      setNewEvent({ title: '', date: '' }); 
      setOpenDialog(false);
    } else {
      alert('Please enter a title and a date');
    }
  };

  const handleDateClick = (info) => {
    setNewEvent({
      title: '',
      date: info.dateStr,
    });
    setOpenDialog(true); 
  };

  const handleEventClick = (info) => {
    const eventToDelete = info.event;
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el evento "${eventToDelete.title}"?`);
    if (confirmDelete) {
      const filteredEvents = events.filter(e=>e.id!==eventToDelete.id)
      console.log(filteredEvents)
      setEvents(filteredEvents);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Calendario</h2>

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
        customButtons={{
          myCustomButton: {
      text: 'Custom Button',
      click: () => alert('Clicked custom button!'),
    },
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
