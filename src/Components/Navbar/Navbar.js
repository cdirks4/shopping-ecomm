import { Link } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
	const handleLogout = () => {
		logout();
		setUser(null);
	};

	return (
		<nav>
			<Link to='/'>Auth</Link>
			{user ? (
				<>
					<Link to='/' onClick={handleLogout}>
						Logout
					</Link>
				</>
			) : (
				<>
					<Link to='/signup'>Sign Up</Link>
					<Link to='/login'>Log In</Link>
				</>
			)}
		</nav>
	);
}
