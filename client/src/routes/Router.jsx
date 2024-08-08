import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../layout/Layout';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Home />} />
			</Route>
		</Routes>
	);
};

export default Router;
