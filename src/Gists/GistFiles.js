import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import styles from '../Styles/GistFiles.css';
import { connect } from 'react-redux';
import { getGistFiles } from './GistActions';
import { bindActionCreators } from 'redux';

class GistFile extends React.Component {
  componentDidMount(){
    const { fileId } = this.props.match.params;
    this.props.getGistFiles(fileId);
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { filedata } = this.props;
    const { files = [] } = filedata;
    const fileList = Object.keys(files).map(name => <div>
      <div className={styles.name_style}><h3 >{name}</h3></div>
      <div className={styles.content_style}><p style={{ color: 'gray', border: '1px solid black', padding: 15 }}>{files[name].content}</p></div>
      <Divider></Divider>
    </div>);
    return (
      <MuiThemeProvider>
        <div className= {styles.content}>
          <IconButton onClick={this.goBack.bind(this)} tooltip="go back and hold see the history"><NavigationArrowBack /></IconButton>
          <div>{fileList}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  filedata : state.gist.filedata
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getGistFiles },dispatch)
);
export default connect(mapStateToProps,mapDispatchToProps)(GistFile);
