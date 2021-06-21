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
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const ConfirmModal = ({
  title = '고객 등록',
  isOpen,
  onClose,
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
        <ModalBody>
          <Box>
            <Text>응모하시겠습니까?</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="teal" isLoading={isLoading} onClick={onSubmit}>
            응모하기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
