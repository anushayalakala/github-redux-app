import React from 'react';
import { List } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import '../Styles/RepoInfo.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRepositoryCommits } from './RepoActions';

class RepoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.styles = {
      divStyle: {
        paddingLeft: 50,
        paddingRight: 50,
      },
      h3Style: {
        paddingLeft: 50,
        paddingRight: 50,
        color: 'gray',
      },
      msgStyle: {
        padding: 5,
      },
      nameStyle: {
        padding: 5,
        color: 'gray',
        fontSize: 12,
      },
      listitemStyle: {
        display: 'flex',
        height: 'auto',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      },
      dataStyle:
            {
              padding: 10,
            },
      hashcodeStyle:
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              color: 'blue',
            },
    };
  }

  componentDidMount() {
    const { reponame } = this.props.match.params;
    this.props.getRepositoryCommits(reponame);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="repoinfo">
          <IconButton onClick={this.goBack}><NavigationArrowBack /></IconButton>
          <h3 style={this.styles.h3Style}>commits</h3>
          <div style={this.styles.divStyle}>
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
                                      <div className="listitem" style={this.styles.listitemStyle}>
                                        <div style={this.styles.dataStyle}>
                                          <div style={this.styles.msgStyle}>{commit.message}</div>
                                          <div style={this.styles.listitemStyle}>
                                            {committer.name}
                                            commited on
                                            {commitdate}
                                          </div>
                                        </div>
                                        <div style={this.styles.hashcodeStyle}>{hcode}</div>
                                      </div>

                                    </div>
                                  );
                                })
                            }
            </List>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  commits: state.repo.commits,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({ getRepositoryCommits }, dispatch)
);
RepoInfo.propTypes = {
  commits: PropTypes.instanceOf(Array).isRequired,
  reponame: PropTypes.string.isRequired,
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
