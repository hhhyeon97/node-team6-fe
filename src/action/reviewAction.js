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
const updateReviewState = (id, isSuspended) => async (dispatch) => {
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
  } catch(error) {
    dispatch({ type: types.CREATE_REVIEW_FAIL, payload: error.error });
  }
}

// [ 리뷰 수정하기 ]
const editReview = (formData, reviewId, setShowDialog, setSearchQuery) => async (dispatch) => {
  try{
    dispatch({ type: types.EDIT_REVIEW_REQUEST });
    const response = await api.put("/review", { ...formData, reviewId });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.EDIT_REVIEW_SUCCESS });
    setShowDialog(false);
    dispatch(reviewAction.getMyReview({ page: 1 }));
  }catch(error){
    dispatch({ type: types.EDIT_REVIEW_FAIL });
  }
}

// [ 리뷰 삭제하기 ]
const deleteReview = (id) => async (dispatch) => {
  try{
    dispatch({ type: types.DELETE_REVIEW_REQUEST });
    const response = await api.delete(`/review/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.DELETE_REVIEW_SUCCESS });
    dispatch(reviewAction.getMyReview({ page: 1 }));
  }catch(error){
    dispatch({ type: types.DELETE_REVIEW_FAIL });
  }
}

const getMainPageReview = ({starRate,reviewQty}) => async(dispatch) =>{
  try{
    dispatch({type:types.GET_MAIN_PAGE_REVIEW_REQUEST});
    const response = await api.get(`/review/main?starRate=${starRate}&reviewQty=${reviewQty}`);
    dispatch({type:types.GET_MAIN_PAGE_REVIEW_SUCCESS,payload:response.data.data})
  }catch(error){
    dispatch({type:types.GET_MAIN_PAGE_REVIEW_FAIL});
  }
}

export const reviewAction = {
  getReviewList,
  createReview,
  getAllReview,
  getMyReview,
  updateReviewState,
  editReview,
  deleteReview,
  getMainPageReview
}