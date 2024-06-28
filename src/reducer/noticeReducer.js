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
    case types.CREATE_NOTICE_REQUEST:
    case types.EDIT_NOTICE_REQUEST:
    case types.DELETE_NOTICE_REQUEST:
      return { ...state, loading: true };
    case types.GET_NOTICE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        noticeList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    // case types.GET_USER_NOTICE_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     importantNotices: payload.importantNotices,
    //     normalNotices: payload.normalNotices,
    //     totalPageNum: payload.totalPageNum,
    //     loading: false,
    //   };
    case types.CREATE_NOTICE_SUCCESS:
    case types.EDIT_NOTICE_SUCCESS:
    case types.DELETE_NOTICE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.GET_NOTICE_LIST_FAIL:
    case types.CREATE_NOTICE_FAIL:
    case types.EDIT_NOTICE_FAIL:
    case types.DELETE_NOTICE_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_SELECTED_NOTICE:
      return { ...state, selectedNotice: payload };
    default:
      return state;
  }
}

export default noticeReducer;
