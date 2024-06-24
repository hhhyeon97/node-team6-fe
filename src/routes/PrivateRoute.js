import React from 'react'
import { useSelector } from 'react-redux'
import ReservationPage from '../pages/ReservationPage'
import { Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const { user } = useSelector(state => state.user)

    return user ? <ReservationPage /> : <Navigate to='/login' />
}

export default PrivateRoute