import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Flex, HStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useToast } from '@chakra-ui/toast';
import DataTable from 'components/DataTable';
import EmployeeDetailPage from 'pages/EmployeeDetailPage';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Switch, useHistory } from 'react-router';
import { useRouteMatch } from 'react-router';
import { PrivateRoute } from 'routes/ProtectedRoutes';

const UserListPage = props => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode } = useColorMode();

  const handleTabsChange = index => {
    setTabIndex(index);
  };
  //   useEffect(() => {
  //     if (tabIndex === 0) {
  //       history.push(url);
  //     } else if (tabIndex === 1) {
  //       history.push(`${url}/contents`);
  //     }
  //   }, [tabIndex]);

  const data = useMemo(
    () => [
      {
        id: 1,
        col1: '1',
        col2: '확률 2배',
        col3: '100',
        col4: '20',
      },
      {
        id: 2,
        col1: '2',
        col2: '확률 1.5배',
        col3: '300',
        col4: '123',
      },
      {
        id: 3,
        col1: '3',
        col2: '확률 3배',
        col3: '120',
        col4: '13',
      },
    ],
    [colorMode]
  );
  const columns = useMemo(
    () => [
      {
        Header: 'NO',
        accessor: 'col1',
      },
      {
        Header: '기프트명',
        accessor: 'col2',
      },
      {
        Header: '발행횟수',
        accessor: 'col3',
      },
      {
        Header: '사용횟수',
        accessor: 'col4',
      },
    ],
    [colorMode]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleRowClick = val => {
    history.push(`${url}/${val.id}`);
  };

  return (
    <Box>
      <Box display="flex" p={5}>
        <Button>기프트 생성</Button>
      </Box>
      <DataTable data={data} columns={columns} onRowClick={handleRowClick} />
    </Box>
  );
};

export default UserListPage;
