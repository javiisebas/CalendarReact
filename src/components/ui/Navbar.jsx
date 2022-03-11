import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { eventReset } from '../../actions/events'

const Navbar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(eventReset())
        dispatch(startLogout())
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <div className="container-fluid">
                <span className='navbar-brand'>{name}</span>

                <div className="d-flex gap-1">
                    <button className='btn btn-outline-danger'
                        onClick={handleLogout}>
                        <i className='fas fa-sign-out-alt'></i>
                        <span className='pl-1'>Salir</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar