import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessageEs, localizer } from "../../helpers";
import { NavBar, CalendarEvent, CalendarModal} from '../'
import { useState } from "react";
import { useCalendarStore, useUiStore } from "../../hooks";
import { FabAddNew,FabDelete } from '../'
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { LoadingEvent } from "../views/LoadingEvent";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, onActiveEvent, startLoadEvents, isLoadingEvent } = useCalendarStore();
  const { openModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = event.user === user.uid || event.user._id === user.uid
    
    const style =  {
      backgroundColor: `${isMyEvent ? '#347Cf7' : '#4B4B4B'}`,
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openModal();
  }

  const onSeletect = (event) => {
    onActiveEvent(event)
  }
  
  const onViewChange = (event) =>  {
    localStorage.setItem("lastView", event);
  }

  useEffect(() => {
    startLoadEvents();
  }, [])
  


  return (
    <>
      <NavBar />

      {
        isLoadingEvent ? <LoadingEvent />
      :
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 62px)' }}
          messages={getMessageEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSeletect}
          onView={onViewChange}
        />
      }
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
