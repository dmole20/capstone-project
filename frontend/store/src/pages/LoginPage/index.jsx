import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  useToast,
  VStack,
  Text,
} from '@chakra-ui/react';
import { Logo } from 'Logo';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

function LoginPage() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const LOGINSTATE = useSelector(state => state.authorized);
  const DEFAULTCOMPANY = useSelector(state => state.CompanyList[0]);

  useEffect(() => {
    if (LOGINSTATE) {
      if (
        location.state?.from?.pathname &&
        location.state?.from?.pathname !== '/'
      ) {
        history.push(location.state.from.pathname);
      } else {
        history.push(DEFAULTCOMPANY.slug);
      }
    }
  }, [LOGINSTATE]);

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
              title: '로그인 성공.',
              description: 'Hello World',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
          dispatch({ type: 'setAuthorizationToken' });
        }
        setIsLoading(false);
      }, 500);
    });
  }

  return (
    <Box minH="100%">
      <Box position="absolute" top="3" right="3">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <VStack minH="100%" justify="center">
        {/* <Logo pointerEvents="none" /> */}
        <Text>매장 관리자 전용 페이지</Text>
        <Box minW="400px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors?.loginID}>
              <FormLabel htmlFor="loginID">아이디</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="loginID"
                control={control}
                defaultValue=""
                rules={{ required: '아이디는 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.loginID && errors?.loginID.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.password}>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <Controller
                render={({ field }) => <Input type="password" {...field} />}
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: '비밀번호는 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.password && errors?.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
            >
              로그인
            </Button>
            <Button mt={4} isLoading={isLoading}>
              회원가입
            </Button>
          </form>
        </Box>
      </VStack>
    </Box>
  );
}
export default LoginPage;
