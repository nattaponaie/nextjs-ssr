import {
  shape,
  string,
} from 'prop-types';

import PasswordResetConfirmForm from '/components/Auth/PasswordResetConfirmForm';

import AccountTemplate from './account';

const PasswordResetConfirmPage = ({ query: { t: token, r: redirect } }) => (
  <AccountTemplate>
    <PasswordResetConfirmForm token={token} redirect={redirect} />
  </AccountTemplate>
);

PasswordResetConfirmPage.propTypes = {
  query: shape({
    t: string,
    r: string,
  }),
};

PasswordResetConfirmPage.defaultProps = {
  query: {},
};

PasswordResetConfirmPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: ['component.auth.passwordresetconfirmform'],
  query,
});

export default PasswordResetConfirmPage;
