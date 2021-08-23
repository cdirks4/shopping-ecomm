import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';
const LoginPage = ({ setUser }) => {
	const [credentials, setCredentials] = useState({ email: '', password: '' });

	const history = useHistory();
	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await usersService.login(credentials);
			setUser(user);
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};
	const request = require('request');

	const options = {
		method: 'GET',
		url: 'https://taobao-api.p.rapidapi.com/api',
		qs: { api: 'item_search', page_size: '40', sort: 'default', q: 'shoes' },
		headers: {
			'x-rapidapi-host': 'taobao-api.p.rapidapi.com',
			'x-rapidapi-key': 'b2c09a7168msh24741691bdefa5cp1b0f38jsnccede08efa52',
			useQueryString: true,
		},
	};

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor='email'>
						Email:
						<input
							id='email'
							type='text'
							placeholder='email'
							onChange={handleChange}
						/>
					</label>
					<label htmlFor='password'>
						Password:
						<input
							id='password'
							type='text'
							placeholder='password'
							onChange={handleChange}
						/>
					</label>
					<button type='submit'>Sumbit</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
