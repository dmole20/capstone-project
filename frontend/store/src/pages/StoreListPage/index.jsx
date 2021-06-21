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
import { Badge } from '@chakra-ui/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useToast } from '@chakra-ui/toast';
import DataTable from 'components/DataTable';
import EmployeeDetailPage from 'pages/EmployeeDetailPage';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Switch, useHistory } from 'react-router';
import { useRouteMatch } from 'react-router';
import { PrivateRoute } from 'routes/ProtectedRoutes';

const StoreListPage = props => {
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
        col2: 'Nike Dunk Low Retro Black',
        status: 'done',
      },
      {
        id: 2,
        col1: '2',
        col2: 'Jordan 1 Retro High OG Shadow 2.0',
        status: 'done',
      },
      {
        id: 3,
        col1: '3',
        col2: 'Jordan 1 Retro High OG University Blue',
        status: 'progressing',
      },
      {
        id: 4,
        col1: '4',
        col2: 'Nike Dunk Low Retro University Blue',
        status: 'ready',
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
        Header: '응모이름',
        accessor: 'col2',
      },
      {
        Header: '마감현황',
        accessor: 'col3',
        Cell: ({ row }) => {
          if (row.original.status === 'done') {
            return (
              <Badge variant="outline" colorScheme="red" fontSize="xl">
                완료
              </Badge>
            );
          } else if (row.original.status === 'progressing') {
            return (
              <Badge variant="outline" colorScheme="green" fontSize="xl">
                진행중
              </Badge>
            );
          } else {
            return (
              <Badge variant="outline" colorScheme="yellow" fontSize="xl">
                시작 전
              </Badge>
            );
          }
        },
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

  function onSubmit(values) {
    toast.closeAll();
    setIsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        if (values.loginID === 'wrong') {
          if (!toast.isActive('login-error')) {
            toast({
              id: 'login-error',
              title: '로그인 실패',
              description: '아이디 또는 비밀번호를 다시 확인해주세요.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive('login-success')) {
            toast({
              id: 'login-success',
              title: '등록 성공.',
              description: 'Hello World',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        }
        setIsLoading(false);
      }, 500);
    });
  }
  return (
    <Box>
      <Box display="flex" p={5}>
        <Button>응모 생성</Button>
      </Box>
      <DataTable data={data} columns={columns} onRowClick={handleRowClick} />
    </Box>
  );
};

export default StoreListPage;
