import React, { useState, useContext } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useTranslation } from 'react-i18next';
import { AccessibilityContext } from '../AccessibilityContext';
import './OTPActivationModal.css';
import useWindowDimensions from '../components/userWindowDimensions';

const Otp = ({ onSuccess }) => { 
	const { t } = useTranslation();
	const { fontSize } = useContext(AccessibilityContext);

	const qr_code_url = localStorage.getItem('qr_code_url');
	const BASE_URL = process.env.REACT_APP_BACKEND_URL; 
	const qrCodeImageUrl = `${BASE_URL}${qr_code_url}`; 
	const [error, setError] = useState('');
	const { width, height } = useWindowDimensions();

	const [otpCode, setOtpCode] = useState('');

	const scalestyle = {
        fontSize: `${fontSize}px`,
        lineHeight: '1.5'
    };

	const handleCodeSubmition = async (event) => {
		event.preventDefault();
		const userId = localStorage.getItem('user_id');
		const token = localStorage.getItem('access_token');

		try {
			const response = await axiosInstance.post(
				`${BASE_URL}/user_management/otp-active-to-true/`,
				{
					user_id: userId,
					otp_code: otpCode
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`
					}
				}
			);
			localStorage.removeItem('qr_code_url');
			
			if (onSuccess) onSuccess();
		} catch (error) {
			if (error.response) {
				const { data, status } = error.response;
				console.log("Response Data:", data);
				
				if (status === 400 && data.non_field_errors[0] === "Invalid OTP code.") {
					setError(t("Invalid OTP code."));
				} else {
					setError(t("An error occurred. Please try again."));
				}
			} else {
				setError(t("Failed to connect to server. Please try again later."));
			}
		}
	};

	return (
		<div className="otp-modal-overlay" style={{minHeight: `${height - 90}px`}}>
			<div className="otp-modal" style={scalestyle}>
				<div className="modal" style={scalestyle}>
					<h2 className="text-xl font-bold mb-4" style={scalestyle}>{t("2FA Activation")}</h2>
					<div className="mt-4" style={scalestyle}>
						<p>{t("You need to set up Mobile Authenticator to activate your account.")}</p>
						<ol>
							<li>{t("Install one of the following applications on your mobile:")}
								<ul>
									<li>{t("FreeOTP")}</li>
									<li>{t("Google Authenticator")}</li>
									<li>{t("Microsoft Authenticator")}</li>
								</ul>
							</li>
							<li>{t("Open the application and scan the barcode:")}
							</li>
							<img className="otp-image" style={scalestyle} src={qrCodeImageUrl} alt="QR Code"/>
							<li>{t("Enter the one-time code provided by the application and click Submit to finish the setup.")}
							</li>
						</ol>
						<form onSubmit={handleCodeSubmition}>
							<div className="form-group">
								<label htmlFor="otpCode">{t("Enter OTP Code:")}</label>
								<input
									type="text"
									id="otpCode"
									className="ofp-input-password"
									style={scalestyle}
									value={otpCode}
									onChange={(e) => setOtpCode(e.target.value)}
									required
									aria-describedby="otpCodeHelp"
                                    aria-label={t("Enter OTP code to activate 2FA")}
								/>
							</div>
							{error && <p className="tfa-message">{error}</p>}
							<button type="submit" className="otp-input" style={scalestyle}>{t("Submit")}</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Otp;
