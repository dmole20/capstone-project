export default function ReduxReducer(state = {}, action) {
  switch (action.type) {
    case 'setAuthorizationToken':
      return { ...state, authorized: true };
    case 'LoadCompanyList':
      return { ...state, CompanyList: action.payload };
    case 'logout':
      return { ...state, authorized: false };
    default:
      return state;
  }
}
