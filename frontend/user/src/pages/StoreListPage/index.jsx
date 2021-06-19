import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useToast } from "@chakra-ui/toast";
import DataTable from "components/DataTable";
import EmployeeDetailPage from "pages/EmployeeDetailPage";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, useHistory } from "react-router";
import { useRouteMatch } from "react-router";
import { PrivateRoute } from "routes/ProtectedRoutes";

const StoreListPage = (props) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode } = useColorMode();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  //   useEffect(() => {
  //     if (tabIndex === 0) {
  //       history.push(url);
  //     } else if (tabIndex === 1) {
  //       history.push(`${url}/contents`);
  //     }
  //   }, [tabIndex]);

  const data = useMemo(
    () => [
      {
        id: 1,
        col1: "1",
        col2: "나이키 강남",
        col3: "관리자1",
      },
      {
        id: 2,
        col1: "2",
        col2: "나이키 더현대 서울",
        col3: "관리자2",
      },
      {
        id: 3,
        col1: "3",
        col2: "홍대 Snkrs",
        col3: "관리자3",
      },
    ],
    [colorMode]
  );
  const columns = useMemo(
    () => [
      {
        Header: "NO",
        accessor: "col1",
      },
      {
        Header: "매장명",
        accessor: "col2",
      },
      {
        Header: "관리자명",
        accessor: "col3",
      },
    ],
    [colorMode]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleRowClick = (val) => {
    history.push(`${url}/${val.id}`);
  };

  function onSubmit(values) {
    toast.closeAll();
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (values.loginID === "wrong") {
          if (!toast.isActive("login-error")) {
            toast({
              id: "login-error",
              title: "로그인 실패",
              description: "아이디 또는 비밀번호를 다시 확인해주세요.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive("login-success")) {
            toast({
              id: "login-success",
              title: "등록 성공.",
              description: "Hello World",
              status: "success",
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
    <Box>
      <DataTable data={data} columns={columns} onRowClick={handleRowClick} />
    </Box>
  );
};

export default StoreListPage;
