import DashboardLayout from "layout/DashboardLayout";
import AnotherPage from "pages/AnotherPage";
import CompanyDetailPage from "pages/CompanyDetailPage";
import EmployeeDetailPage from "pages/EmployeeDetailPage";
import HomePage from "pages/HomePage";
import StoreListPage from "pages/StoreListPage";
import StoreDetailPage from "pages/StoreListPage/StoreDetailPage";
import UserListPage from "pages/UserListPage";
import UserDetailPage from "pages/UserListPage/UserDetailPage";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

export function PrivateRoute({ children, ...rest }) {
  const LOGINSTATE = useSelector((state) => state.authorized);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        LOGINSTATE ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
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
        <PrivateRoute exact path="/store">
          <StoreListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/store/:storeID">
          <StoreDetailPage />
        </PrivateRoute>
        <PrivateRoute exact path="/user">
          <UserListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/user/:userID">
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
