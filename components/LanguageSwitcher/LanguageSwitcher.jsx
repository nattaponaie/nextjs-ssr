import { Button } from 'antd';
import { string } from 'prop-types';

import { i18n } from '/i18n';

import style from './LanguageSwitcher.scss';

const languageSwitchHandle = event => i18n.changeLanguage(event.target.value);

const LanguageSwitcher = ({ className }) => (
  <div className={[className, style.langBar].join(' ')}>
    <Button className={style.langSwitchTH} onClick={languageSwitchHandle} value="th">ไทย</Button>
    &nbsp;|&nbsp;
    <Button className={style.langSwitchEN} onClick={languageSwitchHandle} value="en">Eng</Button>
  </div>
);

LanguageSwitcher.propTypes = {
  className: string,
};

LanguageSwitcher.defaultProps = {
  className: '',
};

export default LanguageSwitcher;
