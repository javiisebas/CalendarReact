import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import PrivateRoutes from './PrivateRouter'
import PublicRoutes from './PublicRoutes'

const AppRouter = () => {

    const { checking, uid } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch]);

    if (checking) {
        return <LoadingScreen />
    }

    return (

        <BrowserRouter>
            <Routes>
                <Route path='/login' element={
                    <PublicRoutes isLoggedIn={uid}>
                        <LoginScreen />
                    </PublicRoutes>
                } />
                <Route path='/*' element={
                    <PrivateRoutes isLoggedIn={uid}>
                        <CalendarScreen />
                    </PrivateRoutes>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter