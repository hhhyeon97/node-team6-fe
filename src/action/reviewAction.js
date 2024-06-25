import api from '../utils/api';
import * as types from '../constants/review.constants';

// [ 전체 리뷰 리스트 가져오기 (admin) ]
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

// [ 전체 리뷰 리스트 가져오기 (detail) ]
const getAllReview = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_REVIEW_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/review/all', { params });
    console.log('recive reviewAllList: ', response.data)

    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_ALL_REVIEW_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('Error: ', error);
    dispatch({ type: types.GET_ALL_REVIEW_LIST_FAIL, payload: error.error });
  }
}

// [ 리뷰 작성하기 ]
const createReview = (formData, reserveId, setShowDialog, setSearchQuery) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REVIEW_REQUEST });
    const response = await api.post("/review", { ...formData, reserveId });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.CREATE_REVIEW_SUCCESS });
    setShowDialog(false);
  } catch {
    dispatch({ type: types.CREATE_REVIEW_FAIL });
  }
}
// [ 리뷰를 작성한 예매인지 체크하기 ]
const checkReviewed = (reserveId) => async (dispatch) => {
  try {
    console.log("예약아이디", reserveId)
    dispatch({ type: types.CHECKE_REVIEWED_RESERVATION_REQUEST });
    const response = await api.get(`/review/check/${reserveId}`);
    console.log('rrr', response.data);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.CHECKE_REVIEWED_RESERVATION_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: types.CHECKE_REVIEWED_RESERVATION_FAIL });
  }
}

export const reviewAction = {
  getReviewList,
  createReview,
  checkReviewed,
  getAllReview,
}