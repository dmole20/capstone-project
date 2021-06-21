import {
  Badge,
  Box,
  Button,
  Flex,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import DataTable from 'components/DataTable';
import { Fragment, useMemo } from 'react';

const UserDetailPage = props => {
  const { colorMode } = useColorMode();

  const data = useMemo(
    () => [
      {
        id: 1,
        col1: '1',
        col2: 'test1',
        status: 'done',
      },
      {
        id: 2,
        col1: '2',
        col2: 'test2',
        status: 'done',
      },
      {
        id: 3,
        col1: '3',
        col2: 'test3',
        status: 'progressing',
      },
      {
        id: 4,
        col1: '4',
        col2: 'test4',
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
        Header: '회원명',
        accessor: 'col2',
      },
      {
        Header: '사용현황',
        accessor: 'col3',
        Cell: ({ row }) => {
          if (row.original.status === 'done') {
            return (
              <Badge variant="outline" colorScheme="green" fontSize="xl">
                사용 완료
              </Badge>
            );
          } else {
            return (
              <Badge variant="outline" colorScheme="red" fontSize="xl">
                사용전
              </Badge>
            );
          }
        },
      },
    ],
    [colorMode]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={5}>
      <Flex pb={5} pt={5}>
        <p>확률 1.5배</p>
      </Flex>
      <Flex pt={5} pb={5}>
        <Button>기프트 발행</Button>
      </Flex>
      <DataTable data={data} columns={columns} onRowClick={() => {}} />
    </Box>
  );
};

export default UserDetailPage;
