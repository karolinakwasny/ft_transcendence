import React from 'react';
import Main from '../components/Main';
import BigButton from '../components/BigButton';

const Home = () => {
	return (
		<div className="page-content">
			<h1>Home Page</h1>
			<p>Welcome to the Pong Game!</p>
			<Main>
				<BigButton />
			</Main>
		</div>
	);
};

export default Home;
