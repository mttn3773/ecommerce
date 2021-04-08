import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import { InputField } from "../../components/Form/InputField";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { request } from "../../utils/request";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

interface PasswordProps {}

export const Password: React.FC<PasswordProps> = ({}) => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const [_cookie, setCookie] = useCookies(["auth"]);
  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={async (values) => {
        const res = await request({
          url: "/api/auth",
          method: "POST",
          body: values,
        });
        if (!res.success) {
          return dispatch({
            type: ACTIONS.NOTIFY,
            payload: { ...state.notify, errors: res.errors },
          });
        }
        const { token } = res.data;
        setCookie("auth", token, {
          maxAge: 3600 * 24 * 365 * 10,
          sameSite: true,
        });
        if (res.msg) {
          dispatch({
            type: ACTIONS.NOTIFY,
            payload: {
              ...state.notify,
              success: [{ msg: res.msg }],
            },
          });
        }
        return router.push("/admin/create");
      }}
    >
      {({}) => (
        <Form>
          <Flex direction="column" w="50%" m="0 auto">
            <InputField type="password" name="password" withLabel />
            <Button type="submit"> Submit </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default Password;
