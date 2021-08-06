import { set } from 'mongoose';
import React, { useState } from 'react';
import { from } from 'responselike';
import { getUser } from '../../utilities/users-service';
import SignupPage from '../SignupPage/SignupPage';
import { Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';

const App = () => {
	const [user, setUser] = useState(getUser());
	return (
		<div>
			<Route path='/signup'>
				<SignupPage setUser={setUser} />
			</Route>
			<Route path='/login'>
				<LoginPage setUser={setUser} />
			</Route>
		</div>
	);
};

export default App;
