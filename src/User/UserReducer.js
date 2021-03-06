import { SAVE_USER_DATA, SAVE_USER_LOADING, SAVE_USER_FAILURE } from '../Constants';

const initialState = {
  isLoading: false,
  error: '',
  userdata: [],
  userName: '',
  isEdit: !localStorage.getItem('USER_NAME'),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_DATA: {
      return Object.assign({}, state, { userdata: action.data, isEdit: action.isEdit, error: '' });
    }
    case SAVE_USER_LOADING: {
      return Object.assign({}, state, { isLoading: action.value });
    }
    case SAVE_USER_FAILURE: {
      return Object.assign({}, state, { error: action.error, userdata: [] });
    }
    default:
      return state;
  }
};
export default userReducer;
