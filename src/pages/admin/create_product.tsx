import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { ImageUpload } from "../../components/Form/ImageUpload";
import { InputField } from "../../components/Form/InputField";
import { SelectCategory } from "../../components/Form/SelectCategory";
import { useImageUpload } from "../../hooks/useImageUpload";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import { request } from "../../utils/request";
import { ProductValidationSchema } from "../../utils/validateProduct";
interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const [images, setImages] = useState<any[]>([]);
  const { upload, isUploading, progressIndicator } = useImageUpload();
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    try {
      const media = await upload(images);
      const body = {
        ...values,
        images: media,
      };
      const response = await request({
        url: "/api/products",
        method: "POST",
        body,
      });
      if (response.errors) {
        dispatch({
          type: ACTIONS.NOTIFY,
          payload: { ...notify, errors: response.errors },
        });
        return Promise.reject(response.errors[0].msg);
      }
      if (response.msg) {
        dispatch({
          type: ACTIONS.NOTIFY,
          payload: {
            ...notify,
            success: [{ msg: response.msg }],
          },
        });
      }
      return;
    } catch (error) {
      return Promise.reject();
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        category: "",
        subcategory: "",
      }}
      validationSchema={ProductValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          {JSON.stringify(
            `IS UPLOADING: ${isUploading}
              PROGRESS INDICATOR: ${progressIndicator}
               VALUES: ${JSON.stringify(values)}
               STATE: ${JSON.stringify(notify)}
            
            `
          )}
          <Flex>
            <Flex direction="column" w="50%">
              <InputField name="title" type="text" withLabel />
              <InputField name="price" type="text" withLabel />
              <ErrorMessage name="category" className="error-text">
                {(msg) => (
                  <Text textAlign="center" fontWeight="600" color="red.500">
                    {msg}
                  </Text>
                )}
              </ErrorMessage>
              <SelectCategory setFieldValue={setFieldValue} />
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </Flex>
            <Box w="50%">
              <ImageUpload
                progress={progressIndicator}
                images={images}
                setImages={setImages}
              />
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
