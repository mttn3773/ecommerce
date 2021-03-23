import { Box, Flex } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useContext } from "react";
import { CategoriesList } from "../components/Product/CategoriesList";
import { ProductCard } from "../components/Product/ProductCard";
import { SearchFilter } from "../components/Product/SearchFilter";
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
      <Flex
        wrap="wrap"
        width="80%"
        m="0 auto"
        gridGap="3rem"
        borderColor="blue.300"
        alignItems="center"
        justifyContent="center"
      >
        {products.map((product) => (
          <Box w="30%">
            <ProductCard product={product} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const { data } = await request({
    url: `${process.env.BASE_URL}api/products`,
  });
  const { products } = data;
  return { props: { products } };
};

export default Index;
