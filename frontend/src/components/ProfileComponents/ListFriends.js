import { useState } from 'react';
import { getAllPlayers } from '../../services/getAllUsers';
import { useTranslation } from 'react-i18next';

const UserList = ({ friends }) => {
	// if (!friends || friends.length === 0 ) return null;
	const wsBaseUrl = process.env.REACT_APP_BACKEND_WS;

	const [onlineStatuses, setOnlineStatuses] = useState({});
	const { t } = useTranslation();
	
	useEffect(() => {
		if (!friends || friends.length === 0) return;

		const token = localStorage.getItem('access_token');
		const userId = localStorage.getItem('user_id');

		if (!userId || !token) return;

		const wsUrl = `${wsBaseUrl}/ws/online-status/?user_id=${userId}&token=${token}`;
		const ws = new WebSocket(wsUrl);

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setOnlineStatuses(prev => ({
				...prev,
				[data.user_id]: data.is_online,
			}));
		};

		ws.onerror = (err) => {
			console.error('WebSocket error:', err);
		};

		ws.onclose = () => {
			console.log('WebSocket closed');
		};

		return () => {
			ws.close();
		};
	}, [friends]);

	// const handleCheckAllStatuses = async () => {
	// 	try {
	// 		const allPlayers = await getAllPlayers();
	// 		const statuses = friends.reduce((acc, user) => {
	// 			const friend = allPlayers.find(player => player.user_id === user.id);
	// 			acc[user.id] = friend ? friend.online : false;
	// 			return acc;
	// 		}, {});
	// 		setOnlineStatuses(statuses);
	// 	} catch (error) {
	// 		console.error('Error fetching all statuses:', error);
	// 	}
	// };

	// const handleRelease = () => {
	// 	setOnlineStatuses({});
	// };

	return (
		<>
			{friends.map(user => (
				<div key={user.id} >
					{user.username}
					{onlineStatuses[user.id] && (
						<span style={{
							width: '10px',
							height: '10px',
							backgroundColor: 'green',
							borderRadius: '50%',
							display: 'inline-block'
						}}></span>
					)}
				</div>
			))}
			{/* <button 
				className="buttonStyle1"
				onMouseDown={handleCheckAllStatuses} 
				onMouseUp={handleRelease}
				onMouseLeave={handleRelease}
				aria-label={t("Press To Check Online Statuses Of Your Friends")}

			>
				{t("Press To Check Online Statuses Of Your Friends")}
			</button> */}
		</>
	);
};

export default UserList;

