import React, { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useHistory } from 'react-router-dom';
const LoginPage = ({ setUser }) => {
	const [credentials, setCredentials] = useState({});
	const history = useHistory();
	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await usersService.signup(credentials);
			setUser(user);
			history.push('/');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>
					Name:
					<input
						id='name'
						type='text'
						placeholder='name'
						onChange={handleChange}
					/>
				</label>
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
	);
};

export default LoginPage;
