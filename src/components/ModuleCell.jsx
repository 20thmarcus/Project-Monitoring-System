import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MODULES } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const ModuleCell = ({ getValue, row, column, table }) => {
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
        {MODULES.map((module) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, module)}
            key={module.id}
          >
            <ColorIcon color={module.color} mr={3} />
            {module.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default ModuleCell;
