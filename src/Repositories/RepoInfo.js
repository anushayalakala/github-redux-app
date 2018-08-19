import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import  '../Styles/RepoInfo.css';
import { bindActionCreators } from 'redux';
import { getRepositoryCommits } from './RepoActions';
import { connect } from 'react-redux';

export  class RepoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.styles = {
            div_style : {
                paddingLeft: 50,
                paddingRight: 50,
            }, 
            h3_style: {
                paddingLeft: 50,
                paddingRight: 50,
                color: 'gray'
            }, 
            msg_style : {
                padding: 5
            },
            name_style : {
                padding: 5,
                color: 'gray',
                fontSize: 12
            },
            listitem_style: {
                display: 'flex',
                height: 'auto',
                justifyContent: 'space-between',
                backgroundColor: 'white',
            },
            data_style : 
            {
                padding: 10
            },
            hashcode_style :
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                color:'blue'
            },
        }
    }
    componentDidMount() {
      const reponame= this.props.match.params.reponame;
      this.props.getRepositoryCommits(reponame);
    }
    goBack() {
        this.props.history.goBack();
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className="repoinfo">
                    <IconButton onClick={this.goBack}><NavigationArrowBack/></IconButton>
                    <h3 style={this.styles.h3_style}>commits</h3>
                    <div style={this.styles.div_style}>
                        <List>
                            {
                                this.props.commits.map(obj => {
                                    const { commit } = obj;
                                    const {committer} = commit;
                                    const commitdate = new Date(committer.date).toDateString();
                                    const hcode = (obj.sha).slice(0, 6);
                                    return <div><Divider/>
                                    <div className= "listitem" style={this.styles.listitem_style}>
                                    <div  style= {this.styles.data_style}>
                                        <div style={this.styles.msg_style}>{commit.message}</div>
                                        <div style={this.styles.name_style}>{committer.name} commited on {commitdate}</div>
                                    </div>
                                        <div style={this.styles.hashcode_style}>{hcode}</div>
                                    </div></div>
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
  commits: state.repo.commits
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({getRepositoryCommits},dispatch)
);
export default connect(mapStateToProps,mapDispatchToProps)(RepoInfo)