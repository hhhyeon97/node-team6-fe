import api from '../utils/api';
import * as types from '../constants/notice.constants';

// [ 공지사항 리스트 가져오기 ]
const getNoticeList = (query) => async (dispatch) => {
  try {
    console.log('quert', query);
    dispatch({ type: types.GET_NOTICE_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/notice', { params });
    console.log('noticerrr', response.data);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_NOTICE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_NOTICE_FAIL, payload: error.error });
  }
};

// [ 공지사항 작성 ]
const createNotice =
  (formData, setShowDialog, setSearchQuery) => async (dispatch) => {
    try {
      dispatch({ type: types.CREATE_NOTICE_REQUEST });
      const response = await api.post('/notice', formData);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.CREATE_NOTICE_SUCCESS });
      setShowDialog(false);
      dispatch(getNoticeList({ page: 1, title: '' }));
    } catch (error) {
      dispatch({ type: types.CREATE_NOTICE_FAIL, payload: error.error });
    }
  };

// [ 공자사항 수정 ]
const editNotice =
  (formData, id, setShowDialog, setSearchQuery) => async (dispatch) => {
    try {
      dispatch({ type: types.EDIT_NOTICE_REQUEST });
      const response = await api.put(`/notice/${id}`, formData);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.EDIT_NOTICE_SUCCESS });
      setShowDialog(false);
      dispatch(getNoticeList({ page: 1, title: '' }));
    } catch (error) {
      dispatch({ type: types.EDIT_NOTICE_FAIL, payload: error.error });
    }
  };

// [ 공지사항 삭제 ]
const deleteNotice = (id, setSearchQuery, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_NOTICE_REQUEST });
    const response = await api.delete(`/notice/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.DELETE_NOTICE_SUCCESS });
    dispatch(getNoticeList({ page: 1, title: '' }));
    setSearchQuery({ page: 1, name: '' });
  } catch (error) {
    dispatch({ type: types.DELETE_NOTICE_FAIL, payload: error.error });
  }
};

// [ 사용자 공지사항 리스트 가져오기 ]
// const getUserNoticeList = (query) => async (dispatch) => {
//   try {
//     console.log('쿼리', query);
//     dispatch({ type: types.GET_NOTICE_LIST_REQUEST });
//     const params = { ...query };
//     const response = await api.get('/notice/user-notice', { params });
//     console.log('noticerrr', response.data);
//     if (response.status !== 200) throw new Error(response.error);
//     dispatch({
//       type: types.GET_NOTICE_LIST_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({ type: types.CREATE_NOTICE_FAIL, payload: error.error });
//   }
// };

// const getUserNoticeList = (query) => async (dispatch) => {
//   try {
//     console.log('쿼리', query);
//     dispatch({ type: types.GET_NOTICE_LIST_REQUEST });
//     const params = { ...query };
//     const response = await api.get('/notice/user-notice', { params });
//     if (response.status !== 200) throw new Error(response.error);

//     const { importantNotices, normalNotices, totalPageNum } = response.data;

//     dispatch({
//       type: types.GET_USER_NOTICE_LIST_SUCCESS,
//       payload: { importantNotices, normalNotices, totalPageNum },
//     });
//   } catch (error) {
//     dispatch({ type: types.GET_NOTICE_LIST_FAIL, payload: error.message });
//   }
// };

const getUserNoticeList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_NOTICE_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/notice/user-notice', { params });
    console.log('데이터', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_NOTICE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_NOTICE_LIST_FAIL, payload: error.message });
  }
};

const getMainNoticeList = (size) => async(dispatch) => {
  try{
    dispatch({type:types.GET_MAIN_NOTICE_LIST_REQUEST})
    console.log(size)
    const response = await api.get(`/notice/main?size=${size}`)
    dispatch({type:types.GET_MAIN_NOTICE_LIST_SUCCESS,payload:response.data.data})
  }catch(error){
    dispatch({type:types.GET_MAIN_NOTICE_LIST_FAIL,error:error.message})
  }
}

export const noticeAction = {
  getNoticeList,
  createNotice,
  editNotice,
  deleteNotice,
  getUserNoticeList,
  getMainNoticeList,
};
