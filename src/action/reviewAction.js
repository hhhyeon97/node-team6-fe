import api from '../utils/api';
import * as types from '../constants/review.constants';

// [ 전체 리뷰 리스트 가져오기 (admin)]
const getReviewList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_REVIEW_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/review', { params });
    console.log('rrr', response.data)
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_REVIEW_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_REVIEW_LIST_FAIL, payload: error.error });
  }
}

export const reviewActions = {
  getReviewList
}