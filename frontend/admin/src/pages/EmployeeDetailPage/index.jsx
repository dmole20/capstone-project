import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import {
  Badge,
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Fragment, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import SAMPLEQR from 'asset/sampleQR.png';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/toast';
import { useDisclosure } from '@chakra-ui/hooks';

import FormModal from 'components/FormModal';

const EmployeeDetailPage = props => {
  const { params, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalForm = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <VStack height="70vh" maxH="70vh">
      <FormModal
        title={'고객 등록'}
        isOpen={isOpen}
        onClose={onClose}
        modalForm={modalForm}
        onSubmit={onSubmit}
      />
      <HStack display="flex" w="100%" justify="space-between">
        <Text fontSize="4xl">오코 영업사원</Text>
        <Button
          colorScheme="purple"
          onClick={() => {
            history.push(url.split('/').slice(0, -1).join('/'));
          }}
        >
          뒤로
        </Button>
      </HStack>
      <HStack w="100%" justify="flex-end">
        <Button color="teal" variant="outline">
          엑셀 다운로드
        </Button>
        <Button color="teal" variant="outline" onClick={onOpen}>
          고객등록
        </Button>
      </HStack>
      <Flex justify="space-between" p={3} flex="1">
        <Box flex="1">
          <VStack>
            <Box p={10}>
              <Image background="white" src={SAMPLEQR} />
            </Box>
            <Button>QR 코드 생성</Button>
          </VStack>
        </Box>
        <Box flex="1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors?.employeeName}>
              <FormLabel htmlFor="employeeName">성명</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="employeeName"
                control={control}
                defaultValue=""
                rules={{ required: '성명은 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.employeeName && errors?.employeeName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.employeeRank}>
              <FormLabel htmlFor="employeeRank">직급</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="employeeRank"
                control={control}
                defaultValue=""
                rules={{
                  required: '직급은 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.employeeRank && errors?.employeeRank.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.employeePhone}>
              <FormLabel htmlFor="employeePhone">휴대폰번호</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="employeePhone"
                control={control}
                defaultValue=""
                rules={{
                  required: '휴대폰번호는 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.employeePhone && errors?.employeePhone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.employeeEmail}>
              <FormLabel htmlFor="employeeEmail">이메일</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="employeeEmail"
                control={control}
                defaultValue=""
                rules={{
                  required: '이메일은 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.employeeEmail && errors?.employeeEmail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.employeeContract}>
              <FormLabel htmlFor="employeeContract">계약기간</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="employeeContract"
                control={control}
                defaultValue=""
                rules={{
                  required: '계약기간은 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.employeeContract && errors?.employeeContract.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.amount}>
              <FormLabel htmlFor="amount">수저받침 갯수</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                  required: '수저받침 갯수는 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.amount && errors?.amount.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
            >
              등록
            </Button>
          </form>
        </Box>
        <Box flex="1" display="flex" flexDirection="column">
          <Box
            flex="1"
            marginX="10"
            border="1px solid"
            borderRadius="md"
            maxH="70vh"
            overflow="auto"
          >
            <List textAlign="left">
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="green" fontSize="xl">
                    장례 / 웨딩
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="red" fontSize="xl">
                    크루즈
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="blue" fontSize="xl">
                    어학
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="orange" fontSize="xl">
                    장례
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="green" fontSize="xl">
                    장례 / 웨딩
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="red" fontSize="xl">
                    크루즈
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="blue" fontSize="xl">
                    어학
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="orange" fontSize="xl">
                    장례
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="green" fontSize="xl">
                    장례 / 웨딩
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="red" fontSize="xl">
                    크루즈
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="blue" fontSize="xl">
                    어학
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="orange" fontSize="xl">
                    장례
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="green" fontSize="xl">
                    장례 / 웨딩
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="red" fontSize="xl">
                    크루즈
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="blue" fontSize="xl">
                    어학
                  </Badge>
                </HStack>
              </ListItem>
              <ListItem p="4">
                <HStack spacing={4}>
                  <Text>김갑생</Text>
                  <Text>010-1234-5678</Text>
                  <Badge variant="outline" colorScheme="orange" fontSize="xl">
                    장례
                  </Badge>
                </HStack>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Flex>
    </VStack>
  );
};

export default EmployeeDetailPage;
