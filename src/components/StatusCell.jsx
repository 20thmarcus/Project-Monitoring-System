import { Box, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import { STATUSES } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const Pill = ({ color, children }) => (
  <Box
    px={5}
    py={0.5}
    bg={color || "transparent"}
    borderRadius="15px"
    //display="inline-flex"
    align="center"
  >
    <Text color="gray.900" fontWeight="bold">
      {children}
    </Text>
  </Box>
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const toast = useToast();

  const handleStatusChange = (status) => {
    const { module, task, budgetHours, targetDate, incharge } = row.original;
    if (
      status.name === "In-Progress" || status.name === "Done"
    ) {
      if (!module || !task || !budgetHours || !targetDate || !incharge) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before changing the status.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    updateData(row.index, column.id, status);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={2}
        bg="transparent"
        color="gray.900"
      >
        <Pill color={color}>{name}</Pill>
      </MenuButton>
      <MenuList>

        {STATUSES.map((status) => (
          <MenuItem
            onClick={() => handleStatusChange(status)}
            key={status.id}
          >
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
