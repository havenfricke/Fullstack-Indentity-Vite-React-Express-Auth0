import { App } from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { createBrowserRouter } from 'react-router-dom';
import StuffPage from './Pages/StuffPage.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
            path:"/stuff",
            element: <StuffPage />
        },
        {
            path:"/dashboard",
            element: <Dashboard />
        }
      ],
    },
  ]);