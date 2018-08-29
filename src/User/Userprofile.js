import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSave from 'material-ui/svg-icons/content/save';
import '../Styles/Userprofile.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../Store/Index';
import { getData } from './UserActions';

class Userprofile extends React.Component {
  componentDidMount() {
    const tabIndex = '0';
    sessionStorage.setItem('tabIndex', tabIndex);
    store.dispatch({
      type: 'ACTIVE_TAB',
      tabIndex,
    });
    this.props.getData('');
  }

  onUserInput(e) { // eslint-disable-line class-methods-use-this
    const user = e.target.value;
    localStorage.setItem('USER_NAME', user);
  }

  renderUserEditField() {
    const { userName } = this.props;
    return (
      <div>
        <TextField id="usersearch" floatingLabelText="Enter the User" defaultValue={userName} onBlur={this.onUserInput} />
        <IconButton onClick={() => this.props.getData('')} tooltip="Save"><ContentSave /></IconButton>
      </div>
    );
  }

  renderUserReadOnly(login = '') {
    return (
      <div>
        <span style={{ fontSize: 20 }}>{login}</span>
        <IconButton tooltip="Edit User Name" onClick={() => this.props.getData(true)}><EditorModeEdit /></IconButton>
      </div>
    );
  }

  render() {
    const {
      userdata, isLoading, error, isEdit,
    } = this.props;
    const {
      id, avatar_url: avatarUrl, name, login,
    } = userdata;
    const loadingStyles = {
      height: 30,
      textAlign: 'center',
    };
    return (
      <MuiThemeProvider>
        <div className="userprofile">
          { isLoading ? <div style={loadingStyles}><span>User Loading...</span></div>
            : (
              <div className="userdata">
                {error
                  ? (
                    <div className="my-notify-error">
                      <i className="fa fa-times-circle" />
                      <span style={{ padding: 10 }}>Invalid Username</span>
                    </div>
                  ) : ''}
                {id > 0
                  ? (
                    <div>
                      <Avatar size={150} src={avatarUrl} />
                      <div style={{ fontSize: 26 }}>
                        <span>{name}</span>
                      </div>
                      {isEdit ? this.renderUserEditField(login) : this.renderUserReadOnly(login) }
                    </div>
                  )
                  : (
                    <div>
                      <span> Please enter github username</span>
                      {this.renderUserEditField()}
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  userdata: state.user.userdata,
  userName: state.user.userName,
  isLoading: state.user.isLoading,
  error: state.user.error,
  isEdit: state.user.isEdit,
});

const mapDispatchToProps = dispatch => (bindActionCreators({ getData }, dispatch));
Userprofile.propTypes = {
  getData: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userdata: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);
