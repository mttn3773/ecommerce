import { Box, CircularProgress, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { validateImages } from "../../utils/validateImages";
interface InputFieldProps {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  progress: [number, number] | null;
}

export const ImageUpload: React.FC<InputFieldProps> = ({
  images,
  setImages,
  progress,
}) => {
  const [error, setError] = useState<string>("");
  const deleteImage = (image: any) => {
    return setImages((prev) => prev.filter((img) => img !== image));
  };
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {}, [images]);
  return (
    <>
      <Text>{error}</Text>
      <Input
        name="images"
        type="file"
        multiple
        ref={imageUploadRef}
        accept="image/*"
        onChange={(e) => {
          setError("");
          imageUploadRef.current!.files = null;
          const files = [...(e as any).target.files];
          const { error, newImages } = validateImages(files, images);
          if (error) return setError(error);
          setImages([...images, ...newImages]);
        }}
      />
      <Flex wrap="wrap">
        {images.map((img: any, index) => (
          <Box position="relative" key={index}>
            <Flex
              position="absolute"
              right="1px"
              top="1px"
              justifyContent="center"
              alignItems="center"
            >
              {progress ? (
                index + 1 <= progress[0] ? (
                  <FcCheckmark />
                ) : (
                  <CircularProgress isIndeterminate color="green.300" />
                )
              ) : (
                <AiOutlineClose
                  cursor="pointer"
                  onClick={() => deleteImage(img)}
                  color="red"
                />
              )}
            </Flex>
            <img
              width="100px"
              height="100px"
              src={img.url ? img.url : URL.createObjectURL(img)}
            />
          </Box>
        ))}
      </Flex>
    </>
  );
};