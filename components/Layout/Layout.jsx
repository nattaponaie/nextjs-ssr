import Head from 'next/head';
import {
  bool,
  element,
} from 'prop-types';

import UserInfo from '/components/Auth/UserInfo';
import LanguageSwitcher from '/components/LanguageSwitcher';
import MainMenu from '/components/MainMenu/MainMenu';
import {
  ASSET_PREFIX,
  DEV_MODE,
} from '/config';
import { useTranslation } from '/i18n';

import style from './Layout.scss';

const Layout = ({
  children,
  allowAnonymous,
}) => {
  const { t, i18n } = useTranslation('common');

  return (
    <div className={style[`lang${(i18n.language || i18n.options.defaultLanguage).toUpperCase()}`]}>
      <Head>
        <title>{t('title')}</title>

        <link rel="shortcut icon" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <link rel="icon" type="image/png" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="apple-touch-icon" href={`${ASSET_PREFIX}/static/favicon.png`} />
        <meta name="theme-color" content="#FA4616" />
        <meta name="apple-mobile-web-app-title" content={t('title')} />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <header>
        <div className={style.header}>
          <div className={style.headerLeftItem}>
            {allowAnonymous || <MainMenu />}
          </div>
          <div>
            <LanguageSwitcher className={style.headerRightItem} />
            {allowAnonymous || <UserInfo className={style.headerRightItem} />}
          </div>
        </div>
      </header>
      {children}
      <footer>
        {/* {'Footer'} */}
      </footer>
    </div>
  );
};

Layout.propTypes = {
  allowAnonymous: bool,
  children: element.isRequired,
};

Layout.defaultProps = {
  allowAnonymous: false,
};

export default Layout;
