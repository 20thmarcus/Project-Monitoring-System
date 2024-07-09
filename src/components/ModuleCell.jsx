import { useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button } from "@chakra-ui/react";
import { MODULES } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const ModuleCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [modules, setModules] = useState(MODULES);
  const [newModule, setNewModule] = useState("");
  const [newModuleColor, setNewModuleColor] = useState("");

  const handleAddModule = () => {
    const newId = modules.length + 1;
    const module = { id: newId, name: newModule, color: newModuleColor || "gray.300" };
    setModules([...modules, module]);
    MODULES.push(module); // Update the MODULES array directly
    setNewModule("");
    setNewModuleColor("");
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name ? <ColorIcon color={color} mr={3} /> : null}{name || "Select Module"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {modules.map((module) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, module)}
            key={module.id}
          >
            <ColorIcon color={module.color} mr={3} />
            {module.name}
          </MenuItem>
        ))}
        <Box p={3}>
          <Input
            placeholder="New module"
            value={newModule}
            onChange={(e) => setNewModule(e.target.value)}
            mb={2}
          />
          <Button onClick={handleAddModule} colorScheme="blue">Add Module</Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ModuleCell;
