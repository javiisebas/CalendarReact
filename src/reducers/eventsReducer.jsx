import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
}

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.eventGetByUserId:
            return {
                ...state,
                events: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }


        case types.eventRemoveActive:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(event => {
                    return event.id === action.payload.id
                        ? action.payload
                        : event
                })
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(event => {
                    return event.id !== state.activeEvent.id
                        && event
                }),
                activeEvent: null
            }

        case types.eventReset:
            return {
                ...initialState
            }


        default:
            return state;
    }
}