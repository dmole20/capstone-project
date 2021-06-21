import { Button } from '@chakra-ui/button';
import { Box, Divider, Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import useLocalStorageState from 'hooks/useLocalStoargeState';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import SidebarNavigation from './SidebarNavigation';

const DashboardLayout = props => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    let logoutApi = await axios.get('/api/users/logout');
    dispatch({
      type: 'logout',
    });
  };
  return (
    <Fragment>
      <Flex justify="center" alignItems="center" position="relative">
        <Box flexGrow="0" p={10}>
          <Text>SNEAKER HEAD</Text>
        </Box>
        <Flex
          position="absolute"
          top="0"
          right="0"
          height="100%"
          alignItems="center"
        >
          <ColorModeSwitcher justifySelf="flex-end" />
          <Button backgroundColor="brand.primary" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex>
        <Box flexBasis="300px">
          <SidebarNavigation />
        </Box>
        <Box flex="1">{props.children}</Box>
      </Flex>
    </Fragment>
  );
};

export default DashboardLayout;
