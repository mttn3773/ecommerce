import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, FormikErrors, useField } from "formik";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { toCapitalize } from "../../utils/toCapitalize";
interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  withLabel?: boolean;
  name: string;
}

export const ImageUpload: React.FC<InputFieldProps> = ({
  withLabel,
  name,
  size = "",
  ...props
}) => {
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    images && console.log([...images]);
  }, [images]);
  return (
    <FormControl>
      {withLabel && <FormLabel>{toCapitalize(name)}</FormLabel>}

      <Input
        {...props}
        onChange={(e) => setImages([...(e as any).target.files])}
        bgColor="whiteAlpha.500"
        borderColor="blue.300"
        multiple
        accept="image/*"
        _hover={{ borderColor: "blue.500" }}
        type="file"
      />
    </FormControl>
  );
};
