import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvent: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => event.id === payload.id ? payload : event);
    },
    onDeleteEvent: (state, { payload }) => {
      if(state.activeEvent) {
        state.events = state.events.filter(event => event.id !== payload.id)
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      
      state.isLoadingEvent = false;
      
      payload.map(event => {
        const exist = state.events.some(eventDb => eventDb.id === event.id);
        
        if(!exist){
          state.events.push(event)
        }

      })

    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvent = true;
      state.events = [];
      state.activeEvent = null;
    } 
  },
});

export const { 
  onAddNewEvent, 
  onDeleteEvent,
  onUpdateEvent, 
  setActiveEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions;
