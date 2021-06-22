import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import { Box, Text, Image, HStack } from '@chakra-ui/react';

export default function HistoryDetailPage() {
  const { url, params } = useRouteMatch();
  console.log(url);
  console.log(params.historyID);

  const historyQuery = useQuery(['history', params.historyID], async () => {
    return await axios
      .get(`/api/shoes/${params.historyID}`)
      .then(res => res.data);
  });

  return (
    <Box p={10}>
      {!historyQuery.isLoading && (
        <Box>
          <Text fontSize={'3xl'}>{historyQuery.data?.shoesName}</Text>
          <HStack justify="center" p={4}>
            <Image maxW="400px" src={historyQuery.data?.imageUrl}></Image>
          </HStack>
        </Box>
      )}
    </Box>
  );
}
