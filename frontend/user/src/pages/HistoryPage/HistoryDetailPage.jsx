import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import {
  Box,
  Text,
  Image,
  HStack,
  List,
  ListItem,
  Flex,
  Badge,
} from '@chakra-ui/react';

export default function HistoryDetailPage() {
  const { url, params } = useRouteMatch();
  console.log(url);
  console.log(params.historyID);

  const historyQuery = useQuery(['history', params.historyID], async () => {
    return await axios
      .get(`/api/shoes/${params.historyID}`)
      .then(res => res.data);
  });
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData('history');
  console.log(userProfile);

  return (
    <Box p={10}>
      {!historyQuery.isLoading && (
        <Box>
          <Text fontSize={'3xl'}>{historyQuery.data?.shoesName}</Text>
          <HStack justify="center" p={4}>
            <Image maxW="400px" src={historyQuery.data?.imageUrl}></Image>
          </HStack>
          <List>
            <ListItem>
              <Flex>
                <Flex flex="1">사이즈</Flex>
                <Flex flex="1">발매 수량</Flex>
                <Flex flex="1">응모자 수</Flex>
              </Flex>
            </ListItem>
            {Object.keys(historyQuery.data?.size).map(sz => (
              <ListItem
                key={sz}
                fontSize={sz.split('_')[1] == userProfile.size ? '3xl' : 'l'}
                bg={sz.split('_')[1] == userProfile.size ? 'teal' : 'default'}
                color={
                  sz.split('_')[1] == userProfile.size ? '#fff' : 'inherit'
                }
              >
                <Flex>
                  <Flex flex="1">{sz.split('_')[1]}</Flex>
                  <Flex flex="1">{historyQuery.data?.size[sz].stocks}</Flex>
                  <Flex flex="1">
                    {historyQuery.data?.size[sz].applicants.length}
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
          <Box>당첨여부:</Box>
          <Box>
            {historyQuery.data?.size[`m_${userProfile.size}`].winner?.findIndex(
              v => v === userProfile._id
            ) !== -1 ? (
              <Badge fontSize="2xl" colorScheme="green">
                당첨
              </Badge>
            ) : (
              <Badge fontSize="2xl" colorScheme="red">
                미당첨
              </Badge>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
