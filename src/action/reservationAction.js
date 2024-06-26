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
			if (response.status !== 200) throw new Error(response.error)
			dispatch({ type: types.GET_MY_RESERVATION_SUCCESS, payload: response.data})
	}catch(error){
			dispatch({ type: types.GET_MY_RESERVATION_FAIL, payload: error.error })
	}
}

// [ 나의 예매상세 가져오기 ]
const getReservationDetail = (id) => async (dispatch) => {
    try{
        dispatch({ type: types.GET_MY_RESERVE_DETAIL_REQUEST })
        const response = await api.get(`/reserve/me/${id}`);
        if (response.status !== 200) throw new Error(response.error)
        console.log('rrr', response.data)
        dispatch({ type: types.GET_MY_RESERVE_DETAIL_SUCCESS, payload: response.data})
    }catch(error){
        dispatch({ type: types.GET_MY_RESERVE_DETAIL_FAIL, payload: error.error })
    }
}
// [ 나의 예매취소 ]
const cancelReservation = (id, navigate) => async (dispatch) => {
    try{
        dispatch({ type: types.CANCEL_RESERVATION_REQUEST });
        const response = await api.put(`/cancel/${id}`);
        if (response.status !== 200) throw new Error(response.error)
        dispatch({ type: types.CANCEL_RESERVATION_SUCCESS,  payload: response.data})
        // 예매취소 반영
        dispatch(reservationAction.getReservationDetail(id));
    }catch(error){
        dispatch({ type: types.CANCEL_RESERVATION_FAIL, payload: error.error })
    }
}

export const reservationAction = {
    createReservation,
    getMyReserve,
    getReservationDetail,
    cancelReservation
}