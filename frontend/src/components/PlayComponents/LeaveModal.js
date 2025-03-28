import React from "react";
import { useTranslation } from "react-i18next";
import "./LeaveModal.css";

const LeaveModal = ({ isOpen, title, message, scaleStyle, onConfirm, onCancel }) => {
	const { t } = useTranslation();
	if (!isOpen) return null
	
    return (
		<div className="tfa-modal" style={scaleStyle}>
			<div className="modal-overlay" role="dialog" aria-modal="true">
				<form className="modal" onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
					<h3 className="title" style={scaleStyle}>{title}</h3>
					<p className="message" style={scaleStyle}>{message}</p>
					<div className="modal-buttons">
						<button 
							type="button" 
							style={scaleStyle} 
							className="btn cancel" 
							onClick={onCancel}
							aria-label={t("Cancel button")}
						>
							{t("Cancel")}
						</button>
						<button 
							type="submit" 
							style={scaleStyle} 
							className="btn confirm"
							aria-label={t("Confirm button")}
						>
							{t("Yes, Leave")}
						</button>
					</div>
				</form>
			</div>
		</div>
    );
};

export default LeaveModal;
