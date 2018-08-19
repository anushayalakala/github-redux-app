const initialState = {
  tabIndex : "0"
}
const navLinkReducer = ( state = initialState,action) => {
    switch(action.type){
      case "ACTIVE_TAB": {
        return Object.assign({},state,{tabIndex:action.tabIndex});
        break;
      }
      default:
      return state;
    }
}
export default navLinkReducer;