import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    dates: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.uiOpenModel:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModel:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiSetDatesModel:
            return {
                ...state,
                modalOpen: false,
                dates: {
                    start: action.payload.start,
                    end: action.payload.end,
                }
            }

        default:
            return state;
    }
}