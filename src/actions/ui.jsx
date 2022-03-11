import { types } from "../types/types";

export const uiCloseModal = () => ({
    type: types.uiCloseModel,
})

export const uiOpenModal = () => ({
    type: types.uiOpenModel,
})

export const uiSetDatesModal = (start, end) => ({
    type: types.uiSetDatesModel,
    payload: {
        start, end
    }
})