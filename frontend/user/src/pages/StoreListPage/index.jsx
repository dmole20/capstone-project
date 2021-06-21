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
import { Wrap, WrapItem, Center, Image, Badge } from '@chakra-ui/react';
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
import { useQuery } from 'react-query';
import axios from 'axios';
import ConfirmModal from 'components/ConfirmModal';

const StoreListPage = props => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const { colorMode } = useColorMode();
  const drawListQuery = useQuery(
    'list',
    async () => await axios.get('/api/shoes').then(data => data.data)
  );
  const toast = useToast();

  const handle0Progress = () => {
    if (!toast.isActive('login-error')) {
      toast({
        id: 'login-error',
        title: '응모 예정',
        description: '아직 시작 전인 응모입니다.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handle2Progress = () => {
    if (!toast.isActive('login-error')) {
      toast({
        id: 'login-error',
        title: '응모 마감',
        description: '마감된 응모입니다.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedID, setSelectedID] = useState(null);

  const handleItemClick = (e, shoe) => {
    toast.closeAll();

    if (shoe.deadlineStatus === 0) {
      handle0Progress();
    } else if (shoe.deadlineStatus === 2) {
      handle2Progress();
    } else {
      setSelectedID(shoe._id);
      onOpen();
    }
  };
  const onSubmit = async () => {
    let drawEnter = await axios
      .post(`/api/shoes/${selectedID}/applying`)
      .then(() => {
        if (!toast.isActive('login-error')) {
          toast({
            id: 'login-error',
            title: '응모 성공',
            description: '응모에 성공했습니다.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(() => {
        if (!toast.isActive('login-error')) {
          toast({
            id: 'login-error',
            title: '응모실패',
            description: '오류가 발생했습니다.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        onClose();
      });
  };
  return (
    <Box>
      <ConfirmModal
        title={'응모하기'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
      <Wrap p={5} spacing={10}>
        {drawListQuery?.data
          ? drawListQuery?.data.map(shoe => (
              <WrapItem key={shoe._id} onClick={e => handleItemClick(e, shoe)}>
                <Center
                  w="360px"
                  // h="160px"
                  border="1px solid teal"
                  _hover={{
                    transform: 'scale(1.1)',
                    transition: 'all .2s ease-in',
                  }}
                  display="flex"
                  flexDir="column"
                  cursor="pointer"
                  p={4}
                >
                  {shoe.retailer.shop}
                  <Box>{shoe.shoesName}</Box>
                  <Image src={shoe.imageUrl}></Image>
                  <Box paddingY={3}>
                    {shoe.deadlineStatus === 2 && (
                      <Badge fontSize="2xl" colorScheme="red">
                        응모 마감
                      </Badge>
                    )}
                    {shoe.deadlineStatus === 1 && (
                      <Badge fontSize="2xl" colorScheme="green">
                        진행중
                      </Badge>
                    )}
                    {shoe.deadlineStatus === 0 && (
                      <Badge fontSize="2xl" colorScheme="yellow">
                        응모 예정
                      </Badge>
                    )}
                  </Box>
                </Center>
              </WrapItem>
            ))
          : null}
      </Wrap>

      {/* <DataTable data={data} columns={columns} onRowClick={handleRowClick} /> */}
    </Box>
  );
};

export default StoreListPage;
