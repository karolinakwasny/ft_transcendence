import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AuthTournamentForm from './AuthTournamentForm';
import { GameContext } from "../../context/GameContext";
import { AuthContext } from "../../context/AuthContext";
import "./PlayTournamentSetup.css";
import "../../pages/Play.css"
import { createTournament } from '../../services/postCreateTournament'; 

const PlayTournamentSetup = ({ setForceUpdate, scaleStyle }) => {
    const { t } = useTranslation();
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const { isTournamentReady, 
			setStartTheTournament, 
			tournamentPlayers, 
			setTournamentPlayers,
			tournamentMatchID,
			setTournamentMatchID } = useContext(GameContext);
	const { setNavbarOff } = useContext(AuthContext);
	const [shouldReload, setShouldReload] = useState(false);
	const userLoggedInId = localStorage.getItem('user_id');
	const userLoggedInDisplayName = localStorage.getItem('display_name');

	useEffect(() => {
        if (shouldReload && tournamentMatchID) {
            setShouldReload(false);
			navigate("/play")
			setForceUpdate(prev => prev + 1);
        }
    }, [shouldReload, tournamentMatchID]);

	const handleClick = async () => {
		setError('');

		if (!userLoggedInId) {
			console.error("User ID is missing.");
			return;
    	}

    	const updatedPlayers = [...tournamentPlayers, { id: userLoggedInId, display_name: userLoggedInDisplayName }];
        setTournamentPlayers(updatedPlayers);
		
		const allPlayers = updatedPlayers.map(player => Number(player.id));

		const createTournamentData = {
			player_ids: allPlayers, 
			host: userLoggedInId,
		};

		try {
			const { success, data, error } = await createTournament(createTournamentData);
	
			localStorage.removeItem('tournamentPlayers');
			setTournamentPlayers([]);

			if (!success) {
				console.error("Error creating tournament:", error);
				// if (error === "Duplicate player IDs are not allowed.") 
				alert(t("Duplicate player IDs are not allowed."));
				// else 
				// 	setError(error);
			
				setForceUpdate(prev => prev + 1);
				return;
			}
			if (Array.isArray(data) && data.length > 0) {
				const tournamentId = data[0].tournament;
				setTournamentMatchID(tournamentId);
				setStartTheTournament(true);
				setNavbarOff(true);
				setForceUpdate(prev => prev + 1);
			} else {
				console.error("Unexpected response format:", data);
			}
		} catch (error) {
			console.error("Error saving players to the tournament:", error);
			setError(error.message);
			setForceUpdate(prev => prev + 1);
		}
	};

    return (
        <>
            <div className="playCardHolderStyle" style={scaleStyle}>
            	<h3 style={scaleStyle}>{t("PlayTitleTournament")}</h3>
            	<p style={scaleStyle} className="playCardDescription">{t("PlayDescriptionTournament")}</p>
            	<AuthTournamentForm style={scaleStyle}/>
				{error && <p className="text-red-500" style={scaleStyle}>{error}</p>}
            	<button className="buttonStyle1" 
					style={scaleStyle} 
					onClick={handleClick} 
					disabled={!isTournamentReady}
					aria-label={t("Start tournament button")}
				>
                	{t("PlayTournament")}
            	</button>
            </div>
        </>
    );
};

export default PlayTournamentSetup;