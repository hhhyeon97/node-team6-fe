import api from '../utils/api';
import * as types from '../constants/reservation.constants';

const createReservation = (payload, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.POST_RESERVATION_REQUEST })
        const response = await api.post('/reserve', payload)

        if (response.status !== 200) throw new Error(response.error)

        dispatch({ type: types.POST_RESERVATION_SUCCESS, payload: response.data.reservationId })
        navigate("/reservation/success")
    } catch (error) {
        dispatch({ type: types.POST_RESERVATION_FAIL, payload: error.error })
        console.log('POST_RESERVATION_FAIL', error);
    }
}

export const reservationAction = {
    createReservation,
}