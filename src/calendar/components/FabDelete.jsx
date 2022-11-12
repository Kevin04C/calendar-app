import React from 'react'
import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

  const { startDeleteEvent, activeEvent, hasEventSelected } = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeleteEvent(activeEvent);
  }
  

  return (
    <button 
      className='btn btn-danger fab-delete' 
      onClick={handleDeleteEvent}
      style={{display:  hasEventSelected ? '' : 'none'}}
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  )
}
