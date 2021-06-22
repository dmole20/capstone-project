import DashboardLayout from 'layout/DashboardLayout';
import AnotherPage from 'pages/AnotherPage';
import CompanyDetailPage from 'pages/CompanyDetailPage';
import EmployeeDetailPage from 'pages/EmployeeDetailPage';
import HistoryPage from 'pages/HistoryPage';
import HistoryDetailPage from 'pages/HistoryPage/HistoryDetailPage';
import HomePage from 'pages/HomePage';
import StoreListPage from 'pages/StoreListPage';
import StoreDetailPage from 'pages/StoreListPage/StoreDetailPage';
import UserListPage from 'pages/UserListPage';
import UserDetailPage from 'pages/UserListPage/UserDetailPage';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

export function PrivateRoute({ children, ...rest }) {
  const LOGINSTATE = useSelector(state => state.authorized);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        LOGINSTATE ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const ProtectedRoutes = () => {
  return (
    <Switch>
      <DashboardLayout>
        <PrivateRoute exact path="/another">
          <AnotherPage />
        </PrivateRoute>
        <PrivateRoute exact path="/draw">
          <StoreListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/history">
          <HistoryPage />
        </PrivateRoute>
        <PrivateRoute exact path="/history/:historyID">
          <HistoryDetailPage />
        </PrivateRoute>
        <PrivateRoute exact path="/draw/:storeID">
          <StoreDetailPage />
        </PrivateRoute>
        <PrivateRoute exact path="/product">
          <UserListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/product/:userID">
          <UserDetailPage />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <HomePage />
        </PrivateRoute>
      </DashboardLayout>
    </Switch>
  );
};

export default ProtectedRoutes;
