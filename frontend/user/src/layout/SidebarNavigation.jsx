import { Link, List, ListItem } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SidebarNavigation = (props) => {
  const { pathname } = useLocation();
  const NavigationOptions = useSelector((state) => state.CompanyList);
  return (
    <List maxH="calc(100vh - 110px - 24px)" overflow="auto">
      {NavigationOptions.map((opt) => (
        <ListItem
          width="100%"
          key={opt.id}
          textAlign="left"
          minH="20"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          _hover={{ background: "teal.700", color: "white" }}
          p={2}
          sx={
            pathname.includes(opt.slug) && {
              background: "teal.500",
              color: "white",
            }
          }
        >
          <Link
            as={RouterLink}
            to={opt.slug}
            display="flex"
            width="100%"
            flex="1"
            alignItems="center"
            _hover={{
              textDecoration: "none",
            }}
          >
            {opt.displayValue}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNavigation;
