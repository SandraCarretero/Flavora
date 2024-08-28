import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import AddRecipe from '../pages/addRecipe/AddRecipe';
import RecipeDetail from '../pages/recipeDetail/RecipeDetail';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/addRecipe' element={<AddRecipe />} />
				<Route path='/recipe/:id' element={<RecipeDetail />} />
			</Route>
		</Routes>
	);
};

export default Router;
