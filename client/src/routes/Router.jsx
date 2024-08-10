import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import AddRecipe from '../pages/addRecipe/AddRecipe';
import RecipeDetails from '../pages/recipes/Recipes';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/addRecipe' element={<AddRecipe />}/>
				<Route path='/recipes/:id' element={<RecipeDetails/>} />
			</Route>
		</Routes>
	);
};

export default Router;
