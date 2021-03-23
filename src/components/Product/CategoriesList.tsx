import { Flex, Link } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
interface CategoriesListProps {}

export const CategoriesList: React.FC<CategoriesListProps> = ({}) => {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const { categories } = state;
  const { pathname } = router;
  const { query } = router;
  return (
    <Flex
      direction="column"
      alignItems="center"
      gridGap="2rem"
      pt="3rem"
      bgColor="gray.100"
      position="sticky"
      w="20%"
    >
      {categories.map((category) => (
        <Link
          onClick={() => {
            query.category = category.name.toLocaleLowerCase();
            router.push({
              pathname,
              query,
            });
          }}
        >
          {category.name}
        </Link>
      ))}
    </Flex>
  );
};
