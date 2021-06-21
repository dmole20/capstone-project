import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  CSSReset,
  Spinner,
  Center,
} from '@chakra-ui/react';
import theme from 'theme';
import LoginPage from 'pages/LoginPage/index';
import useLocalStorageState from 'hooks/useLocalStoargeState';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoutes from 'routes/ProtectedRoutes';
import RegisterPage from 'pages/RegisterPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const NavigationOptions = [
  {
    id: 'draw',
    displayValue: '응모 하기',
    slug: '/draw',
  },
  {
    id: 'draw-history',
    displayValue: '응모 내역',
    slug: '/draw-history',
  },
  {
    id: 'product',
    displayValue: '기프트 관리',
    slug: '/product',
  },
];

const queryClient = new QueryClient();

function App() {
  const [authorizedToken, setAuthorizedToken] = useLocalStorageState('token');
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useDispatch();
  const LOGINSTATE = useSelector(state => state.authorized);

  useEffect(() => {
    if (authorizedToken) {
      dispatch({ type: 'setAuthorizationToken' });
    } else {
      dispatch({ type: 'logout' });
    }
    setInitialLoading(false);
    dispatch({ type: 'LoadCompanyList', payload: NavigationOptions });
  }, []);

  useEffect(() => {
    if (LOGINSTATE) {
      setAuthorizedToken(true);
    } else {
      setAuthorizedToken(false);
    }
  }, [LOGINSTATE]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        {initialLoading ? (
          <Center minH="100vh">
            <Spinner
              thickness="10px"
              speed="0.65s"
              emptyColor="brand.primary"
              color="brand.secondary"
              size="xl"
            />
          </Center>
        ) : (
          <Box textAlign="center" fontSize="xl">
            <Router>
              <Switch>
                <Route exact path="/login">
                  <Center minH="100vh" p={3}>
                    <LoginPage />
                  </Center>
                </Route>
                <Route exact path="/register">
                  <Center minH="100vh" p={3}>
                    <RegisterPage />
                  </Center>
                </Route>
                <Route path="/">
                  <Box minH="100vh" p={3}>
                    <ProtectedRoutes />
                  </Box>
                </Route>
              </Switch>
            </Router>
          </Box>
        )}
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
