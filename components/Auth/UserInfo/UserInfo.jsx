import {
  Avatar,
  Button,
  Icon,
  Popover,
} from 'antd';
import Router from 'next/router';
import { string } from 'prop-types';
import { useContext } from 'react';

import { UserContext } from '/contexts/UserContext';
import { useTranslation } from '/i18n';
import { logout } from '/utils/auth';

import style from './UserInfo.scss';
import { useAuthentication } from './UserInfoHooks';

const UserInfo = ({ className }) => {
  useAuthentication();
  const { t, i18n } = useTranslation('component.auth.userinfo');

  const { state, dispatch } = useContext(UserContext);

  const logoutHandle = () => {
    logout();
    dispatch({ type: 'logout' });
    Router.replace('/account/login');
  };

  const content = (
    <div className={style[`lang${(i18n.language || i18n.options.defaultLanguage).toUpperCase()}`]}>
      <div>{`${t('uid')} : ${state.uid}`}</div>
      <div>{`${t('email')} : ${state.email}`}</div>
      <Button className={style.logout} type="danger" onClick={logoutHandle}>
        <Icon type="logout" />
        {t('logout')}
      </Button>
    </div>
  );

  return (
    <div className={className}>
      <Popover placement="bottom" content={content} trigger="hover">
        <div className={style.userinfo}>
          <Avatar shape="square" size="small" icon="user" className={style.usericon} />
          {state.username}
        </div>
      </Popover>
    </div>
  );
};

UserInfo.propTypes = {
  className: string,
};

UserInfo.defaultProps = {
  className: '',
};

export default UserInfo;
