import { Flex, Link, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { Accordion, AccordionItem } from "@chakra-ui/accordion";
import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
interface CategoriesListProps {}

export const CategoriesList: React.FC<CategoriesListProps> = ({}) => {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const { categories } = state;
  const { pathname, query } = router;
  console.log(categories);

  return (
    <Flex
      direction="column"
      alignItems="center"
      gridGap="2rem"
      pt="3rem"
      bgColor="gray.200"
      position="sticky"
      w="20%"
      h="100vh"
    >
      <Accordion>
        {categories.map((category) => (
          <AccordionItem key={category._id}>
            <AccordionButton
              onClick={() => {
                router.push({
                  pathname,
                  query: {
                    ...query,
                    category: category.name.toLowerCase(),
                    subcategory: "",
                    page: 1,
                  },
                });
              }}
            >
              <Box
                fontWeight="600"
                letterSpacing="wider"
                fontSize="1.1em"
                flex="1"
                textAlign="left"
              >
                {category.name.toUpperCase()}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="self-start"
                pl="1rem"
                gridGap="0.5rem"
              >
                {category.subcategories.length ? (
                  category.subcategories.map((subcategory, index) => (
                    <Link
                      onClick={() => {
                        router.push({
                          pathname,
                          query: {
                            ...query,
                            subcategory: subcategory.toLowerCase(),
                            page: 1,
                          },
                        });
                      }}
                      color="blackAlpha.900"
                      key={index}
                    >
                      {subcategory}
                    </Link>
                  ))
                ) : (
                  <Text fontStyle="italic"> No subcategories...</Text>
                )}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};
