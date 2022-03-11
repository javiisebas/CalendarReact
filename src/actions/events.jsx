import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { fireErrorsSwal } from "../helpers/fireErrorsSwal";
import { mapEvents } from "../helpers/mapEvents";
import { types } from "../types/types";

export const startAddNewEvent = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth
        try {
            const resp = await fetchConToken('events', event, 'POST')
            const { ok: resStatus, evento: newEvent, msg, errors } = await resp.json()

            if (resStatus) {

                event.id = newEvent.id
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(eventAddNew(event))

                Swal.fire('Success', 'La nota ha sido creado con éxito', 'success')
            } else {
                fireErrorsSwal(msg, errors)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startGetEvents = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events')
            const { ok: resStatus, eventos, msg, errors } = await resp.json()

            if (resStatus) {
                dispatch(eventGetByUserId(mapEvents(eventos)))
            } else {
                fireErrorsSwal(msg, errors)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startDeleteEvent = () => {
    return async (dispatch, getState) => {
        const { id: eventId } = getState().events.activeEvent
        try {
            const resp = await fetchConToken(`events/${eventId}`, {}, 'DELETE')
            const { ok: resStatus, msg, errors } = await resp.json()
            if (resStatus) {
                dispatch(eventDelete())

                Swal.fire('Success', 'La nota ha sido eliminada con éxito', 'success')
            } else {
                fireErrorsSwal(msg, errors)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startUpdateEvent = (event) => {
    return async (dispatch, getState) => {

        try {
            const { id: eventId } = getState().events.activeEvent
            const resp = await fetchConToken(`events/${eventId}`, event, 'PUT')
            const { ok: resStatus, msg, errors } = await resp.json()

            if (resStatus) {
                dispatch(eventUpdate(event))
            } else {
                fireErrorsSwal(msg, errors)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventGetByUserId = (eventos) => ({
    type: types.eventGetByUserId,
    payload: eventos
})


export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventRemoveActive = () => ({
    type: types.eventRemoveActive
})

export const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventDelete = () => ({
    type: types.eventDelete
})

export const eventReset = () => ({
    type: types.eventReset
})