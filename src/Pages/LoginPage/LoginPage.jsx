import React, { useState } from 'react';

const LoginPage = () => {
	const [user, setUser] = useState({});

	const handleChange = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		return null;
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label for='name'>
					Name:
					<input
						id='name'
						type='text'
						placeholder='name'
						onChange={handleChange}
					/>
				</label>
				<label for='email'>
					Email:
					<input
						id='email'
						type='text'
						placeholder='email'
						onChange={handleChange}
					/>
				</label>
				<label for='password'>
					Password:
					<input
						id='password'
						type='text'
						placeholder='password'
						onChange={handleChange}
					/>
				</label>
			</form>
		</div>
	);
};

export default LoginPage;
