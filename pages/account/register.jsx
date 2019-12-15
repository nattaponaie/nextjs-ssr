import {
  shape,
  string,
} from 'prop-types';

import RegisterForm from '/components/Auth/RegisterForm';

import AccountTemplate from './account';

const RegisterPage = ({ query: { r: redirect } }) => (
  <AccountTemplate>
    <RegisterForm redirect={redirect} />
  </AccountTemplate>
);

RegisterPage.propTypes = {
  query: shape({ r: string }),
};

RegisterPage.defaultProps = {
  query: {},
};

RegisterPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: ['component.auth.registerform'],
  query,
});

export default RegisterPage;
