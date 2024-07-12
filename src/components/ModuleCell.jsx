import { useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
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
  const [editModuleId, setEditModuleId] = useState(null);
  const [editModuleName, setEditModuleName] = useState("");
  const [editModuleColor, setEditModuleColor] = useState("");

  const handleAddModule = () => {
    if (newModule.trim() === "") return;

    const newId = modules.length + 1;
    const module = { id: newId, name: newModule, color: newModuleColor || "gray.300" };
    setModules([...modules, module]);
    MODULES.push(module); // Update the MODULES array directly
    setNewModule("");
    setNewModuleColor("");
  };

  const handleEditModule = () => {
    if (editModuleName.trim() === "") return;

    const updatedModules = modules.map((module) =>
      module.id === editModuleId
        ? { ...module, name: editModuleName, color: editModuleColor || module.color }
        : module
    );
    setModules(updatedModules);

    // Update the MODULES array directly
    const moduleIndex = MODULES.findIndex((module) => module.id === editModuleId);
    if (moduleIndex > -1) {
      MODULES[moduleIndex] = { id: editModuleId, name: editModuleName, color: editModuleColor || MODULES[moduleIndex].color };
    }

    // Update all rows in the table with the renamed module
    table.options.data.forEach((rowData, index) => {
      if (rowData[column.id]?.id === editModuleId) {
        updateData(index, column.id, MODULES[moduleIndex]);
      }
    });

    setEditModuleId(null);
    setEditModuleName("");
    setEditModuleColor("");
  };

  const startEditing = (module, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditModuleId(module.id);
    setEditModuleName(module.name);
    setEditModuleColor(module.color);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name || "Select Module"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {modules.map((module) => (
          <MenuItem
            onClick={(e) => updateData(row.index, column.id, module)}
            key={module.id}
          >
            <ColorIcon color={module.color} mr={3} />
            {module.name}
            <Button ml={3} size="xs" onClick={(e) => startEditing(module, e)}>Edit</Button>
          </MenuItem>
        ))}
        <Box p={3}>
          {editModuleId ? (
            <>
              <Input
                placeholder="Edit module name"
                value={editModuleName}
                onChange={(e) => setEditModuleName(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="Edit module color"
                value={editModuleColor}
                onChange={(e) => setEditModuleColor(e.target.value)}
                mb={2}
              />
              <Button onClick={handleEditModule} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="New module name"
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="New module color"
                value={newModuleColor}
                onChange={(e) => setNewModuleColor(e.target.value)}
                mb={2}
              />
              <Button onClick={handleAddModule} colorScheme="blue" isDisabled={!newModule.trim()}>Add Module</Button>
              {!newModule.trim() && <Text color="red.500" mt={2}>Module name is required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ModuleCell;
