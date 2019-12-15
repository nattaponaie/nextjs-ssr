import {
  shape,
  string,
} from 'prop-types';

import PasswordResetForm from '/components/Auth/PasswordResetForm';

import AccountTemplate from './account';

const PasswordResetPage = ({ query: { r: redirect } }) => (
  <AccountTemplate>
    <PasswordResetForm redirect={redirect} />
  </AccountTemplate>
);

PasswordResetPage.propTypes = {
  query: shape({ r: string }),
};

PasswordResetPage.defaultProps = {
  query: {},
};

PasswordResetPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: ['component.auth.passwordresetform'],
  query,
});

export default PasswordResetPage;
