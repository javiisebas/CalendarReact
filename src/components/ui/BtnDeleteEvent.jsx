import React from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteEvent } from '../../actions/events'

const BtnDeleteEvent = () => {

    const dispatch = useDispatch()

    const handleRemoveEvent = () => {
        dispatch(startDeleteEvent())
    }

    return (
        <button className='btn btn-danger btn-dele-event'
            onClick={handleRemoveEvent}>
            <i className='fas fa-trash mr-1'></i>
            <span>Borrar evento</span>
        </button>
    )
}

export default BtnDeleteEvent