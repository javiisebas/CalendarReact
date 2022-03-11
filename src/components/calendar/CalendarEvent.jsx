import React from 'react'

const CalendarEvent = ({ event }) => {

    const { title, notes } = event

    return (
        <div>
            <strong>{title}</strong>
            <span>{notes}</span>
        </div>
    )
}

export default CalendarEvent