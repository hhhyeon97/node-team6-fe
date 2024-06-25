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

// [ 나의예매 정보 가져오기 ]
const getMyReserve = (query) => async (dispatch) => {
	try{
			dispatch({ type: types.GET_MY_RESERVATION_REQUEST })
			const params = { ...query };
			const response = await api.get('/reserve/me', { params });
			console.log('rrr', response)
			if (response.status !== 200) throw new Error(response.error)
			dispatch({ type: types.GET_MY_RESERVATION_SUCCESS, payload: response.data})
	}catch(error){
			dispatch({ type: types.GET_MY_RESERVATION_FAIL, payload: error.error })
	}
}

export const reservationAction = {
    createReservation,
    getMyReserve,
}