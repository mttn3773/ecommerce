import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Image as IImage } from "../../../interfaces/product.interface";
import Image from "next/image";
interface ImagesListProps {
  images: IImage[];
}

export const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0].url);
  const isSelected = (url: string) => url === selectedImage;
  return (
    <Flex direction="column" gridGap="0.2rem" mb="3rem">
      <Flex p="0.3rem" border="1px solid" borderColor="gray.300">
        <Image src={selectedImage} height="500px" width="500px" />
      </Flex>
      <Flex wrap="wrap">
        {images.map((image, index) => (
          <Flex
            key={index}
            border="1px solid"
            borderColor={isSelected(image.url) ? "red.900" : "gray.300"}
            transform={isSelected(image.url) ? "scale(1.02)" : ""}
            zIndex={999}
            cursor="pointer"
            onClick={() => {
              setSelectedImage(image.url);
            }}
          >
            <Image src={image.url} height="100px" width="100px" />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
