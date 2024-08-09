import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Router from './routes/Router';
import AuthProvider from './providers/Auth.provider';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<GlobalStyles />
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
