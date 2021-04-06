import {
  Box,
  Flex,
  Input,
  Text,
  Image,
  FormLabel,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IError } from "../../interfaces/error.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { validateImages } from "../../utils/validateImages";
import { UploadingIndicator } from "./UploadingIndicator";
interface InputFieldProps {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  progress: [number, number] | null;
  submitting: boolean;
}

export const ImageUpload: React.FC<InputFieldProps> = ({
  images,
  setImages,
  progress,
  submitting,
}) => {
  const [error, setError] = useState<string>("");
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const deleteImage = (image: any) => {
    return setImages((prev) => prev.filter((img) => img !== image));
  };
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!imageUploadRef.current) return;
    imageUploadRef.current.value = "";
    return;
  }, [images]);
  return (
    <Box mt="2rem">
      <Text>{error}</Text>
      <FormLabel htmlFor="Upload" zIndex="999" cursor="pointer">
        <InputGroup>
          <InputLeftAddon children="Upload" />
          <Input disabled cursor="pointer" />
        </InputGroup>
      </FormLabel>
      <Input
        hidden
        id="Upload"
        name="images"
        type="file"
        multiple
        ref={imageUploadRef}
        accept="image/*"
        onChange={(e) => {
          setError("");
          const files = [...(e as any).target.files];
          const { error, newImages } = validateImages(files, images);
          if (error)
            return dispatch({
              type: ACTIONS.NOTIFY,
              payload: { ...notify, errors: [{ msg: error }] },
            });
          setImages([...images, ...newImages]);
        }}
      />
      {!!images.length && (
        <Flex direction="column" gridGap="0.2rem">
          <Box position="relative">
            <UploadingIndicator
              index={0}
              deleteImage={() => deleteImage(images[0])}
              submitting={submitting}
              progress={progress}
              url={images[0].url || null}
            />
            <Image
              width="100%"
              src={
                images[0].url ? images[0].url : URL.createObjectURL(images[0])
              }
            />
          </Box>
          <Flex wrap="wrap">
            {images.slice(1).map((img: any, index) => (
              <Box position="relative" key={index} w="25%">
                <UploadingIndicator
                  index={index}
                  deleteImage={() => deleteImage(img)}
                  submitting={submitting}
                  progress={progress}
                  url={img.url || null}
                />
                <Image
                  width="100%"
                  src={img.url ? img.url : URL.createObjectURL(img)}
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
