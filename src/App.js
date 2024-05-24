import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './RootLayout';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import { Home } from './components/Home';
import DetailPage from './components/DetailPage';
import CheckOut from './components/CheckOut';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import HistoryNavbar from './components/HistoryNavbar';
import DetailOrder from './components/DetailOrder';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'shop',
				element: <ShopPage />,
			},
			{
				path: 'cart',
				element: <CartPage />,
			},
			{
				path: 'history',
				element: <HistoryNavbar />,
			},
			{
				path: 'register',
				element: <SignupPage />,
			},
			{
				path: 'detail/:id',
				element: <DetailPage />,
			},
			{
				path: 'detailOrder/:orderId',
				element: <DetailOrder />,
			},
			{
				path: 'checkout',
				element: <CheckOut />,
			},
			{
				path: 'sign-in',
				element: <SigninPage />,
			},
		],
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
