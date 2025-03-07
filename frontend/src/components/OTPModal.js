import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './OTPModal.css';

const OTPModal = ({ onSubmit, onClose, error }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
	setOtp('');
  };

  return (
    <div className="otp-modal-overlay">
		<div className="otp-modal-version-two">
        <h2 className="pageHeadingH1Style1">{t("Enter OTP Code")}</h2>
        <form onSubmit={handleSubmit}>
			<p className="messageInfoHolder">
				{t("Please enter the one-time password sent to your device.")}
			</p>
			<p className="field-name">
				<input
					type="text"
					autoComplete="off"
					className="inputFieldStyle1"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					placeholder={t("Enter OTP code")}
					required
					aria-describedby="otpError"
					aria-label={t("Enter the OTP code sent to your device")}
				/>
		  	</p>
		  	{error && <p className="tfa-message">{error}</p>}
          	<button	type="submit" 
		  			className="buttonStyle1" 
					aria-label={t("Verify OTP")}
			>
            	{t("Verify OTP")}
          </button>
        </form>
		</div>
    </div>
  );
};

export default OTPModal;
