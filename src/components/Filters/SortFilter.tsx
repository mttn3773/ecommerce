import { Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useRouter } from "next/router";
import React from "react";

interface SortFilterProps {}

export const SortFilter: React.FC<SortFilterProps> = ({}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname,
      query: { ...query, sort: e.target.value.toLowerCase() },
    });
  };
  return (
    <Box>
      <Select onChange={(e) => handleChange(e)}>
        <option>Newest</option>
        <option>Oldest</option>
        <option>Price: Lowest</option>
        <option>Price: Highest</option>
      </Select>
    </Box>
  );
};
