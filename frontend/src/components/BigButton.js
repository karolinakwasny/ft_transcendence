import React from 'react';
import { useHistory } from 'react-router-dom';
import './BigButton.css';

const BigButton = () => {
	const history = useHistory();

	const handleClick = () => {
		history.push('/play');
	}

	return (
		<button className="play-button" onClick={handleClick}>
			QUICK PLAY
		</button>
	);
};

export default BigButton;
