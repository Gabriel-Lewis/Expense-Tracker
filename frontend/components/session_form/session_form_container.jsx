import { connect } from 'react-redux';
import { login, loginUserSuccess, logout, signup, signUpUserSuccess} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ session }) => ({
  loggedIn: session.user !== null,
  errors: session.error
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;

  return {
    signup: (values) =>  {
      return dispatch(signup(values))
      .then((result) => {
          localStorage.setItem('jwtToken', result.payload.data.token);
         dispatch(signUpUserSuccess(result.payload.data.user));
      })
    },
    login: (values) =>  {
      return dispatch(login(values))
      .then((result) => {
          localStorage.setItem('jwtToken', result.payload.data.token);
         dispatch(loginUserSuccess(result.payload.data.user));
      })
    },
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
