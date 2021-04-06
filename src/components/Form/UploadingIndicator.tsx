import { Flex, CircularProgress } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";

interface UploadingIndicatorProps {
  submitting: boolean;
  index: number;
  progress: [number, number] | null;
  deleteImage: (img: any) => void;
  url?: string;
}

export const UploadingIndicator: React.FC<UploadingIndicatorProps> = ({
  submitting,
  index,
  progress,
  deleteImage,
  url,
}) => {
  let icon = (
    <AiOutlineClose cursor="pointer" onClick={deleteImage} color="red" />
  );

  if (submitting && !progress) {
    icon = <FcCheckmark size="1.2rem" />;
  } else if (progress) {
    if (index + 1 <= progress[0]) {
      icon = <FcCheckmark size="1.2rem" />;
    } else {
      icon = (
        <CircularProgress size="1.2rem" isIndeterminate color="green.300" />
      );
    }
  }
  if (url) {
    icon = (
      <AiOutlineClose cursor="pointer" onClick={deleteImage} color="red" />
    );
  }
  return (
    <Flex
      position="absolute"
      right="1px"
      top="1px"
      justifyContent="center"
      alignItems="center"
    >
      {icon}
    </Flex>
  );
};
