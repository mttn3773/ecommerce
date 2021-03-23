import { Flex, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React, { useContext, useRef, useState } from "react";
import { ICategoryJSON } from "../../interfaces/category.interface";
import { DataContext } from "../../store/GlobalState";

interface SelectCategoryProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({
  setFieldValue,
}) => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<ICategoryJSON | null>(null);
  const subcategoryRef = useRef<HTMLSelectElement | null>(null);
  return (
    <Flex>
      <Field name="category" multiple>
        {() => (
          <Select
            placeholder="Select Category"
            onChange={(e: any) => {
              setSelectedCategory(
                categories.find(
                  (category) => category.name === e.target.value
                ) || null
              );
              setFieldValue("category", e.target.value);
              subcategoryRef.current!.selectedIndex = 0;
              setFieldValue("subcategory", "");
            }}
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field name="subactegory" multiple>
        {() => (
          <Select
            ref={subcategoryRef}
            placeholder="No Subcategory"
            disabled={!selectedCategory?.subcategories.length}
            onChange={(e: any) => {
              setFieldValue("subcategory", e.target.value);
            }}
          >
            {selectedCategory?.subcategories.map((subactegory, index) => (
              <option key={index} value={subactegory}>
                {subactegory}
              </option>
            ))}
          </Select>
        )}
      </Field>
    </Flex>
  );
};
