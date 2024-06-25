import * as types from '../constants/review.constants';
const initialState = {
  loading: false,
  review: null,
  error: '',
  reviewList: [],
  totalPageNum: 1,
  selectedReview: null,
  reviewedReserve: null,
  reviewAllList: []
};

function reviewReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_REVIEW_LIST_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
    case types.GET_ALL_REVIEW_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_REVIEW_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '',
        reviewList: payload.data,
        totalPageNum: payload.totalPageNum
      };
    case types.GET_ALL_REVIEW_LIST_SUCCESS:
      return { ...state, loading: false, error: '', reviewAllList: payload.data }
    case types.CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, error: '' }
    case types.CHECKE_REVIEWED_RESERVATION_SUCCESS:
      return { ...state, loading: false, error: '', reviewedReserve: payload.data }
    case types.GET_REVIEW_LIST_FAIL:
    case types.CREATE_REVIEW_FAIL:
    case types.CHECKE_REVIEWED_RESERVATION_FAIL:
    case types.GET_ALL_REVIEW_LIST_FAIL:
      return { ...state, loading: false, error: payload }
    case types.SET_SELECTED_REVIEW:
      return { ...state, selectedReview: payload };
    default:
      return state;
  }
}

export default reviewReducer;