import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import 'moment/locale/es'

import Navbar from '../ui/Navbar'
import { uiOpenModal, uiSetDatesModal } from '../../actions/ui';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { eventRemoveActive, eventSetActive, startGetEvents } from '../../actions/events';
import BtnAddNewEvent from '../ui/BtnAddNewEvent';
import BtnDeleteEvent from '../ui/BtnDeleteEvent';



moment.locale('es')
const localizer = momentLocalizer(moment)

const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.events)
    const { uid } = useSelector(state => state.auth)


    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(startGetEvents())
    }, [dispatch]);

    const onDoubleClickEvent = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        if (e) {
            dispatch(uiSetDatesModal(e.start, e.end))
            dispatch(uiOpenModal())
            dispatch(eventRemoveActive())
        }
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: uid === event.user._id ? '#3498DB' : '#9B59B6',
            borderRadius: '.3rem',
            width: '100%',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return { style }
    }

    return (
        <div className='calendar-screen'>

            <Navbar />

            <Calendar
                localizer={localizer}
                startAccessor="start"
                events={events}
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{ event: CalendarEvent }}
            />


            {
                activeEvent &&
                <BtnDeleteEvent />
            }
            <BtnAddNewEvent />
            <CalendarModal />

        </div>
    )
}

export default CalendarScreen