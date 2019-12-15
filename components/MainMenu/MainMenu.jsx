import {
  Button,
  Drawer,
  Menu,
} from 'antd';
import Link from 'next/link';
import { useState } from 'react';

import { ASSET_PREFIX } from '/config';
import { useTranslation } from '/i18n';

import style from './MainMenu.scss';

const MainMenu = () => {
  const { t, i18n } = useTranslation('component.mainmenu');
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <>
      <div className={style.miniMenu}>
        <Button onClick={open} icon="menu" type="link" size="large" />
        <Drawer closable={false} placement="left" onClose={close} visible={visible}>
          <Menu selectable={false} className={style[`lang${(i18n.language || i18n.options.defaultLanguage).toUpperCase()}`]}>
            <Menu.Item key="0" onClick={close}><Link href="/"><a>{t('home')}</a></Link></Menu.Item>
            <Menu.Item key="1" onClick={close}>{t('menu1')}</Menu.Item>
            <Menu.Item key="2" onClick={close}>{t('menu2')}</Menu.Item>
            <Menu.Item key="3" onClick={close}>{t('menu3')}</Menu.Item>
          </Menu>
        </Drawer>
      </div>
      <div className={style.fullMenu}>
        <span style={{ verticalAlign: 'sub' }}><Link href="/"><a><img src={`${ASSET_PREFIX}/static/boilerplate-logo.svg`} alt="logo" height="32" /></a></Link></span>
        <span><Link href="/"><a>{t('menu1')}</a></Link></span>
        <span><Link href="/"><a>{t('menu2')}</a></Link></span>
        <span><Link href="/"><a>{t('menu3')}</a></Link></span>
      </div>
    </>
  );
};

export default MainMenu;
