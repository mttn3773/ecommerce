import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { ImageUpload } from "../../components/Form/ImageUpload";
import { InputField } from "../../components/Form/InputField";
import { DataContext } from "../../store/GlobalState";
import { uploadImages } from "../../utils/uploadImages";
import { ProductValidationSchema } from "../../utils/validateProduct";
interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const { state } = useContext(DataContext);
  const [images, setImages] = useState<any[]>([]);
  const { categories } = state;
  const handleSubmit = async (values: any) => {
    try {
      const media = await uploadImages(images);
      console.log(media);

      const body = JSON.stringify({
        ...values,
        images: media,
      });
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }).then(async (res) => await res.json());
      console.log(body);
      return res;
    } catch (error) {
      console.log(error);
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
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
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
              <Field name="category" multiple>
                {() => (
                  <Select
                    onChange={(e: any) => {
                      setFieldValue("category", e.target.value);
                    }}
                    placeholder="Select option"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </Flex>
            <Box w="50%">
              <ImageUpload images={images} setImages={setImages} />
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
