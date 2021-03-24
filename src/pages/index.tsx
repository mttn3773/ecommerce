import { Box, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import React, { useContext } from "react";
import { CategoriesList } from "../components/Product/CategoriesList";
import { ProductCard } from "../components/Product/ProductCard";
import { SearchFilter } from "../components/Product/SearchFilter";
import { SortFilter } from "../components/Product/SortFilter";
import { IProductJson } from "../interfaces/product.interface";
import { DataContext } from "../store/GlobalState";
import { request } from "../utils/request";
interface HomePageProps {
  products: IProductJson[];
}

const Index: NextPage<HomePageProps> = ({ products }) => {
  const { state } = useContext(DataContext);
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = query.category || "all";
  const sort = query.sort || "";
  const { data } = await request({
    url: `${process.env.BASE_URL}api/products?category=${category}&sort=${sort}`,
  });
  if (!data) return { props: {} };
  const { products } = data;
  return { props: { products } };
};

export default Index;
