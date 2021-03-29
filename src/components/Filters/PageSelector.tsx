import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface PageSelectorProps {
  numberOfItems: number;
}

export const PageSelector: React.FC<PageSelectorProps> = ({
  numberOfItems,
}) => {
  const router = useRouter();
  const { query, pathname } = router;
  const numberOfPages = Math.ceil(numberOfItems / 6);
  const pageList: number[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageList.push(i);
  }

  return (
    <Flex mb="3rem" w="100%" justifyContent="center" alignItems="center">
      {pageList.map((page, index) => (
        <Button
          key={index}
          onClick={() => {
            router.push({
              pathname,
              query: { ...query, page },
            });
          }}
        >
          {page}
        </Button>
      ))}
    </Flex>
  );
};
