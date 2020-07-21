import React from 'react';
import MenuView from '../components/MenuView';
import ProfileView from '../components/User/ProfileView';

const protectedRoutes = [
	{
		name: 'menu',
		exact: true,
		path: '/menu',
		main: props => <MenuView {...props} />,
		public: false,
	}, {
		name: 'profile',
		exact: true,
		path: '/profile',
		main: props => <ProfileView {...props} />,
		public: false,
	}
];

export default protectedRoutes;
