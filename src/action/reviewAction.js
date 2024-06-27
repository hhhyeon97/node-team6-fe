import api from '../utils/api';
import * as types from '../constants/review.constants';
import { reservationAction } from './reservationAction';

// [ 전체 리뷰 리스트 가져오기 (admin) ]
const getReviewList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_REVIEW_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/review', { params });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_REVIEW_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_REVIEW_LIST_FAIL, payload: error.error });
  }
}

// [ 리뷰 상태 수정하기 (admin)]
const updateReviewState = (id, isSuspended, setSearchQuery) => async (dispatch) => {
  try{
    console.log("isSuspended", isSuspended)
    dispatch({ type: types.EDIT_REVIEW_STATE_REQUEST });
    const response = await api.put(`/review/${id}`, {isSuspended});
    console.log('rrrr', response.data)
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ 
      type: types.EDIT_REVIEW_STATE_SUCCESS,
      payload: response.data
    });
    dispatch(reviewAction.getReviewList({page:1, name:""}));  
  }catch(error){
    dispatch({ type: types.EDIT_REVIEW_STATE_FAIL, payload: error.error });
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

// [ 전체 리뷰 리스트 가져오기 (my) ]
const getMyReview = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MY_REVIEW_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/review/my', { params });
    console.log('recive reviewMyList: ', response.data.data)

    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_MY_REVIEW_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log('Error: ', error);
    dispatch({ type: types.GET_MY_REVIEW_LIST_FAIL, payload: error.error });
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
    dispatch(reservationAction.getMyReserve({ page: 1 }));
  } catch {
    dispatch({ type: types.CREATE_REVIEW_FAIL });
  }
}
// [ 리뷰를 작성한 예매인지 체크하기 ]
const checkReviewed = (reserveTitle, reserveId) => async (dispatch) => {
  try {
    dispatch({ type: types.CHECKE_REVIEWED_RESERVATION_REQUEST });
    const response = await api.get(`/review/check/${reserveId}`);
    // console.log('action:', reserveTitle, '리뷰결과:',response.data.data);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.CHECKE_REVIEWED_RESERVATION_SUCCESS,
      payload: {
        reserveId,
        reviewed: !!response.data.data // 예매 항목에 대한 리뷰가 있는지 여부를 boolean으로 변환
      }
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
  getMyReview,
  updateReviewState
}