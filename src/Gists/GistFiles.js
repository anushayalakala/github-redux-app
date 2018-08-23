import React from 'react';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../Styles/GistFiles.css';
import * as gistActions from './GistActions';

class GistFile extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { fileId } = this.props.match.params;
    const { getGistFiles } = this.props;
    getGistFiles(fileId);
  }

  goBack() {
    const { history } = this.props;
    const { goBack } = history;
    goBack();
  }

  render() {
    const { filedata } = this.props;
    const { files = [] } = filedata;
    const fileList = Object.keys(files).map(name => (
      <div key={files.id}>
        <div className={styles.name_style}><h3>{name}</h3></div>
        <div className={styles.content_style}><p style={{ color: 'gray', border: '1px solid black', padding: 15 }}>{files[name].content}</p></div>
        <Divider />
      </div>
    ));
    return (
      <MuiThemeProvider>
        <div className={styles.content}>
          <IconButton onClick={this.goBack} tooltip="go back and hold see the history"><NavigationArrowBack /></IconButton>
          <div>{fileList}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  filedata: state.gist.filedata,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({ getGistFiles: gistActions.getGistFiles }, dispatch)
);
GistFile.propTypes = {
  filedata: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  getGistFiles: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      fileId: PropTypes.string.isRequired,
    }),
  }),
};
GistFile.defaultProps = {
  match: {
    params: {
      fileId: 0,
    },
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(GistFile);
