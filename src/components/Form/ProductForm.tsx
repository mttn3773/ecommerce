import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useImageUpload } from "../../hooks/useImageUpload";
import { ICreateProduct } from "../../interfaces/product.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { request } from "../../utils/request";
import { ProductValidationSchema } from "../../utils/validateProduct";
import { ImageUpload } from "./ImageUpload";
import { InputField } from "./InputField";
import { SelectCategory } from "./SelectCategory";
interface ProductFormProps {
  initialValues?: ICreateProduct;
  existingImages?: ICreateProduct["images"];
  updating?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  updating,
  initialValues,
  existingImages,
}) => {
  const [cookie, _setCookie] = useCookies();
  const [images, setImages] = useState<any[]>(existingImages || []);
  const { upload, progressIndicator } = useImageUpload();
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const handleSubmit = async (values: any) => {
    try {
      const media = await upload(images);
      const body = {
        ...values,
        images: media,
      };
      const response = await request({
        url: updating ? `/api/products/${updating}` : "/api/products",
        method: updating ? "PUT" : "POST",
        body,
        headers: { Authorization: cookie["auth"] },
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
    <Box w="75%" m="0 auto">
      <Formik
        initialValues={
          initialValues || {
            title: "",
            price: "",
            description: "",
            inStock: "",
            category: "",
            subcategory: "",
          }
        }
        validationSchema={ProductValidationSchema}
        onSubmit={async (values, {}) => {
          await handleSubmit(values);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Flex gridGap="3rem">
              <Flex direction="column" w="50%">
                <InputField name="title" type="text" withLabel />
                <InputField name="price" type="text" withLabel />
                <InputField
                  isTextArea
                  name="description"
                  type="text"
                  withLabel
                />
                <InputField name="inStock" type="number" withLabel />
                <ErrorMessage name="category" className="error-text">
                  {(msg) => (
                    <Text textAlign="center" fontWeight="600" color="red.500">
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
                <SelectCategory
                  initialCategory={initialValues?.category}
                  initialSubcategory={initialValues?.subcategory}
                  setFieldValue={setFieldValue}
                />
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </Flex>
              <Box w="50%">
                <ImageUpload
                  submitting={isSubmitting}
                  progress={progressIndicator}
                  images={images}
                  setImages={setImages}
                />
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
