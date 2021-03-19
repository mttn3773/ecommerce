import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { validateImages } from "../../utils/validateImages";
import { AiOutlineClose } from "react-icons/ai";
interface InputFieldProps {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ImageUpload: React.FC<InputFieldProps> = ({
  images,
  setImages,
}) => {
  const [error, setError] = useState<string>("");
  const deleteImage = (image: any) => {
    return setImages((prev) => prev.filter((img) => img !== image));
  };

  const uploadImage = async (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Ecommerce");
    const res = await fetch(process.env.CLOUDINARY_UPLOAD_URL!, {
      method: "POST",
      body: data,
    });
    console.log(res);
  };
  return (
    <>
      <Text>{error}</Text>
      <Input
        name="images"
        type="file"
        multiple
        accept="image/*"
        onChange={(e: any) => {
          setError("");
          const files = [...e.target.files];
          const { error, newImages } = validateImages(files, images);
          if (error) return setError(error);
          setImages([...images, ...newImages]);
        }}
      />
      <Flex wrap="wrap">
        {images.map((img: any, index) => (
          <Box position="relative" key={index}>
            <Button onClick={() => uploadImage(img)}> + </Button>
            <Flex
              position="absolute"
              right="1px"
              top="1px"
              justifyContent="center"
              alignItems="center"
            >
              <AiOutlineClose
                cursor="pointer"
                onClick={() => deleteImage(img)}
                color="red"
              />
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
