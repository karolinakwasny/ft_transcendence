import React from 'react';
import Main from '../components/Main';
import PlayButton from '../components/PlayButton';

const Home = () => {
	return (
		<div className="page-content">
			<h1>Home Page</h1>
			<p>Welcome to the Pong Game!</p>
			<Main>
				<PlayButton />
			</Main>
		</div>
	);
};

export default Home;
