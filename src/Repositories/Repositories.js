import React from 'react';
import '../Styles/Repositories.css';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReponames } from '../Repositories/RepoActions';

class Repositories extends React.Component {
  componentDidMount() {
    this.props.getReponames();
  }
  render() {
    const { repositories ,isLoading,error} = this.props;
    const style1 = {
      color: 'black',
      fontSize: 20,
      padding: 10,
    };
    const style2 = {
      fontSize: 12,
      padding: 10,
      color: 'gray'
    };
    const styles_loading =
    {
      height:30,
      textAlign:'center'
    };
    return (
      <MuiThemeProvider>
        <div className="userrepos">
        { isLoading ? <div style={styles_loading}><span >User Loading...</span></div>
          :<List className="repo-ul">
          { error? <div style={styles_loading}><span >User Loading...</span></div>
           : <div >
              {
                repositories.map((obj) => {
                  const date = new Date(obj.updated_at).toDateString();
                  return <div>
                    <ListItem style={{ height: 120 }} key={obj.id} >
                      <div style={style1} className="repo-li"><Link to={{ pathname: `repos/${obj.name}` }}>{obj.name}</Link></div>
                      <div style={style2}>{obj.description}</div>
                      <div style={style2}>Updated on {date}</div>
                      <Divider></Divider>
                    </ListItem>
                  </div>
                })
              }
            </div>}
          </List>}
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  repositories: state.repo.repositories,
  isLoading: state.repo.isLoading,
  error: state.repo.error
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getReponames
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Repositories);

