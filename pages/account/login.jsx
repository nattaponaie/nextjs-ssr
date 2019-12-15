import {
  shape,
  string,
} from 'prop-types';

import LoginForm from '/components/Auth/LoginForm';

import AccountTemplate from './account';

const LoginPage = ({ query: { r: redirect } }) => (
  <AccountTemplate>
    <LoginForm redirect={redirect} />
  </AccountTemplate>
);

LoginPage.propTypes = {
  query: shape({ r: string }),
};

LoginPage.defaultProps = {
  query: {},
};

LoginPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: ['component.auth.loginform'],
  query,
});

export default LoginPage;
