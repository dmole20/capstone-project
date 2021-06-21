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
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCode from 'components/PostCode';
import { useRef } from 'react';

export default function RegisterPage() {
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

  async function onSubmit(values) {
    toast.closeAll();
    setIsLoading(true);
    console.log(values);
    values.address = postCodeValue;
    let joinPostCall = await axios
      .post('/api/retailers/re_join', {
        ...values,
      })
      .then(() => {
        if (!toast.isActive('login-success')) {
          toast({
            id: 'login-success',
            title: '회원가입 성공.',
            description: 'Hello World',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
        history.push('/login');
      })
      .catch(() => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });

    return;
  }

  // username, password, passwrodConfirm, phone, shop, address
  const [postCodeOpen, setPostCodeOpen] = useState(false);
  const [postCodeValue, setPostCodeValue] = useState('');
  //   const postcodeInputRef = useRef(null);

  const onAddressFocus = () => {
    setPostCodeOpen(true);
  };

  return (
    <Box minH="100%">
      <Box position="absolute" top="3" right="3">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <VStack minH="100%" justify="center">
        {/* <Logo pointerEvents="none" /> */}
        <Text>매장 관리자 회원가입 페이지</Text>
        <Box minW="400px">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <FormControl isInvalid={errors?.name}>
              <FormLabel htmlFor="name">이름</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: '이름 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.name && errors?.name.message}
              </FormErrorMessage>
            </FormControl> */}
            <FormControl isInvalid={errors?.username}>
              <FormLabel htmlFor="username">아이디</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: '아이디는 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.username && errors?.username.message}
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
            <FormControl isInvalid={errors?.passwrodConfirm}>
              <FormLabel htmlFor="passwrodConfirm">비밀번호 확인</FormLabel>
              <Controller
                render={({ field }) => <Input type="password" {...field} />}
                name="passwrodConfirm"
                control={control}
                defaultValue=""
                rules={{ required: '비밀번호는 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.passwrodConfirm && errors?.passwrodConfirm.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.phone}>
              <FormLabel htmlFor="phone">전화번호</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: '전화번호 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.phone && errors?.phone.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.shop}>
              <FormLabel htmlFor="shop">매장명</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="shop"
                control={control}
                defaultValue=""
                rules={{ required: '매장명 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.shop && errors?.shop.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.address}>
              <FormLabel htmlFor="address">매장 주소</FormLabel>
              <Controller
                render={({ field }) => (
                  <Input
                    // ref={postcodeInputRef}
                    {...field}
                    onFocus={onAddressFocus}
                    value={postCodeValue}
                  />
                )}
                name="address"
                control={control}
                defaultValue=""
                // rules={{ required: '매장 주소 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.address && errors?.address.message}
              </FormErrorMessage>
            </FormControl>
            {postCodeOpen && (
              <PostCode
                setValue={setPostCodeValue}
                onClose={() => {
                  setPostCodeOpen(false);
                }}
              />
            )}
            {/* <FormControl isInvalid={errors?.nikeId}>
              <FormLabel htmlFor="nikeId">Nike.com ID</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="nikeId"
                control={control}
                defaultValue=""
                rules={{ required: 'Nike.com ID 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.nikeId && errors?.nikeId.message}
              </FormErrorMessage>
            </FormControl> */}
            {/* <FormControl isInvalid={errors?.birthday}>
              <FormLabel htmlFor="birthday">
                생년월일 6자리 (ex - 950911)
              </FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="birthday"
                control={control}
                defaultValue=""
                rules={{ required: '생년월일 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.birthday && errors?.birthday.message}
              </FormErrorMessage>
            </FormControl> */}
            {/* <FormControl isInvalid={errors?.size}>
              <FormLabel htmlFor="size">신발 사이즈</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="size"
                control={control}
                defaultValue=""
                rules={{ required: '신발 사이즈 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.size && errors?.size.message}
              </FormErrorMessage>
            </FormControl> */}
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isLoading}
            >
              회원가입
            </Button>
          </form>
        </Box>
      </VStack>
    </Box>
  );
}
