import React from 'react';
import '../Styles/Gists.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui';
import { getUserGists } from './GistActions';
import { bindActionCreators } from 'redux';

class Gists extends React.Component {
  componentDidMount() {
    this.props.getUserGists();
    }
  render() {
    const div_styles = {
      height: 80,
      padding: 10 
    }
    const list_styles = {
      padding: 20,
      fontSize: 20 
    }
    const styles_loading =
    {
      height:30,
      textAlign:'center'
    };
    const { gistsdata,error,isLoading } = this.props;
    const fileNames = gistsdata.map(obj => {
    const { files,id } = obj;
      return { fileName: Object.keys(files)[0],fileId : id };
    }); 
    return (
      <MuiThemeProvider>
        <div className="usergists">
        {isLoading ? <div style={styles_loading}><span >User Gists Loading...</span></div>
        :<div>{ error ? <div style={styles_loading}><span >No User Gists found</span></div>
         : <List className="gists-ul">
        {
          fileNames.map(obj =>
            <div style={div_styles} className='gists-li' key={obj.fileId}>
            <ListItem style={list_styles} containerElement={<Link id="filelink" to={{ pathname: `gists/${obj.fileId}`, state: { userName: localStorage.getItem("USER_NAME")} }} />}>{obj.fileName}</ListItem>
            <Divider></Divider>
            </div>
          )
        }
        </List>
        }</div>}
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  gistsdata: state.gist.gistsdata,
  error: state.gist.error,
  isLoading: state.gist.isLoading
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserGists
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Gists);