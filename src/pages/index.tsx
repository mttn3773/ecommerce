import { Box, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest, NextPage } from "next";
import React from "react";
import { CategoriesList } from "../components/Filters/CategoriesList";
import { PageSelector } from "../components/Filters/PageSelector";
import { SortFilter } from "../components/Filters/SortFilter";
import { ProductCard } from "../components/Product/ProductCard";
import { IProductJSON } from "../interfaces/product.interface";
import { baseUrl } from "../utils/baseUrl";
import { request } from "../utils/request";
interface HomePageProps {
  products: IProductJSON[];
  count: number;
}

const Index: NextPage<HomePageProps> = ({ products, count }) => {
  return (
    <Flex>
      <CategoriesList />
      <Flex w="80%" direction="column" gridGap="2rem">
        <SortFilter />
        <Flex
          wrap="wrap"
          width="100%"
          m="0 auto"
          gridGap="3rem"
          borderColor="blue.300"
          alignItems="center"
          justifyContent="center"
        >
          {products && products.length ? (
            products.map((product) => (
              <Box w="30%" key={product._id}>
                <ProductCard product={product} />
              </Box>
            ))
          ) : (
            <Box w="100%">
              <Text> No products...</Text>
            </Box>
          )}
          <PageSelector numberOfItems={count} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const url = baseUrl(req as NextApiRequest);
  const category = query.category || "all";
  const subcategory = query.subcategory || "";
  const sort = query.sort || "newest";
  const page = query.page || 1;
  const { data } = await request({
    url: `${url}/products?category=${category}&sort=${sort}&page=${page}&subcategory=${subcategory}`,
  });
  if (!data) return { props: {} };

  const { products, count } = data;
  return { props: { products, count } };
};

export default Index;
