import {
  Box,
  Wrap,
  WrapItem,
  Center,
  Image,
  Badge,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import ResultModal from 'components/ResultModal';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

export default function HistoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const historyQuery = useQuery('history', async () => {
    return await axios.get('/api/users/profile').then(res => res.data);
  });

  const handleItemClick = (e, shoe) => {
    //   if (shoe.deadlineStatus === 3)
    console.log(shoe);
  };
  const moveToHistoryDetail = shoe => {
    history.push(`/history/${shoe._id}`);
  };
  const onSubmit = () => {};
  return (
    <Box>
      {/* <ResultModal
        title={'응모결과'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      /> */}
      <Wrap p={5} spacing={10}>
        {historyQuery?.data
          ? historyQuery?.data?.applyings?.map(shoe => (
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
                  height="100%"
                >
                  {shoe.retailer.shop}
                  <Box>{shoe.shoesName}</Box>
                  <Image src={shoe.imageUrl}></Image>
                  <Box paddingY={3}>
                    {shoe.deadlineStatus === 3 && (
                      <VStack>
                        <Badge fontSize="2xl" colorScheme="purple">
                          추첨 완료
                        </Badge>
                        <Button onClick={() => moveToHistoryDetail(shoe)}>
                          결과 보기
                        </Button>
                      </VStack>
                    )}
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
}
