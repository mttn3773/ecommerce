import { Button, Select, Text, Input } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { ImageUpload } from "../../components/Form/ImageUpload";
import { InputField } from "../../components/Form/InputField";
import { DataContext } from "../../store/GlobalState";
import { validateImages } from "../../utils/validateImages";

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        category: "",
        subcategory: "",
        images: [],
      }}
      // validate={(values) => {
      //   validateImages(values.images);
      // }}
      onSubmit={(values, { setErrors }) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, setErrors, values, setFieldValue }) => (
        <Form>
          <InputField name="title" type="text" withLabel />
          <InputField name="price" type="text" withLabel />
          <Input
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e: any) => {
              setFieldValue("images", [...e.target.files]);
            }}
          />
          <Field name="category" multiple>
            {() => (
              <Select placeholder="Select option">
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Button type="submit"> Submit </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
