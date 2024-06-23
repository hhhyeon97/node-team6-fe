import * as types from '../constants/review.constants';
const initialState = {
  loading: false,
  review: null,
  error: '',
  reviewList: [],
  totalPageNum: 1,
  selectedReview: null,
};

function reviewReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_REVIEW_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_REVIEW_LIST_SUCCESS:
      return {  ...state, loading: false, 
                reviewList: payload.data,
                totalPageNum: payload.totalPageNum };
    case types.GET_REVIEW_LIST_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state;
  }
}

export default reviewReducer;