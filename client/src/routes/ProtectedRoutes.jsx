import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

const ProtectedRoutes = () => {
	const { userLogged, loading } = useContext(AuthContext);

	if (loading) return <h1>Loading...</h1>;

	if (!userLogged && !loading) return <Navigate to='/login' />;

	return <Outlet />;
};

export default ProtectedRoutes;