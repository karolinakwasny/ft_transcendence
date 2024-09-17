import React from 'react';
import { useHistory } from 'react-router-dom';
import './PlayButton.css';

const PlayButton = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/play');
	}

	return (
		<button className="play-button" onClick={handleClick}>
			PLAY NOW
		</button>
	);
};

export default PlayButton;
