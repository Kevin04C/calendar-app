import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/CalendarApi";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onUpdateEvent, setActiveEvent } from "../store";

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent, isLoadingEvent } = useSelector(state => state.calendar);

  const onActiveEvent = (calendarEvent) => {
    dispatch(setActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      
      if(calendarEvent.id) {
        //Actualizat event
        const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        const updateEvent = convertEventsToDate([data.event]);
        dispatch(onUpdateEvent(...updateEvent));

      }else {
        //Create new event
        const { data } = await calendarApi.post("/events/", calendarEvent); 

        dispatch(onAddNewEvent({...calendarEvent, id: data.event.id}));
      }

    } catch (error) {
        Swal.fire("Ups", `${error.response.data?.msg}`, 'warning');
    }

  }

  const startDeleteEvent = async (calendarEvent) => {
    try {
      const { data } = await calendarApi.delete(`/events/${calendarEvent.id}`);
    
      dispatch(onDeleteEvent(data.deletedEvent));
  
    } catch (error) {
      Swal.fire("Ups", `${error.response.data?.msg}`, 'warning');
    }

  }

  const startLoadEvents = async () => {
    try {
      
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDate(data.events);
    
      dispatch(onLoadEvents(events))

    } catch (error) {
      Swal.fire("Ups", `${error.response.data?.msg}`, 'warning');
    }
  }



  return {
    //Propiedades
    events,
    activeEvent,
    isLoadingEvent,
    hasEventSelected: !!activeEvent,

    //Métodos
    onActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadEvents
  }

}