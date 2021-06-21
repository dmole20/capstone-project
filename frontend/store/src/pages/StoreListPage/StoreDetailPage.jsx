import {
  Box,
  List,
  Text,
  VStack,
  ListItem,
  HStack,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Image } from '@chakra-ui/image';
import axios from 'axios';
const StoreDetailPage = props => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const history = useHistory();

  const l = useLocation();
  console.log(l);
  const handleDrawStart = async () => {
    toast.closeAll();
    let drawStart = await axios
      .post(`/api/shoes/${l.state.id}/start`)
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
        queryClient.invalidateQueries('profile');
        history.push('/draw');
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
      });
  };
  const handleDrawEnd = async () => {
    toast.closeAll();
    let drawEnd = await axios
      .post(`/api/shoes/${l.state.id}/end`)
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
        queryClient.invalidateQueries('profile');
        history.push('/draw');
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
      });
  };
  return (
    <VStack p={5}>
      <Image width="400px" src={l.state.imageUrl}></Image>
      <Text>{l.state.shoesName}</Text>
      <List width="100%">
        <ListItem>
          <Flex>
            <Box flex="1">사이즈</Box>
            <Box flex="1">당첨갯수</Box>
            <Box flex="1">응모현황</Box>
          </Flex>
        </ListItem>
        {Object.keys(l.state.size).map(k => (
          <ListItem key={k}>
            <Flex>
              <Box flex="1">{k.split('_')[1]}</Box>
              <Box flex="1">{l.state.size[k].stocks}</Box>
              <Box flex="1">{l.state.size[k].applicants.length}</Box>
            </Flex>
          </ListItem>
        ))}
      </List>
      <HStack p={4}>
        {l.state.deadlineStatus === 0 ? (
          <Button color="primary" onClick={handleDrawStart}>
            응모 시작
          </Button>
        ) : (
          <Button onClick={handleDrawEnd}>응모 마감</Button>
        )}
      </HStack>
    </VStack>
  );
};

export default StoreDetailPage;
