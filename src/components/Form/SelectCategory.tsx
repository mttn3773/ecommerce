import { Flex, Select } from "@chakra-ui/react";
import { Field } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ICategoryJSON } from "../../interfaces/category.interface";
import { DataContext } from "../../store/GlobalState";

interface SelectCategoryProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  initialCategory?: string;
  initialSubcategory?: string;
}

export const SelectCategory: React.FC<SelectCategoryProps> = ({
  initialCategory,
  initialSubcategory,
  setFieldValue,
}) => {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<ICategoryJSON | null>(null);
  const subcategoryRef = useRef<HTMLSelectElement | null>(null);
  const initialCategoryIndex = categories.findIndex(
    (category) => category.name.toLowerCase() === initialCategory
  );
  const initialSubcategoryIndex = selectedCategory?.subcategories.findIndex(
    (subcategory) => subcategory.toLowerCase() === initialSubcategory
  );
  useEffect(() => {
    if (!(initialCategory || categories)) return;
    const category =
      categories.find(
        (category) => category.name.toLowerCase() === initialCategory
      ) || null;
    setSelectedCategory(category);
  }, [initialCategory, categories]);
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
            {categories.map((category, index) => (
              <option key={index} selected={initialCategoryIndex === index}>
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
              <option
                selected={index === initialSubcategoryIndex}
                key={index}
                value={subactegory}
              >
                {subactegory}
              </option>
            ))}
          </Select>
        )}
      </Field>
    </Flex>
  );
};
