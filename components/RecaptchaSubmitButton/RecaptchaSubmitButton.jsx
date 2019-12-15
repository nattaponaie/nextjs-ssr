import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaSubmitButton = (props) => {
  const reCaptchaRef = useRef();

  const {
    sitekey,
    beforeChallenge,
    onChallengePassed,
    text,
    ...otherProps
  } = props;

  const handleCaptcha = () => {
    const recaptcha = reCaptchaRef.current;
    recaptcha.reset();
    recaptcha.execute();
  };

  const handleClick = () => {
    if (beforeChallenge) {
      beforeChallenge(handleCaptcha);
    } else {
      handleCaptcha();
    }
  };

  return (
    <div className="recaptcha-submit-button">
      <ReCAPTCHA
        ref={reCaptchaRef}
        size="invisible"
        render="explicit"
        sitekey={sitekey}
        onChange={onChallengePassed}
      />
      <Button onClick={handleClick} {...otherProps}>
        {text}
      </Button>
    </div>
  );
};

RecaptchaSubmitButton.propTypes = {
  sitekey: PropTypes.string.isRequired,
  beforeChallenge: PropTypes.func,
  onChallengePassed: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

RecaptchaSubmitButton.defaultProps = {
  beforeChallenge: null,
};

export default RecaptchaSubmitButton;
