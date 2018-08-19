import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSave from 'material-ui/svg-icons/content/save';
import '../Styles/Userprofile.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData } from './UserActions'

class Userprofile extends React.Component {
  componentDidMount(){
    this.props.getData("");
  }
  onUserInput(e){
    const user = e.target.value;
    localStorage.setItem("USER_NAME",user);
  }
  renderUserEditField(login = '') {
    const { userName} = this.props;
    return (
      <div>
        <TextField id="usersearch" floatingLabelText="Enter the User" defaultValue={userName} onBlur={this.onUserInput} />
        <IconButton onClick ={()=>this.props.getData("")} tooltip="Save"><ContentSave/></IconButton>
      </div>
    )
  }
  renderUserReadOnly(login= ''){
    return (
      <div>
        <span style={{ fontSize: 20 }}>{login}</span>
        <IconButton tooltip="Edit User Name" onClick={()=> this.props.getData(true)}><EditorModeEdit /></IconButton>
      </div>
    )
  }
  render() {
    const { userdata,isLoading,error,isEdit} = this.props;
    console.log(userdata);
      const { id, avatar_url, name, login } = userdata;
      const styles_loading =
      {
        height:30,
        textAlign:'center'
      }
    return (
      <MuiThemeProvider>
        <div className="userprofile">
        { isLoading ? <div style={styles_loading}><span >User Loading...</span></div>
          : <div className="userdata"> 
            {error ? <div className="my-notify-error"><i class="fa fa-times-circle"></i><label style= {{padding:10}}>Invalid Username</label></div>:""}
            {id>0?
            <div>
            <Avatar size={150} src={avatar_url} ></Avatar>
            <div style={{ fontSize: 26 }}>
            <span>{name}</span>
            </div>
            {isEdit?this.renderUserEditField(login):this.renderUserReadOnly(login) }
            </div>:
           <div>
           <span> Please enter github username</span>
           {this.renderUserEditField()}
         </div> 
            }
        </div>
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
  isEdit: state.user.isEdit
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getData }
    ,dispatch)
  );

export default connect(mapStateToProps,mapDispatchToProps)(Userprofile);
