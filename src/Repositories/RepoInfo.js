import React from 'react';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../Styles/RepoInfo.css';
import { getRepositoryCommits } from './RepoActions';

class RepoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { reponame } = this.props.match.params;
    this.props.getRepositoryCommits(reponame);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { commitserror } = this.props;
    return (
      <MuiThemeProvider>
        { commitserror ? (<div className={styles.div_style}><h3>Commits Not Found</h3></div>)
          : (
            <div className={styles.repoinfo}>
              <IconButton onClick={this.goBack}><NavigationArrowBack /></IconButton>
              <h3 className={styles.h3Style}>commits</h3>
              <div className={styles.divStyle}>
                <List>
                  {
                                this.props.commits.map((obj) => {
                                  const { commit } = obj;
                                  const { committer } = commit;
                                  const commitdate = new Date(committer.date).toDateString();
                                  const hcode = (obj.sha).slice(0, 6);
                                  return (
                                    <div>
                                      <Divider />
                                      <div className={styles.listitemStyle}>
                                        <div className={styles.dataStyle}>
                                          <div className={styles.msgStyle}>{commit.message}</div>
                                          <div className={styles.listitemStyle}>
                                            {committer.name}
                                            commited on
                                            {commitdate}
                                          </div>
                                        </div>
                                        <div className={styles.hashcodeStyle}>{hcode}</div>
                                      </div>

                                    </div>
                                  );
                                })
                            }
                </List>
              </div>
            </div>
          )
        }
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  commits: state.repo.commits,
  commitserror: state.repo.commitserror,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({ getRepositoryCommits }, dispatch)
);
RepoInfo.propTypes = {
  commits: PropTypes.instanceOf(Array).isRequired,
  reponame: PropTypes.string.isRequired,
  commitserror: PropTypes.string.isRequired,
  getRepositoryCommits: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      reponame: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};
RepoInfo.defaultProps = {
  match: {
    params: {
      fileId: 0,
    },
  },
  history: {
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoInfo);
