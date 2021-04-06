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
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    number | undefined
  >(undefined);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const subcategoryRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    if (!categories.length) return;
    const categoryIndex = categories.findIndex(
      (category) => category.name.toLowerCase() === initialCategory
    );

    if (categoryIndex === -1) return;
    setSelectedCategory(categories[categoryIndex]);
    const subcategoryIndex = categories[categoryIndex].subcategories.findIndex(
      (subcategory) => subcategory.toLowerCase() === initialSubcategory
    );
    categoryRef.current!.selectedIndex = categoryIndex + 1;
    setSelectedSubcategory(subcategoryIndex);
    setFieldValue("category", categoryRef.current!.value);
  }, [categories]);
  useEffect(() => {
    if (!selectedSubcategory) return;
    subcategoryRef.current!.selectedIndex = selectedSubcategory + 1;
    setFieldValue("subcategory", subcategoryRef.current!.value);
  }, [selectedSubcategory, subcategoryRef.current]);
  return (
    <Flex>
      <Field name="category" multiple>
        {() => (
          <Select
            ref={categoryRef}
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
