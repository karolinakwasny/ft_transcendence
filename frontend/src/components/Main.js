import React from 'react';
import './Main.css';

const Main = ({children}) => {
	return (
		<main>
			<div className="content">
				{children}
			</div>
		</main>
	);
};

export default Main;
