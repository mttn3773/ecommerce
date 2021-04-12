import { Button, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest } from "next";
import React, { useContext, useEffect, useState } from "react";
import { ProductForm } from "../../../components/Form/ProductForm";
import { AlertDialogComponent } from "../../../components/Notify/AlertDialog";
import {
  ICreateProduct,
  IProductJSON,
} from "../../../interfaces/product.interface";
import { ACTIONS } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";
import { request } from "../../../utils/request";
import { useRouter } from "next/router";
import { verify } from "jsonwebtoken";
import { checkAuthorized } from "../../../utils/checkAuthorized";
import { baseUrl } from "../../../utils/baseUrl";
import { useCookies } from "react-cookie";

interface UpdateProductProps {
  product: IProductJSON;
  id: string;
}
export const UpdateProduct: React.FC<UpdateProductProps> = ({
  product,
  id,
}) => {
  if (!product) {
    return <Heading m="0 auto">Couldn't find this product</Heading>;
  }
  const [cookie, _setCookie] = useCookies(["auth"]);
  const router = useRouter();
  const isLogged = checkAuthorized(cookie);
  useEffect(() => {
    if (!isLogged) {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: {
          ...state.notify,
          errors: [{ msg: "You are not authorized" }],
        },
      });
      router.push("/admin/password");
    }
  }, [isLogged]);
  if (!isLogged) {
    return <p>Redirecting ...</p>;
  }
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const initialValues: ICreateProduct = {
    category: product.category,
    price: product.price,
    title: product.title,
    description: product.description,
    subcategory: product.subcategory,
    inStock: product.inStock,
  };
  const images = product.images;
  const handleDelete = async () => {
    const res = await request({ url: `/api/products/${id}`, method: "DELETE" });
    if (!res.success) {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: { ...notify, errors: res.errors },
      });
    }
    dispatch({
      type: ACTIONS.NOTIFY,
      payload: { ...notify, success: [{ msg: res.msg }] },
    });
    router.push("/");
  };
  if (!isLogged) {
    return <p>Redirecting ... </p>;
  }
  return (
    <Flex mt="1rem" direction="column" gridGap="3rem">
      <AlertDialogComponent
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        handleDelete={handleDelete}
      />
      <Button
        w="10%"
        m="0 auto"
        colorScheme="red"
        onClick={() => setDialogOpen(!dialogOpen)}
      >
        DELETE
      </Button>
      <ProductForm
        updating={id}
        initialValues={initialValues}
        existingImages={images}
      />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  if (!id) return { props: { product: null } };
  const url = baseUrl(req as NextApiRequest);
  const response = await request({
    url: `${url}/products/${id}`,
  });
  if (!response.success) return { props: { product: null } };
  const { data } = response;
  const { product } = data;
  return { props: { product, id } };
};

export default UpdateProduct;
