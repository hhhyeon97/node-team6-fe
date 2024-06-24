import * as types from '../constants/reservation.constants'

const initialState = {
    loading: false,
    reservationId: null,
    error: null,
}

function reservationReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case types.POST_RESERVATION_REQUEST:
            return { ...state, loading: true }

        case types.POST_RESERVATION_SUCCESS:
            return { ...state, loading: false, reservationId: payload, error: null }

        case types.POST_RESERVATION_FAIL:
            return { ...state, loading: false, error: payload }

        default:
            return state
    }
}
export default reservationReducer
