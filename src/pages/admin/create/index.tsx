import { GetServerSideProps } from "next";
import React, { useContext, useEffect } from "react";
import { ProductForm } from "../../../components/Form/ProductForm";
import { checkAuthorized } from "../../../utils/checkAuthorized";
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";
import { ACTIONS } from "../../../store/Actions";
interface CreateProductProps {
  isLogged: boolean;
}

const CreateProduct: React.FC<CreateProductProps> = ({ isLogged }) => {
  const { dispatch, state } = useContext(DataContext);
  const router = useRouter();
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isLogged = checkAuthorized(req);
  return { props: { isLogged } };
};
export default CreateProduct;
