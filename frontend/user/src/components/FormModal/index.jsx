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
          <ModalBody>
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
            <FormControl isInvalid={errors?.employeePhone}>
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
            </FormControl>
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
