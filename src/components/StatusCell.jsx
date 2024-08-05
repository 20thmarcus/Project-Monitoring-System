import { Box, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";

const STATUS_PENDING = { id: 0, name: "Pending", color: "blue.300" };
const STATUS_IN_PROGRESS = { id: 1, name: "In-Progress", color: "yellow.400" };
const STATUS_DONE = { id: 2, name: "Done", color: "pink.300" };
const STATUSES = [STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_DONE];

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const Pill = ({ color, children }) => (
  <Box
    px={3}
    py={0.5}
    bg={color || "transparent"}
    borderRadius="15px"
    align="center"
  >
    <Text color="gray.900" fontWeight="bold">
      {children}
    </Text>
  </Box>
);

const StatusCell = ({ getValue, row, column, table }) => {
  const statusValue = getValue();
  const { updateData } = table.options.meta;
  const toast = useToast();

  // Ensure statusValue is a string
  const statusValueStr = (statusValue || '').toString().toLowerCase();

  // Find the matching status based on the status value from the database, default to STATUS_PENDING if not found
  const { name, color } = STATUSES.find(
    (status) => status.name.toLowerCase() === statusValueStr
  ) || STATUSES[0]; // Default to STATUS_PENDING

  const handleStatusChange = async (status) => {
    try {
      await updateData(row.index, column.id, status.name); // Pass the status name
      toast({
        title: "Status Updated",
        description: `Status updated to ${status.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          <MenuItem onClick={() => handleStatusChange(status)} key={status.id}>
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
