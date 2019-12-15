import {
  Alert,
  Form,
  Icon,
  Input,
} from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import {
  func,
  shape,
  string,
} from 'prop-types';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { RecaptchaSubmitButton } from '/components/RecaptchaSubmitButton';
import { GATEWAY_RECAPTCHA_SITE_KEY } from '/config';
import { useTranslation } from '/i18n';
import { register } from '/utils/auth';

import style from './RegisterForm.scss';

const RegisterForm = ({ redirect, form }) => {
  const { t } = useTranslation('component.auth.registerform');

  const { getFieldDecorator, setFieldsValue, validateFields } = form;
  const [alertMsg, setAlertMsg] = useState(null);

  const autoFocusRef = useRef(null);
  useEffect(() => autoFocusRef.current.focus(), []);

  const verifyInputs = (callback) => {
    validateFields((err, values) => {
      if (!err) {
        callback(values);
      }
    });
  };

  const submitHandle = (recaptchaToken) => {
    verifyInputs(async (values) => {
      try {
        const { email, username, password } = values;
        await register({
          email,
          username,
          password,
          recaptchaToken,
        });
        Router.replace(`/account/login${redirect ? `?r=${redirect}` : ''}`);
      } catch (e) {
        setAlertMsg(t(e.message));
      }
    });
  };

  return (
    <Form className={style.registerForm} onSubmit={submitHandle}>
      {alertMsg ? (<Alert className={style.alertbox} message={alertMsg} type="error" showIcon closable onClose={() => setAlertMsg(null)} />) : null}
      <Form.Item>
        {getFieldDecorator('email', {
          validate: [{
            trigger: 'onBlur',
            rules: [
              { required: true, message: t('emailFeedback') },
              { type: 'email', message: t('wrongEmailFormat') },
            ],
          }, {
            trigger: 'onChange',
            rules: [{ required: true, message: t('emailFeedback') }],
          }],
        })(
          <Input
            ref={autoFocusRef}
            prefix={<Icon type="mail" />}
            placeholder={t('email')}
            onChange={(e) => {
              setFieldsValue({ username: e.target.value });
              setAlertMsg(null);
            }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('username')(
          <Input
            disabled
            prefix={<Icon type="user" />}
            placeholder={t('username')}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: t('passwordFeedback') },
            { pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/, message: t('passwordPolicyFeedback') },
          ],
        })(
          <Input.Password
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('password')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('repassword', {
          validate: [{
            trigger: 'onChange',
            rules: [
              { required: true, message: t('repasswordFeedback') },
              {
                validator: (rule, value, callback) => {
                  if (value && value !== form.getFieldValue('password')) {
                    callback(t('repasswordFeedback'));
                  } else {
                    callback();
                  }
                },
              },
            ],
          }],
        })(
          <Input.Password
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('repassword')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <RecaptchaSubmitButton
          sitekey={GATEWAY_RECAPTCHA_SITE_KEY}
          beforeChallenge={verifyInputs}
          onChallengePassed={submitHandle}
          text={t('register')}
          type="primary"
          className={style.button}
        />
        {`${t('alreadyUser')} `}
        <Link href={`/account/login${redirect ? `?r=${redirect}` : ''}`}><a>{t('login')}</a></Link>
      </Form.Item>
    </Form>
  );
};

RegisterForm.propTypes = {
  redirect: string,
  form: shape({
    getFieldDecorator: func,
    validateFields: func,
    setFieldsValue: func,
  }).isRequired,
};

RegisterForm.defaultProps = {
  redirect: '',
};

export default Form.create({ name: 'register' })(RegisterForm);
