import React, {useContext} from 'react';
import { useTranslation } from "react-i18next";
import { GameContext } from "../../context/GameContext";
import { AuthContext } from '../../context/AuthContext';

// function turnOnFooterNavbar() {
//     let footer = document.getElementById("footerID");
//     if (footer.style.display === "none") {
//         footer.style.display = "flex";
//     }

//     let navbar = document.getElementById("navbarID");
//     if (navbar.style.display === "none") {
//         navbar.style.display = "flex";
//     }

// 	let ponHeading  = document.getElementById("pongHeading");
// 	if (ponHeading.style.display === "none") {
// 		ponHeading.style.display = "flex";
// 	}
// }

const BackButton = ({ scaleStyle }) => {
	const {t} = useTranslation();
	const { setIsSubmitting } = useContext(GameContext);
	const { setIsOpponentAuthenticated } = useContext(GameContext); 
	const { setIsReadyToPlay } = useContext(GameContext); 
	const { setNavbarOff } = useContext(AuthContext);

    return (
        <button
            id="tournamentButtonStyle"
            onClick={() => {
                setIsReadyToPlay(null);
                setIsOpponentAuthenticated(false);
				setIsSubmitting(false);
                setNavbarOff(false);
            }}
			aria-label={t("Go back to mode selection")}
            style={{fontSize: "18px"}}
        >
            {t("Back to Mode Selection")}
        </button>
    );
};

export default BackButton;