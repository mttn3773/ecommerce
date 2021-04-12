import { GetServerSideProps, NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { ProductForm } from "../../../components/Form/ProductForm";
import { checkAuthorized } from "../../../utils/checkAuthorized";
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";
import { ACTIONS } from "../../../store/Actions";
import { useCookies } from "react-cookie";

interface CreateProductProps {}

const CreateProduct: NextPage<CreateProductProps> = ({}) => {
  const { dispatch, state } = useContext(DataContext);
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
  return <ProductForm />;
};

export default CreateProduct;
