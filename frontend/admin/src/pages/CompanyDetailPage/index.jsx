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

const CompanyDetailPage = (props) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode } = useColorMode();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  useEffect(() => {
    if (tabIndex === 0) {
      history.push(url);
    } else if (tabIndex === 1) {
      history.push(`${url}/contents`);
    }
  }, [tabIndex]);

  const data = useMemo(
    () => [
      {
        id: 1,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "hello",
      },
      {
        id: 2,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 3,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 4,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 5,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 6,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 7,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 8,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 9,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 10,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 11,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 12,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 13,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 14,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
      },
      {
        id: 15,
        col1: "col1",
        col2: "col2",
        col3: "col3",
        col4: "col4",
        col5: "col5",
        col6: "col6",
        col7: "col7",
        col8: "col8",
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
        Header: "??????",
        accessor: "col2",
      },
      {
        Header: "??????",
        accessor: "col3",
      },
      {
        Header: "????????????",
        accessor: "col4",
      },
      {
        Header: "?????????",
        accessor: "col5",
      },
      {
        Header: "?????? ??????",
        accessor: "col6",
      },
      {
        Header: "???????????? ??????",
        accessor: "col7",
      },
      {
        Header: "?????? ??????",
        accessor: "col8",
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <Button
            color={colorMode === "light" ? "black" : "white"}
            onClick={(e) => {
              e.stopPropagation();
              console.log("butn");
            }}
          >
            ??????
          </Button>
        ),
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
              title: "????????? ??????",
              description: "????????? ?????? ??????????????? ?????? ??????????????????.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive("login-success")) {
            toast({
              id: "login-success",
              title: "?????? ??????.",
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
      <Tabs variant="line" isLazy onChange={handleTabsChange}>
        <TabList minH="20">
          <Tab
            minW="200px"
            _selected={{
              backgroundColor: "brand.secondary",
              color: "white",
            }}
          >
            Sales
          </Tab>
          <Tab
            minW="200px"
            _selected={{
              backgroundColor: "brand.secondary",
              color: "white",
            }}
          >
            Contents
          </Tab>
          {tabIndex === 0 && (
            <Flex justify="flex-end" alignItems="center" flex="1">
              <HStack spacing="24px">
                <Button>QR ????????????</Button>
                <Button>QR ????????????</Button>
                <Button>?????? ????????????</Button>
                <Button onClick={onOpen}>???????????? ??????</Button>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                  size="2xl"
                  motionPreset="scale"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>???????????? ?????? ??????</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ModalBody>
                        <FormControl isInvalid={errors?.employeeName}>
                          <FormLabel htmlFor="employeeName">??????</FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="employeeName"
                            control={control}
                            defaultValue=""
                            rules={{ required: "????????? ?????? ??????????????????." }}
                          />
                          <FormErrorMessage>
                            {errors?.employeeName &&
                              errors?.employeeName.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors?.employeeRank}>
                          <FormLabel htmlFor="employeeRank">??????</FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="employeeRank"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "????????? ?????? ??????????????????.",
                            }}
                          />
                          <FormErrorMessage>
                            {errors?.employeeRank &&
                              errors?.employeeRank.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors?.employeePhone}>
                          <FormLabel htmlFor="employeePhone">
                            ???????????????
                          </FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="employeePhone"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "?????????????????? ?????? ??????????????????.",
                            }}
                          />
                          <FormErrorMessage>
                            {errors?.employeePhone &&
                              errors?.employeePhone.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors?.employeeEmail}>
                          <FormLabel htmlFor="employeeEmail">?????????</FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="employeeEmail"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "???????????? ?????? ??????????????????.",
                            }}
                          />
                          <FormErrorMessage>
                            {errors?.employeeEmail &&
                              errors?.employeeEmail.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors?.employeeContract}>
                          <FormLabel htmlFor="employeeContract">
                            ????????????
                          </FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="employeeContract"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "??????????????? ?????? ??????????????????.",
                            }}
                          />
                          <FormErrorMessage>
                            {errors?.employeeContract &&
                              errors?.employeeContract.message}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors?.amount}>
                          <FormLabel htmlFor="amount">???????????? ??????</FormLabel>
                          <Controller
                            render={({ field }) => <Input {...field} />}
                            name="amount"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "???????????? ????????? ?????? ??????????????????.",
                            }}
                          />
                          <FormErrorMessage>
                            {errors?.amount && errors?.amount.message}
                          </FormErrorMessage>
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          ??????
                        </Button>
                        <Button
                          colorScheme="teal"
                          type="submit"
                          isLoading={isLoading}
                        >
                          ??????
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
              </HStack>
            </Flex>
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Switch>
              <PrivateRoute exact path="/company/:companyID">
                <DataTable
                  data={data}
                  columns={columns}
                  onRowClick={handleRowClick}
                />
              </PrivateRoute>
              <PrivateRoute exact path="/company/:companyID/:employeeID">
                <EmployeeDetailPage />
              </PrivateRoute>
            </Switch>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CompanyDetailPage;
