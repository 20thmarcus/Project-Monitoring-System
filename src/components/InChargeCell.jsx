import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { PEOPLE } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const InChargeCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {PEOPLE.map((incharge) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, incharge)}
            key={incharge.id}
          >
            <ColorIcon color={incharge.color} mr={3} />
            {incharge.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default InChargeCell;
