import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { useAuthStore } from '../../hooks/useAuthStore';

export const FabAddNew = () => {
  const { user } = useAuthStore();
  const { openModal }  = useUiStore();
  const { onActiveEvent }  = useCalendarStore();

  const handleClickNew = () => {

    onActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: user.uid,
        name: user.name,
      },
    })
    openModal();
  }

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className="fa-solid fa-plus"></i>
    </button>
  )
}
