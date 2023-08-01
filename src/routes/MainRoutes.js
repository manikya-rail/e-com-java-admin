import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const ClientList = Loadable(lazy(() => import('pages/components-overview/ClientList')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const ClientDetails = Loadable(lazy(() => import('pages/components-overview/ClientDetails')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '',
  element: <MainLayout />,
  children: [

    {
      path: 'color',
      element: <Color />
    },
    {
      path: '/dashboard',
      children: [
        {
          path: '/dashboard',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'clientlist/clientdetails',
      element: <ClientDetails />
    },

    {
      path: '/clientlist',
      element: <ClientList />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
