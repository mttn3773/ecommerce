import { Flex, Heading, Text } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { state } = useContext(DataContext);
  const { cart } = state;
  let count = 0;
  cart.forEach((item) => (count += item.count));
  return (
    <nav>
      <Flex
        bgColor="blackAlpha.700"
        h="60px"
        position="sticky"
        alignItems="center"
        pl="3rem"
        pr="2rem"
        justifyContent="space-between"
        color="whiteAlpha.700"
      >
        <Link href="/">
          <Heading
            size="lg"
            cursor="pointer"
            _hover={{ color: "whiteAlpha.900" }}
            transition="0.3s ease-in-out"
          >
            ECOM
          </Heading>
        </Link>
        <Flex alignItems="center" justifyContent="center">
          <Flex
            px="0.3rem"
            py="0.2rem"
            bgColor="red.300"
            borderRadius="100%"
            overflow="hidden"
            alignItems="center"
            justifyContent="center"
            minW="1.8rem"
          >
            <Text>{count}</Text>
          </Flex>
          <Link href="/cart">
            <Flex
              cursor="pointer"
              _hover={{ color: "whiteAlpha.900" }}
              transition="0.3s ease-in-out"
            >
              <AiOutlineShoppingCart size="2.6rem" />
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </nav>
  );
};
