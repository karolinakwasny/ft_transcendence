import React, { createContext, useState } from "react";
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [profile, setProfile] = useState(null);
	const [isSaving2FA, setIsSaving2FA] = useState(false);
	const [loading, setLoading] = useState(true);
	const [personLoggedIn, setPersonLoggedIn] = useState(null);
	const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
	const [isOtpActive, setOtpActive] = useState(false);
	const [newDisplayName, setNewDisplayName] = useState('');
	

	return (
		<ProfileContext.Provider value={{	profile, setProfile,
											isSaving2FA, setIsSaving2FA,
											loading, setLoading,
											personLoggedIn, setPersonLoggedIn,
											isPasswordModalOpen, setPasswordModalOpen,
											isOtpActive, setOtpActive,
											newDisplayName, setNewDisplayName }}
		
		>
			{children}
		</ProfileContext.Provider>
	);
};

