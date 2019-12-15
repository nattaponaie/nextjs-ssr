import { useTranslation } from '/i18n';

import style from './home.scss';

const HomePage = () => {
  const { t } = useTranslation('page.home');
  return (
    <h1 className={style.homePanel}>
      {t('title')}
    </h1>
  );
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default HomePage;
