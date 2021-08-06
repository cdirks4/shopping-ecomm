import { set } from 'mongoose';
import React, { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import LoginPage from '../SigninPage/SigninPage';

const App = () => {
	const [user, setUser] = useState(getUser());

	const testfunc = async () => {
		const test = await getUser;

		console.log(test);
	};
	testfunc();
	return (
		<div>
			<LoginPage setUser={setUser} />
		</div>
	);
};

export default App;
