import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

const BtnAddNewEvent = () => {

    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(uiOpenModal())
    }

    return (
        <button className='btn btn-primary btn-new-event' onClick={handleOpenModal}>
            <i className='fas fa-plus'></i>
        </button>
    )
}

export default BtnAddNewEvent