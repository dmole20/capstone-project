import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { usePagination, useTable } from 'react-table';
import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdMoreHoriz,
} from 'react-icons/md';

const DataTable = ({ columns, data, onRowClick, ...props }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: 10,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
    usePagination
  );
  return (
    <Fragment>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Table {...getTableProps()} style={{ borderWidth: 1, width: '100%' }}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps()}
                  background="brand.secondary"
                  color="white"
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                _hover={{
                  backgroundColor: 'teal.600',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => onRowClick(row.original)}
              >
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()} style={{}}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* <HStack justify="center" mt="5">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Go to First Page"
          icon={<Icon as={MdFirstPage} />}
          disabled={pageIndex === 0}
          onClick={() => gotoPage(0)}
        />
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Previous Page"
          icon={<Icon as={MdChevronLeft} />}
          disabled={!canPreviousPage}
          onClick={previousPage}
        />
        <HStack>
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Go to Page 1"
            icon={<Box>1</Box>}
            onClick={() => gotoPage(0)}
            sx={
              pageIndex === 0 && {
                background: 'brand.secondary',
                borderColor: 'brand.secondary',
                color: 'white',
              }
            }
          />
          {pageCount > 5 && pageIndex >= 2 && <Icon as={MdMoreHoriz} />}
          {new Array(pageCount)
            .fill(0)
            .map((c, i) => i)
            .slice(1, pageCount - 1)
            .map(item => (
              <IconButton
                key={item}
                variant="outline"
                colorScheme="teal"
                aria-label={`Go to Page ${item + 1}`}
                icon={<Box>{item + 1}</Box>}
                onClick={() => gotoPage(item)}
                display={
                  item >= pageIndex - 2 && item <= pageIndex + 2
                    ? 'block'
                    : 'none'
                }
                sx={
                  pageIndex === item && {
                    background: 'brand.secondary',
                    borderColor: 'brand.secondary',
                    color: 'white',
                  }
                }
              />
            ))}
          {pageCount > 5 && pageIndex <= pageCount - 3 && (
            <Icon as={MdMoreHoriz} />
          )}
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label={`Go to Page ${pageCount}`}
            icon={<Box>{pageCount}</Box>}
            onClick={() => gotoPage(pageCount - 1)}
            sx={
              pageIndex === pageCount - 1 && {
                background: 'brand.secondary',
                borderColor: 'brand.secondary',
                color: 'white',
              }
            }
          />
        </HStack>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Next Page"
          icon={<Icon as={MdChevronRight} />}
          disabled={!canNextPage}
          onClick={nextPage}
        />
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Go to Last Page"
          icon={<Icon as={MdLastPage} />}
          disabled={pageIndex === pageCount - 1}
          onClick={() => gotoPage(pageCount - 1)}
        />
      </HStack> */}
    </Fragment>
  );
};

export default DataTable;
