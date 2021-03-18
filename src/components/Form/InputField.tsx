import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { toCapitalize } from "../../utils/toCapitalize";
interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  withLabel?: boolean;
  isTextArea?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  type,
  withLabel,
  isTextArea = false,

  ...props
}) => {
  const [field, {}] = useField(props as any);
  return (
    <FormControl id={field.name}>
      {withLabel && <FormLabel>{toCapitalize(field.name)}</FormLabel>}
      <ErrorMessage name={field.name} className="error-text">
        {(msg) => (
          <Text textAlign="center" fontWeight="600" color="red.500">
            {msg}
          </Text>
        )}
      </ErrorMessage>
      {!isTextArea ? (
        <Input
          bgColor="whiteAlpha.500"
          borderColor="blue.300"
          _hover={{ borderColor: "blue.500" }}
          {...field}
          type={type}
        />
      ) : (
        <Textarea
          bgColor="whiteAlpha.500"
          borderColor="blue.300"
          _hover={{ borderColor: "blue.500" }}
          {...field}
          type={type}
        />
      )}
    </FormControl>
  );
};
