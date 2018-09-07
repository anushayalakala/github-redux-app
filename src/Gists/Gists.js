import React from 'react';
import '../Styles/Gists.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui';
import { bindActionCreators } from 'redux';
import { getUserGists } from './GistActions';

class Gists extends React.Component {
  componentDidMount() {
    this.props.getUserGists();
  }

  render() {
    const divStyles = {
      height: 80,
      padding: 10,
    };
    const listStyles = {
      padding: 20,
      fontSize: 20,
    };
    const loadingStyles = {
      height: 30,
      textAlign: 'center',
    };
    const { gistsdata, error, isLoading } = this.props;
    const fileNames = gistsdata.map((obj) => {
      const { files, id } = obj;
      return { fileName: Object.keys(files)[0], fileId: id };
    });
    return (
      <MuiThemeProvider>
        <div className="usergists">
          { isLoading
            ? (
              <div style={loadingStyles}><span>User Gists Loading...</span></div>
            )
            : (
              <div>
                { error
                  ? (
                    <div style={loadingStyles}><span>No User Gists found</span></div>
                  )
                  : (
                    <List className="gists-ul">
                      {
                        fileNames.map(obj => (
                          <div style={divStyles} className="gists-li" key={obj.fileId}>
                            <ListItem
                              style={listStyles}
                              containerElement={
                                (
                                  <Link
                                    id="filelink"
                                    to={{ pathname: `gists/${obj.fileId}`, state: { userName: localStorage.getItem('USER_NAME') } }}
                                  />
                                )
                              }
                            >
                              {obj.fileName}
                            </ListItem>
                            <Divider />
                          </div>))
                      }
                    </List>
                  )
                }
              </div>
            )}
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  gistsdata: state.gist.gistsdata,
  error: state.gist.error,
  isLoading: state.gist.isLoading,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserGists,
  }, dispatch)
);
Gists.propTypes = {
  getUserGists: PropTypes.func.isRequired,
  gistsdata: PropTypes.instanceOf(Array).isRequired,
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Gists);
