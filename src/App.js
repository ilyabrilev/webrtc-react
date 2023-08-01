import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import IndexPage, { loader as indexLoader } from './pages/Index';
import Main from './pages/Main';


const router = createBrowserRouter([
  
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <IndexPage />, loader: indexLoader },
      {
        path: ':roomId',
        element: <Main/>,
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
