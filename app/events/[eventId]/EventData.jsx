import React from 'react'
import EventDetail from './EventDetail'

const EventData = async ({ promise }) => {
  const content = await promise

  return <EventDetail content={content} />
}

export default EventData
