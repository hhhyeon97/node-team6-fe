import * as types from '../constants/notice.constants';
const initialState = {
  loading: false,
  notice: null,
  error: '',
  noticeList: [],
  totalPageNum: 1,
  selectedNotice: null,
};

function noticeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_NOTICE_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_NOTICE_LIST_SUCCESS:
      return { ...state, loading: false, error: '',
              noticeList: payload.data,
              totalPageNum: payload.totalPageNum,
      }
    case types.GET_NOTICE_LIST_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state;
  }
}

export default noticeReducer;