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
import { useQuery } from 'react-query';
import { Badge } from '@chakra-ui/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import DataTable from 'components/DataTable';
import FormModal from 'components/FormModal';
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
  const query = useQuery('shoes', async () => {
    return await axios.get('/api/shoes/').then(data => data.data);
  });
  const profile = useQuery('profile', async () => {
    return await axios.get('/api/retailers/profile').then(data => data.data);
  });

  const data = useMemo(
    () =>
      profile?.data?.shoes?.length > 0
        ? profile?.data?.shoes?.map((shoe, idx) => ({
            ...shoe,
            id: shoe._id,
            col1: idx + 1,
            col2: shoe.shoesName,
            status: shoe.status,
          }))
        : [],
    [colorMode, profile.data]
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
        Header: '발매가',
        accessor: 'price',
      },
      {
        Header: '마감현황',
        accessor: 'col3',
        Cell: ({ row }) => {
          if (row.original.deadlineStatus === 3) {
            return (
              <Badge variant="outline" colorScheme="purple" fontSize="xl">
                추첨 완료
              </Badge>
            );
          } else if (row.original.deadlineStatus === 2) {
            return (
              <Badge variant="outline" colorScheme="red" fontSize="xl">
                응모 완료
              </Badge>
            );
          } else if (row.original.deadlineStatus === 1) {
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
    history.push(`${url}/${val.id}`, val);
  };

  async function onSubmit(values) {
    toast.closeAll();
    setIsLoading(true);
    console.log(values);
    let uploadResult = await axios
      .post('/api/shoes', { ...values })
      .then(() => {
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
        onClose();
        profile.refetch();
      })
      .catch(() => {
        if (!toast.isActive('login-error')) {
          toast({
            id: 'login-error',
            title: '등록 실패',
            description: '다시 확인해주세요.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  }
  const modalForm = useForm();
  return (
    <Box>
      <FormModal
        title={'응모 생성'}
        isOpen={isOpen}
        onClose={onClose}
        modalForm={modalForm}
        onSubmit={onSubmit}
      />
      <Box display="flex" p={5}>
        <Button onClick={onOpen}>응모 생성</Button>
      </Box>
      <DataTable data={data} columns={columns} onRowClick={handleRowClick} />
    </Box>
  );
};

export default StoreListPage;
