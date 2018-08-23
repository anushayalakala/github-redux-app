import {
  SAVE_USER_DATA, SAVE_USER_LOADING, SAVE_USER_FAILURE,
} from '../Constants';

export const getData = (isEdit) => {
  const userName = localStorage.getItem('USER_NAME');
  return (dispatch) => {
    dispatch(isLoading(true));
    if (userName) {
      fetch(`https://api.github.com/users/${userName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          dispatch(setUserData(data, isEdit));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isFailure(error));
          dispatch(isLoading(false));
        });
    } else {
      dispatch(isFailure('User Not Set'));
      dispatch(isLoading(false));
    }
  };
};
export const setUserData = (data, isEdit) => ({
  type: SAVE_USER_DATA,
  data,
  isEdit,
});
export const isLoading = value => ({
  type: SAVE_USER_LOADING,
  value,

});
export const isFailure = error => ({
  type: SAVE_USER_FAILURE,
  error,
});
