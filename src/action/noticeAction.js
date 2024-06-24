import api from '../utils/api';
import * as types from '../constants/notice.constants';

// [ 공지사항 리스트 가져오기 ]
const getNoticeList = (query) => async (dispatch) => {
  try {
    console.log("quert", query)
    dispatch({ type: types.GET_NOTICE_LIST_REQUEST });
    const params = { ...query };
    const response = await api.get('/notice', { params });
    console.log('noticerrr', response.data)
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_NOTICE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_NOTICE_FAIL, payload: error.error });
  }
}

export const noticeAction = {
  getNoticeList
};