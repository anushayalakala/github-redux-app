import {
  GET_USER_GISTS, USER_GISTS_LOADING, GISTS_FAILURE, GET_GIST_FILES, GIST_FILES_FAILURE,
} from '../Constants';

export const getUserGists = () => {
  const userName = localStorage.getItem('USER_NAME');
  return (dispatch) => {
    dispatch(gistLoading(true));
    if (userName) {
      fetch(`https://api.github.com/users/${userName}/gists`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          dispatch(getGists(data));
          dispatch(gistLoading(false));
        })
        .catch((error) => {
          dispatch(gistsFailure(error));
          dispatch(gistLoading(false));
        });
    } else {
      dispatch(gistsFailure('User Not Defined'));
      dispatch(gistLoading(false));
    }
  };
};

export const getGists = gistsdata => ({
  type: GET_USER_GISTS,
  gistsdata,
});
export const gistLoading = isLoading => ({
  type: USER_GISTS_LOADING,
  isLoading,
});
export const gistsFailure = error => ({
  type: GISTS_FAILURE,
  error,
});
export const getGistFiles = Id => (dispatch) => {
  fetch(`https://api.github.com/gists/${Id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(GistFiles(data));
    })
    .catch((error) => {
      dispatch(GistFilesFailure(error));
    });
};
export const GistFiles = gistFiles => ({
  type: GET_GIST_FILES,
  gistFiles,
});
export const GistFilesFailure = error => ({
  type: GIST_FILES_FAILURE,
  error,
});
