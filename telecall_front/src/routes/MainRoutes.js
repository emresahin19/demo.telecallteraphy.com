import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Experts routing
const Experts = Loadable(lazy(() => import('pages/experts/experts')));
const ExpertsAdd = Loadable(lazy(() => import('pages/experts/add')));
const ExpertsEdit = Loadable(lazy(() => import('pages/experts/edit')));

// Patients routing
const Patients = Loadable(lazy(() => import('pages/patients/patients')));
const PatientsAdd = Loadable(lazy(() => import('pages/patients/add')));
const PatientsEdit = Loadable(lazy(() => import('pages/patients/edit')));

// Patients routing
const Interviews = Loadable(lazy(() => import('pages/interviews/interviews')));
const Screen = Loadable(lazy(() => import('pages/interviews/screen')));
const Chat = Loadable(lazy(() => import('pages/interviews/chat')));
const InterviewsArchive = Loadable(lazy(() => import('pages/interviews/interviews_archive')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/experts',
            element: <Experts />
        },
        {
            path: '/experts/add',
            element: <ExpertsAdd />
        },
        {
            path: '/experts/edit/:id',
            element: <ExpertsEdit />
        },
        {
            path: '/patients',
            element: <Patients />
        },
        {
            path: '/patients/add',
            element: <PatientsAdd />
        },
        {
            path: '/patients/edit/:id',
            element: <PatientsEdit />
        },
        {
            path: '/interviews',
            element: <Interviews />
        },
        {
            path: '/interviews/:id',
            element: <InterviewsArchive />
        },
        {
            path: '/screen/:id',
            element: <Screen />
        },
        {
            path: '/chat/:id',
            element: <Chat />
        },
    ]
};

export default MainRoutes;
