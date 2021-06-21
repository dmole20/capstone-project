import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const FormModal = ({
  title = '고객 등록',
  isOpen,
  onClose,
  modalForm: {
    control,
    handleSubmit,
    formState: { errors },
  },
  onSubmit,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('1');

  // shoesName,
  // imageUrl,
  // price,
  // m_240,
  // m_245,
  // m_250,
  // m_255,
  // m_260,
  // m_265,
  // m_270,
  // m_275,
  // m_280,
  // m_285,
  // m_290,
  // m_295,
  // m_300,
  // m_305,
  // m_310,
  let sizeOptions = [
    240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310,
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody maxHeight="96vh" overflow="auto">
            <FormControl isInvalid={errors?.shoesName}>
              <FormLabel htmlFor="shoesName">모델명</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="shoesName"
                control={control}
                defaultValue=""
                rules={{ required: '모델명은 필수 입력값입니다.' }}
              />
              <FormErrorMessage>
                {errors?.shoesName && errors?.shoesName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.imageUrl}>
              <FormLabel htmlFor="imageUrl">상품 이미지 링크</FormLabel>
              <Controller
                render={({ field }) => <Input {...field} />}
                name="imageUrl"
                control={control}
                defaultValue=""
                rules={{
                  required: '상품 이미지는 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.imageUrl && errors?.imageUrl.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.price}>
              <FormLabel htmlFor="price">발매가</FormLabel>
              <Controller
                render={({ field }) => <Input type="number" {...field} />}
                name="price"
                control={control}
                defaultValue=""
                rules={{
                  required: '발매가는 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.price && errors?.price.message}
              </FormErrorMessage>
            </FormControl>

            <Text paddingY={5}>사이즈 별 수량</Text>
            {sizeOptions.map(size => (
              <Flex key={size}>
                <Box flex="1" fontSize="5xl">
                  {size}
                </Box>
                <Box flex="1">
                  <FormControl isInvalid={errors[`m_${size}`]} height="100%">
                    {/* <FormLabel htmlFor="m_240">발매수량</FormLabel> */}
                    <Controller
                      render={({ field }) => (
                        <Input
                          type="number"
                          {...field}
                          height="100%"
                          fontSize="3xl"
                        />
                      )}
                      name={`m_${size}`}
                      control={control}
                      defaultValue={0}
                      rules={{
                        required: '발매수량는 필수 입력값입니다.',
                      }}
                    />
                    <FormErrorMessage>
                      {errors[`m_${size}`] && errors[`m_${size}`].message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Flex>
            ))}

            {/* <FormControl isInvalid={errors?.employeePhone}>
              <FormLabel htmlFor="favoriteItem">관심상품</FormLabel>
              <Controller
                render={({ field }) => (
                  <RadioGroup onChange={setValue} value={value} {...field}>
                    <Stack direction="row">
                      <Radio value="1">First</Radio>
                      <Radio value="2">Second</Radio>
                      <Radio value="3">Third</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                name="favoriteItem"
                control={control}
                defaultValue=""
                rules={{
                  required: '관심상품은 필수 입력값입니다.',
                }}
              />
              <FormErrorMessage>
                {errors?.favoriteItem && errors?.favoriteItem.message}
              </FormErrorMessage>
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="teal" type="submit" isLoading={isLoading}>
              등록
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
